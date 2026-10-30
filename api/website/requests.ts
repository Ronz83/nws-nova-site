import { Request, Response } from 'express';
import { bos } from '../lib/bos.ts';
import { getIdentity, isAdminRole } from '../lib/session.ts';

/**
 * GET /api/website/requests
 * 
 * Fetches all website intake submissions from Business OS.
 * Intended for Agency Admins.
 */
export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const identity = await getIdentity(req);
    if (!identity) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (!isAdminRole(identity.role)) return res.status(403).json({ success: false, message: 'Forbidden' });

    // Fetch all intake requests, ordered by newest first
    const { data } = await bos.websiteIntake.list();

    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
}
