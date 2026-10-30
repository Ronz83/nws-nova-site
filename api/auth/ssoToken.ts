import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * SSO token format: base64url(JSON{uid, exp}) + "." + base64url(HMAC-SHA256(secret, payload))
 * exp is a unix timestamp in seconds.
 */
export function signSsoToken(userId: string, exp: number, secret: string): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp })).toString('base64url');
  const sig = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySsoToken(
  token: string,
  userId: string,
  secret: string | undefined,
  nowSec: number = Math.floor(Date.now() / 1000)
): boolean {
  if (!secret || !token || !userId) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = createHmac('sha256', secret).update(payload).digest();
  let given: Buffer;
  try {
    given = Buffer.from(sig, 'base64url');
  } catch {
    return false;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.uid === userId && typeof data.exp === 'number' && data.exp > nowSec;
  } catch {
    return false;
  }
}
