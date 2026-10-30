import { Request, Response } from 'express';
import { bos } from '../lib/bos.js';
import { createSessionToken, setSessionCookie, primeIdentity } from '../lib/session.js';

/**
 * GET /api/auth/sso?code=<5-min JWT issued by Business OS>
 * Novelty never sees the signing secret: the code is verified by Business OS
 * (POST /api/v1/sso/verify). On success a short HttpOnly session cookie holding only uid/exp is
 * set and the browser is redirected without the code in the URL.
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const code = req.query.code;
  if (typeof code !== 'string' || !code) return res.status(400).json({ error: 'Missing code' });

  try {
    const auth = await bos.sso.verify(code);
    if (!auth?.user?.id) return res.status(502).json({ error: 'Business OS returned no user' });
    const identity = primeIdentity(auth);
    setSessionCookie(res, createSessionToken(identity.id));
    const base = (process.env.SSO_REDIRECT_BASE || '').replace(/\/$/, '');
    return res.redirect(302, `${base}/dashboard`);
  } catch (e: any) {
    if (e?.status === 401 || e?.status === 403) return res.status(401).json({ error: 'Invalid or expired SSO code' });
    console.error('SSO error:', e.message);
    return res.status(502).json({ error: 'SSO verification failed' });
  }
}
