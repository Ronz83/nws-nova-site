import { Request, Response } from 'express';
import { bos } from '../lib/bos.js';
import { getIdentity, clearSessionCookie, evictIdentity, isAdminRole, type SessionIdentity } from '../lib/session.js';

const DEFAULT_LOCKED = { operations: false, growth: false, automations: false, aiStudio: false, settings: false, requireUpgrade: true };
const ALL_ON = { operations: true, growth: true, automations: true, aiStudio: true, settings: true, requireUpgrade: false };
const KEYS = ['operations', 'growth', 'automations', 'aiStudio', 'settings'] as const;

/** Map Business OS permissions (flag object or list of keys) to the UI Permissions shape. */
export function toUiPermissions(id: SessionIdentity) {
  if (isAdminRole(id.role)) return { ...ALL_ON, primaryColor: id.profile.primaryColor, secondaryColor: id.profile.secondaryColor };
  const p = id.permissions;
  const has = (k: string) => (Array.isArray(p) ? p.includes(k) : !!(p as any)?.[k]);
  const base = { ...DEFAULT_LOCKED } as Record<string, any>;
  for (const k of KEYS) base[k] = has(k);
  if (!Array.isArray(p) && typeof (p as any)?.requireUpgrade === 'boolean') base.requireUpgrade = (p as any).requireUpgrade;
  base.primaryColor = id.profile.primaryColor;
  base.secondaryColor = id.profile.secondaryColor;
  return base;
}

/** GET /api/auth/session - identity is derived only from the signed cookie + Business OS. */
export async function sessionHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(200).json({ user: null });
    return res.json({
      user: {
        id: id.id, name: id.name, email: id.email, role: id.role,
        clientId: id.locationId || undefined,
        permissions: toUiPermissions(id),
        businessName: id.profile.businessName || 'Business OS',
        businessLogo: id.profile.businessLogo || '/business_os_logo.png',
        onboarded: id.profile.onboarded !== false,
      },
    });
  } catch (e: any) {
    console.error('Session error:', e.message);
    return res.status(502).json({ error: 'Session check failed' });
  }
}

/** GET /api/auth/start - send the browser to Business OS to sign in; BOS redirects back to /api/auth/sso?code=. */
export function startHandler(req: Request, res: Response) {
  try {
    const origin = (process.env.SSO_REDIRECT_BASE || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    return res.redirect(302, bos.sso.loginUrl(`${origin}/api/auth/sso`));
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

export async function logoutHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (id) evictIdentity(id.id);
  } catch { /* logging out must always succeed */ }
  clearSessionCookie(res);
  return res.json({ success: true });
}

/** POST /api/auth/permissions - admin-only; body {userId, permissions}. Business OS enforces and stores it. */
export async function updatePermissionsHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });
    if (!isAdminRole(id.role)) return res.status(403).json({ error: 'Forbidden' });
    const { userId, name, email, role, permissions } = req.body || {};
    if (!userId || !permissions) return res.status(400).json({ error: 'userId and permissions required' });
    await bos.permissions.update(id.id, { userId: String(userId), name, email, role, permissions });
    evictIdentity(String(userId));
    return res.json({ success: true });
  } catch (e: any) {
    console.error('Permissions update error:', e.message);
    return res.status(502).json({ error: 'Update failed' });
  }
}

/** GET /api/auth/team-permissions?ids=a,b - admin-only. */
export async function teamPermissionsHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });
    if (!isAdminRole(id.role)) return res.status(403).json({ error: 'Forbidden' });
    const ids = String(req.query.ids || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 200);
    if (!ids.length) return res.json({ permissions: [] });
    return res.json(await bos.permissions.list(ids));
  } catch (e: any) {
    console.error('Team permissions error:', e.message);
    return res.status(502).json({ error: 'Lookup failed' });
  }
}

/** POST /api/auth/onboarded - marks the signed-in user onboarded in Business OS and saves profile fields. */
export async function onboardingHandler(req: Request, res: Response) {
  try {
    const id = await getIdentity(req);
    if (!id) return res.status(401).json({ error: 'Not authenticated' });
    const { name, businessName, businessLogo, primaryColor, secondaryColor } = req.body || {};
    await bos.profile.completeOnboarding(id.id, { name, businessName, businessLogo, primaryColor, secondaryColor });
    evictIdentity(id.id);
    return res.json({ success: true });
  } catch (e: any) {
    console.error('Onboarding error:', e.message);
    return res.status(502).json({ error: 'Update failed' });
  }
}
