import { Request, Response } from 'express';
import { d1First } from '../lib/d1.js';
import { createSessionToken, setSessionCookie } from '../lib/session.js';
import { verifySsoToken } from './ssoToken.js';

/**
 * SSO Bridge for TicketFlows and other external NWS apps.
 * Expects: ?userId=user_id&token=secure_sso_token (HMAC, see ssoToken.ts).
 * On success issues the server session cookie; the token is never echoed into the redirect URL.
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, token } = req.query;

  if (!userId || !token) {
    return res.status(400).json({ error: 'Missing userId or token' });
  }

  const secret = process.env.SSO_SHARED_SECRET;
  if (!secret) {
    console.error('SSO_SHARED_SECRET is not configured');
    return res.status(500).json({ error: 'SSO not configured' });
  }
  if (!verifySsoToken(String(token), String(userId), secret)) {
    return res.status(401).json({ error: 'Invalid or expired SSO token' });
  }

  try {
    const userRecord = await d1First('SELECT ghl_user_id FROM user_permissions WHERE ghl_user_id = ?', [String(userId)]);
    if (!userRecord) {
      return res.status(404).json({ error: 'User not found in Business OS' });
    }

    setSessionCookie(res, createSessionToken(String(userId), 'ghl'));
    const base = (process.env.SSO_REDIRECT_BASE || '').replace(/\/$/, '');
    return res.redirect(302, `${base}/dashboard`);
  } catch (error) {
    console.error('SSO Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
