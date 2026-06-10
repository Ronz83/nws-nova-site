// api/crm/refresh.ts
// Refreshes an expired GHL access token and updates the record in Supabase.
// Called automatically by the contact endpoint when a 401 is encountered.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

function getBrokerClient() {
  const url = process.env.NWS_BROKER_SUPABASE_URL;
  const key = process.env.NWS_BROKER_SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Broker Supabase env vars not set');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function refreshAccessToken(): Promise<string> {
  const supabase = getBrokerClient();

  const { data, error } = await supabase
    .from('nws_crm_tokens')
    .select('refresh_token, company_id')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) throw new Error('No CRM token found in DB');

  const tokenRes = await fetch('https://services.leadconnectorhq.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: data.refresh_token,
      client_id:     process.env.NWS_CRM_CLIENT_ID!,
      client_secret: process.env.NWS_CRM_CLIENT_SECRET!,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Token refresh failed ${tokenRes.status}: ${text}`);
  }

  const tokens = await tokenRes.json() as {
    access_token:  string;
    refresh_token: string;
    expires_in:    number;
  };

  await supabase.from('nws_crm_tokens').update({
    access_token:  tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at:    new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    updated_at:    new Date().toISOString(),
  }).eq('company_id', data.company_id);

  return tokens.access_token;
}

// HTTP handler — can be triggered manually if needed
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const token = await refreshAccessToken();
    return res.json({ ok: true, tokenLength: token.length });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
