import { Request, Response } from 'express';
import { d1First, d1Query, buildUpdate } from '../lib/d1.js';
import { getIdentity, isAdminRole } from '../lib/session.js';

/**
 * Universal Profile Sync Endpoint
 * Fetch or push branding on the shared Business OS profile.
 * Identity comes from the server session; a user can only touch their own profile
 * (admins may pass ?userId= / body.userId to act on another user).
 */
export default async function handler(req: Request, res: Response) {
  let identity;
  try {
    identity = await getIdentity(req);
  } catch (e: any) {
    return res.status(500).json({ error: 'Session check failed' });
  }
  if (!identity) return res.status(401).json({ error: 'Not authenticated' });

  const requested = (req.method === 'GET' ? req.query.userId : req.body?.userId) as string | undefined;
  const targetId = requested && isAdminRole(identity.role) ? requested : identity.kind === 'ghl' ? identity.id : requested;
  if (!targetId) return res.status(400).json({ error: 'Missing userId' });
  if (requested && requested !== identity.id && !isAdminRole(identity.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // GET: Fetch the user's current branding profile (logo URL, colors)
  if (req.method === 'GET') {
    try {
      const data = await d1First(
        'SELECT business_logo, primary_color, secondary_color FROM user_permissions WHERE ghl_user_id = ?',
        [targetId]
      );
      if (!data) return res.status(404).json({ error: 'Profile not found' });

      return res.status(200).json({
        businessLogo: data.business_logo,
        primaryColor: data.primary_color,
        secondaryColor: data.secondary_color
      });
    } catch (e) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // POST: Update the branding profile.
  // If a file is uploaded, the caller should hit /api/crm/media first to get the URL,
  // then pass the URL here to save it to the global profile.
  if (req.method === 'POST') {
    const { businessLogo, primaryColor, secondaryColor } = req.body;

    try {
      const q = buildUpdate(
        'user_permissions',
        ['business_logo', 'primary_color', 'secondary_color'],
        { business_logo: businessLogo, primary_color: primaryColor, secondary_color: secondaryColor },
        'ghl_user_id',
        targetId
      );
      if (q) await d1Query(q.sql, q.params);
      const data = await d1First('SELECT * FROM user_permissions WHERE ghl_user_id = ?', [targetId]);
      if (!data) return res.status(404).json({ error: 'Profile not found' });

      return res.status(200).json({ success: true, profile: data });
    } catch (e) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
