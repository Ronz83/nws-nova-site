import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { bos, BosError, type BosAuth, type BosUser } from './bos.js';

/**
 * Novelty session. Business OS is the identity hub; this cookie only proves that Business OS
 * issued an SSO code for `uid` recently. It holds nothing else: HttpOnly `nws_session` =
 * base64url({uid,exp}).HMAC(SESSION_SECRET). Role, permissions and locations are re-validated
 * against Business OS on every request (in-memory cache, max 60s).
 */
export const SESSION_COOKIE = 'nws_session';
const SESSION_TTL_SEC = 60 * 60;
const CACHE_TTL_MS = 60_000;

export interface SessionClaims {
  uid: string;
  exp: number;
}

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not configured');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(uid: string, nowSec = Math.floor(Date.now() / 1000)): string {
  const payload = Buffer.from(JSON.stringify({ uid, exp: nowSec + SESSION_TTL_SEC })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string, nowSec = Math.floor(Date.now() / 1000)): SessionClaims | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = Buffer.from(sign(payload), 'base64url');
  const given = Buffer.from(sig, 'base64url');
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const c = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof c.uid !== 'string' || typeof c.exp !== 'number' || c.exp <= nowSec) return null;
    return { uid: c.uid, exp: c.exp };
  } catch {
    return null;
  }
}

function readCookie(req: Request, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

const secureFlag = () => (process.env.NODE_ENV === 'production' ? '; Secure' : '');

export function setSessionCookie(res: Response, token: string) {
  res.append('Set-Cookie', `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SEC}${secureFlag()}`);
}

export function clearSessionCookie(res: Response) {
  res.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag()}`);
}

export function getSessionClaims(req: Request): SessionClaims | null {
  const t = readCookie(req, SESSION_COOKIE);
  return t ? verifySessionToken(t) : null;
}

const STAFF_ROLES = ['super_admin', 'portal_admin', 'agency_admin'];
export const isAdminRole = (role?: string | null) => !!role && STAFF_ROLES.includes(role);

export interface SessionIdentity {
  id: string;
  name: string;
  email: string;
  role: string;
  /** Primary location (first of locationIds), or null. */
  locationId: string | null;
  locationIds: string[];
  /** Raw Business OS permissions (object of flags, or list of permission keys). */
  permissions: Record<string, unknown> | string[];
  tenant: unknown;
  profile: Pick<BosUser, 'businessName' | 'businessLogo' | 'onboarded' | 'primaryColor' | 'secondaryColor'>;
}

function toIdentity(a: BosAuth): SessionIdentity {
  const u = a.user;
  const locationIds = Array.isArray(u.locationIds) ? u.locationIds : [];
  return {
    id: u.id,
    name: u.name || u.email,
    email: u.email || '',
    role: u.role,
    locationId: locationIds[0] ?? null,
    locationIds,
    permissions: u.permissions ?? {},
    tenant: a.tenant,
    profile: {
      businessName: u.businessName,
      businessLogo: u.businessLogo,
      onboarded: u.onboarded,
      primaryColor: u.primaryColor,
      secondaryColor: u.secondaryColor,
    },
  };
}

const cache = new Map<string, { at: number; identity: SessionIdentity }>();

/** Prime the cache right after a successful SSO verify so the first request needs no extra call. */
export function primeIdentity(a: BosAuth): SessionIdentity {
  const identity = toIdentity(a);
  cache.set(identity.id, { at: Date.now(), identity });
  return identity;
}

export function evictIdentity(uid: string) {
  cache.delete(uid);
}

/**
 * Resolve the caller from the signed cookie + Business OS. Returns null when unauthenticated
 * or Business OS says the user is gone/forbidden. Throws BosError when Business OS is
 * unreachable or misbehaving (fail closed; never serve from stale identity beyond 60s).
 */
export async function getIdentity(req: Request): Promise<SessionIdentity | null> {
  const claims = getSessionClaims(req);
  if (!claims) return null;
  const hit = cache.get(claims.uid);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.identity;
  try {
    const identity = primeIdentity(await bos.sso.introspect(claims.uid));
    return identity;
  } catch (e) {
    cache.delete(claims.uid);
    if (e instanceof BosError && (e.status === 401 || e.status === 403 || e.status === 404)) return null;
    throw e;
  }
}

/**
 * Express middleware: 401 unless a valid session; attaches identity to res.locals.identity.
 * admin: staff roles only. scopeLocation: non-admins may only pass locationId values they own.
 */
export function requireSession(opts: { admin?: boolean; scopeLocation?: boolean } = {}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await getIdentity(req);
      if (!id) return res.status(401).json({ error: 'Not authenticated' });
      const admin = isAdminRole(id.role);
      if (opts.admin && !admin) return res.status(403).json({ error: 'Forbidden' });
      if (opts.scopeLocation && !admin) {
        const loc = (req.query?.locationId ?? req.body?.locationId) as unknown;
        if (typeof loc === 'string' && loc && !id.locationIds.includes(loc)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
      }
      res.locals.identity = id;
      next();
    } catch (e: any) {
      console.error('Session error:', e.message);
      const status = e instanceof BosError ? 502 : 500;
      res.status(status).json({ error: 'Session check failed' });
    }
  };
}
