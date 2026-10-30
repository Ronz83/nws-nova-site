import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { d1First } from './d1.js';

/**
 * Server session: HttpOnly signed cookie `nws_session` = base64url({uid,kind,exp}).HMAC.
 * Identity (role, location, permissions) is always re-read from D1, never from the client.
 * kind: 'ghl' (user_permissions.ghl_user_id) or 'portal' (portal_staff.id).
 */
export const SESSION_COOKIE = 'nws_session';
const SESSION_TTL_SEC = 60 * 60 * 12;

export interface SessionClaims {
  uid: string;
  kind: 'ghl' | 'portal';
  exp: number;
}

function secret(): string {
  const s = process.env.SESSION_SECRET || process.env.SSO_SHARED_SECRET;
  if (!s) throw new Error('SESSION_SECRET (or SSO_SHARED_SECRET) is not configured');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function createSessionToken(uid: string, kind: SessionClaims['kind'], nowSec = Math.floor(Date.now() / 1000)): string {
  const payload = Buffer.from(JSON.stringify({ uid, kind, exp: nowSec + SESSION_TTL_SEC })).toString('base64url');
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
    if (typeof c.uid !== 'string' || (c.kind !== 'ghl' && c.kind !== 'portal') || typeof c.exp !== 'number' || c.exp <= nowSec) return null;
    return c as SessionClaims;
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

export function setSessionCookie(res: Response, token: string) {
  res.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SEC}`
  );
}

export function clearSessionCookie(res: Response) {
  res.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

export function getSessionClaims(req: Request): SessionClaims | null {
  const t = readCookie(req, SESSION_COOKIE);
  return t ? verifySessionToken(t) : null;
}

const STAFF_ROLES = ['super_admin', 'portal_admin', 'agency_admin'];
export const isAdminRole = (role?: string | null) => !!role && STAFF_ROLES.includes(role);

export interface SessionIdentity {
  id: string;
  kind: 'ghl' | 'portal';
  name: string;
  email: string;
  role: string;
  locationId: string | null;
  row: Record<string, any>;
}

/** Resolve the caller's identity from the signed cookie + D1. Returns null if unauthenticated. */
export async function getIdentity(req: Request): Promise<SessionIdentity | null> {
  const claims = getSessionClaims(req);
  if (!claims) return null;
  if (claims.kind === 'portal') {
    const r = await d1First('SELECT id, email, full_name, role FROM portal_staff WHERE id = ? AND active = 1', [claims.uid]);
    if (!r) return null;
    return { id: r.id, kind: 'portal', name: r.full_name || r.email, email: r.email, role: r.role, locationId: null, row: r };
  }
  const r = await d1First('SELECT * FROM user_permissions WHERE ghl_user_id = ?', [claims.uid]);
  if (!r) return null;
  return {
    id: r.ghl_user_id,
    kind: 'ghl',
    name: r.name || 'GHL User',
    email: r.email || '',
    role: r.role || 'location_user',
    locationId: r.location_id ?? null,
    row: r,
  };
}

/** Express middleware: 401 unless a valid session; attaches identity to res.locals.identity. */
export function requireSession(opts: { admin?: boolean } = {}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await getIdentity(req);
      if (!id) return res.status(401).json({ error: 'Not authenticated' });
      if (opts.admin && !isAdminRole(id.role)) return res.status(403).json({ error: 'Forbidden' });
      res.locals.identity = id;
      next();
    } catch (e: any) {
      console.error('Session error:', e.message);
      res.status(500).json({ error: 'Session check failed' });
    }
  };
}
