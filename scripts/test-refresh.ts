import { refreshGHLToken } from '../api/lib/ghl.js';
import fs from 'fs';

async function test() {
  try {
    const tokenData = JSON.parse(fs.readFileSync('ghl_token.json', 'utf8'));
    const newToken = await refreshGHLToken(tokenData.refresh_token);
    console.log('Refresh Success!');
  } catch (e) {
    console.error('Refresh Failed:', e);
  }
}

test();
