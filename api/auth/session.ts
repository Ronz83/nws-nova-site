import { Request, Response } from 'express';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { d1First, d1Query, buildUpdate } from '../lib/d1.js';
import {
  getIdentity,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  isAdminRole,
} from '../lib/session.js';

const DEFAULT_LOCKED = { operations: false, growth: false, automations: false, aiStudio: false, settings: false, requireUpgrade: true };
const ALL_ON = { operations: true, growth: true, automations: true, aiStudio: true, settings: true, requireUpgrade: false };
const b = (v: any) => v === 1 || v === true;

/** scrypt hash format: scrypt$<saltHex>$<hashHex> */
export function verifyPassword(password: string, stored: string): boolean {
  const [alg, saltHex, hashHex] = stored.split('$');
  if (alg !== 'scrypt' || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const got = scryptSync(password, Buffer.from(saltHex, 'hex'), expected.length);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

/** GET /api/auth/session — identity is derived only from the signed server cookie + D1. */
export async function sessionHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(200).json({ user: null });

    if (id.kind === 'portal') {
      return res.json({
        user: {
          id: id.id, name: id.name, email: id.email, role: id.role,
          permissions: ALL_ON, businessName: 'NWS Portal', businessLogo: '/business_os_logo.png', onboarded: true,
        },
      });
    }

    const r = id.row;
    const permissions = r
      ? {
          operations: b(r.operations), growth: b(r.growth), automations: b(r.automations),
          aiStudio: b(r.ai_studio), settings: b(r.settings),
          requireUpgrade: r.require_upgrade === null || r.require_upgrade === undefined ? true : b(r.require_upgrade),
          primaryColor: r.primary_color || undefined, secondaryColor: r.secondary_color || undefined,
        }
      : DEFAULT_LOCKED;
    const adminPerms = id.role === 'agency_admin' ? ALL_ON : permissions;

    return res.json({
      user: {
        id: id.id, name: id.name, email: id.email, role: id.role,
        clientId: id.locationId || undefined,
        permissions: adminPerms,
        businessName: 'Business OS',
        businessLogo: r.business_logo || '/business_os_logo.png',
        onboarded: b(r.onboarded),
      },
    });
  } catch (e: any) {
    console.error('Session error:', e.message);
    return res.status(500).json({ error: 'Session check failed' });
  }
}

/** POST /api/auth/login — staff portal email/password against D1 portal_staff. */
export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    const row = await d1First('SELECT id, password_hash, active FROM portal_staff WHERE lower(email) = lower(?)', [email]);
    if (!row || !b(row.active) || !verifyPassword(password, row.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    setSessionCookie(res, createSessionToken(row.id, 'portal'));
    return res.json({ success: true });
  } catch (e: any) {
    console.error('Login error:', e.message);
    return res.status(500).json({ error: 'Login failed' });
  }
}

export async function logoutHandler(_req: Request, res: Response) {
  clearSessionCookie(res);
  return res.json({ success: true });
}

/** POST /api/auth/permissions — admin-only; body {userId, permissions}. Users cannot self-upgrade. */
export async function updatePermissionsHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });
    if (!isAdminRole(id.role)) return res.status(403).json({ error: 'Forbidden' });
    const { userId, name, email, role, permissions: p } = req.body || {};
    if (!userId || !p) return res.status(400).json({ error: 'userId and permissions required' });
    await d1Query('INSERT OR IGNORE INTO user_permissions (ghl_user_id, name, email, role) VALUES (?,?,?,?)', [String(userId), name || '', email || '', role || 'location_user']);
    const q = buildUpdate(
      'user_permissions',
      ['operations', 'growth', 'automations', 'ai_studio', 'settings', 'require_upgrade'],
      {
        operations: p.operations === undefined ? undefined : p.operations ? 1 : 0,
        growth: p.growth === undefined ? undefined : p.growth ? 1 : 0,
        automations: p.automations === undefined ? undefined : p.automations ? 1 : 0,
        ai_studio: p.aiStudio === undefined ? undefined : p.aiStudio ? 1 : 0,
        settings: p.settings === undefined ? undefined : p.settings ? 1 : 0,
        require_upgrade: p.requireUpgrade === undefined ? undefined : p.requireUpgrade ? 1 : 0,
      },
      'ghl_user_id',
      String(userId)
    );
    if (q) await d1Query(q.sql, q.params);
    return res.json({ success: true });
  } catch (e: any) {
    console.error('Permissions error:', e.message);
    return res.status(500).json({ error: 'Update failed' });
  }
}

/** GET /api/auth/team-permissions?ids=a,b — admin-only; returns user_permissions rows for the given GHL user ids. */
export async function teamPermissionsHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });
    if (!isAdminRole(id.role)) return res.status(403).json({ error: 'Forbidden' });
    const ids = String(req.query.ids || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 200);
    if (!ids.length) return res.json({ permissions: [] });
    const rows = await d1Query(`SELECT * FROM user_permissions WHERE ghl_user_id IN (${ids.map(() => '?').join(',')})`, ids);
    return res.json({ permissions: rows });
  } catch (e: any) {
    console.error('Team permissions error:', e.message);
    return res.status(500).json({ error: 'Lookup failed' });
  }
}

/** POST /api/auth/onboarded — marks the signed-in GHL user onboarded and saves profile fields. */
export async function onboardingHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id || id.kind !== 'ghl') return res.status(401).json({ error: 'Not authenticated' });
    const { name, businessName, businessLogo, primaryColor, secondaryColor } = req.body || {};
    const q = buildUpdate(
      'user_permissions',
      ['name', 'business_name', 'business_logo', 'primary_color', 'secondary_color', 'onboarded'],
      { name, business_name: businessName, business_logo: businessLogo, primary_color: primaryColor, secondary_color: secondaryColor, onboarded: 1 },
      'ghl_user_id',
      id.id
    );
    if (q) await d1Query(q.sql, q.params);
    return res.json({ success: true });
  } catch (e: any) {
    console.error('Onboarding error:', e.message);
    return res.status(500).json({ error: 'Update failed' });
  }
}
