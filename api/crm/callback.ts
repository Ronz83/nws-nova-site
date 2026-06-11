// api/crm/callback.ts
// GHL redirects here after the user authorizes the app.
// Exchanges the code for access + refresh tokens and stores them in Supabase.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function getBrokerClient() {
  const url = process.env.NWS_BROKER_SUPABASE_URL;
  const key = process.env.NWS_BROKER_SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Broker Supabase env vars not set');
  return createClient(url, key, { auth: { persistSession: false } });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, error } = req.query;

  if (error) {
    return res.status(400).send(`OAuth error: ${error}`);
  }
  if (!code || typeof code !== 'string') {
    return res.status(400).send('Missing authorization code');
  }

  const clientId     = process.env.NWS_CRM_CLIENT_ID!;
  const clientSecret = process.env.NWS_CRM_CLIENT_SECRET!;
  const redirectUri  = 'https://www.noveltywebsolutions.com/api/crm/callback';

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://services.leadconnectorhq.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'authorization_code',
        code,
        client_id:     clientId,
        client_secret: clientSecret,
        redirect_uri:  redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      throw new Error(`Token exchange failed ${tokenRes.status}: ${text}`);
    }

    const tokens = await tokenRes.json() as {
      access_token:  string;
      refresh_token: string;
      expires_in:    number;
      locationId?:   string;
      companyId?:    string;
    };

    // Store tokens in NWS App Connect Supabase
    const supabase = getBrokerClient();
    const { error: dbErr } = await supabase.from('nws_crm_tokens').upsert({
      company_id:    tokens.companyId   ?? 'nws',
      location_id:   tokens.locationId  ?? null,
      access_token:  tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at:    new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      updated_at:    new Date().toISOString(),
    }, { onConflict: 'company_id' });

    if (dbErr) throw new Error(`DB upsert failed: ${dbErr.message}`);

    return res.status(200).send(`
      <html><body style="font-family:sans-serif;padding:40px;text-align:center">
        <h2 style="color:#0ea5e9">✅ NWS CRM Connected</h2>
        <p>Authorization successful. You can close this window.</p>
      </body></html>
    `);
  } catch (err: any) {
    console.error('[CRM callback]', err.message);
    return res.status(500).send(`Connection failed: ${err.message}`);
  }
}
