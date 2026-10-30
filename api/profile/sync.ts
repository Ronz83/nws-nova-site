import { Request, Response } from 'express';
import { bos } from '../lib/bos.js';
import { getIdentity, isAdminRole } from '../lib/session.js';

/**
 * Universal Profile Sync Endpoint (branding lives in Business OS).
 * Identity comes from the server session; a user can only touch their own profile
 * (admins may pass ?userId= / body.userId to act on another user).
 */
export default async function handler(req: Request, res: Response) {
  let identity;
  try {
    identity = await getIdentity(req);
  } catch {
    return res.status(502).json({ error: 'Session check failed' });
  }
  if (!identity) return res.status(401).json({ error: 'Not authenticated' });

  const requested = (req.method === 'GET' ? req.query.userId : req.body?.userId) as string | undefined;
  if (requested && requested !== identity.id && !isAdminRole(identity.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const targetId = requested || identity.id;

  try {
    if (req.method === 'GET') {
      const data = await bos.profile.get(targetId);
      if (!data) return res.status(404).json({ error: 'Profile not found' });
      return res.status(200).json({
        businessLogo: data.businessLogo, primaryColor: data.primaryColor, secondaryColor: data.secondaryColor,
      });
    }

    if (req.method === 'POST') {
      const { businessLogo, primaryColor, secondaryColor } = req.body || {};
      const data = await bos.profile.update(targetId, { businessLogo, primaryColor, secondaryColor }, identity.id);
      if (!data) return res.status(404).json({ error: 'Profile not found' });
      return res.status(200).json({ success: true, profile: data });
    }
  } catch (e: any) {
    console.error('Profile sync error:', e.message);
    return res.status(502).json({ error: 'Business OS request failed' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
