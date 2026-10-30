// Run: npx tsx api/auth/ssoToken.test.mjs
import assert from 'node:assert';
import { signSsoToken, verifySsoToken } from './ssoToken.ts';

const secret = 'test-secret';
const now = Math.floor(Date.now() / 1000);
const good = signSsoToken('u1', now + 60, secret);

assert.equal(verifySsoToken(good, 'u1', secret), true, 'valid token accepted');
assert.equal(verifySsoToken(good, 'u2', secret), false, 'wrong user rejected');
assert.equal(verifySsoToken(good, 'u1', 'other-secret'), false, 'wrong secret rejected');
assert.equal(verifySsoToken(good, 'u1', undefined), false, 'missing secret rejected');
assert.equal(verifySsoToken(signSsoToken('u1', now - 1, secret), 'u1', secret), false, 'expired rejected');
assert.equal(verifySsoToken('forged.token', 'u1', secret), false, 'forged rejected');
assert.equal(verifySsoToken('anything', 'u1', secret), false, 'malformed rejected');
const forged = signSsoToken('u1', now + 60, 'attacker');
assert.equal(verifySsoToken(forged, 'u1', secret), false, 'attacker-signed rejected');
console.log('SSO token tests passed');
