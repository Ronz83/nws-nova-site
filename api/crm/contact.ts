// api/crm/contact.ts
// Creates a new contact in GHL from the NWS Nova contact form.
// Automatically refreshes the token if it has expired.
// CORS-enabled so noveltywebsolutions.com can call it from the browser.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { refreshAccessToken } from './refresh.js';

function getBrokerClient() {
  const url = process.env.NWS_BROKER_SUPABASE_URL;
  const key = process.env.NWS_BROKER_SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Broker Supabase env vars not set');
  return createClient(url, key, { auth: { persistSession: false } });
}

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  'https://noveltywebsolutions.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function getAccessToken(): Promise<{ token: string; locationId: string | null }> {
  const supabase = getBrokerClient();
  const { data, error } = await supabase
    .from('nws_crm_tokens')
    .select('access_token, refresh_token, expires_at, location_id')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) throw new Error('No CRM token in DB. Run /api/crm/install first.');

  // Auto-refresh if expired (or within 5 min of expiry)
  const expiresAt = data.expires_at ? new Date(data.expires_at).getTime() : 0;
  const isExpired = Date.now() >= expiresAt - 5 * 60 * 1000;

  const token = isExpired ? await refreshAccessToken() : data.access_token;
  return { token, locationId: data.location_id ?? null };
}

async function createGHLContact(token: string, locationId: string | null, payload: {
  firstName: string;
  lastName:  string;
  email:     string;
  companyName?: string;
  source:    string;
  tags:      string[];
  customFields?: { id: string; field_value: string }[];
}) {
  const body: Record<string, any> = {
    firstName:   payload.firstName,
    lastName:    payload.lastName,
    email:       payload.email,
    companyName: payload.companyName,
    source:      payload.source,
    tags:        payload.tags,
  };

  if (locationId) body.locationId = locationId;
  if (payload.customFields?.length) body.customFields = payload.customFields;

  const res = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Version':       '2021-07-28',
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL contacts API error ${res.status}: ${text}`);
  }

  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, service, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  try {
    const { token, locationId } = await getAccessToken();

    const [firstName, ...rest] = String(name).trim().split(' ');
    const lastName = rest.join(' ') || 'Contact';

    const contact = await createGHLContact(token, locationId, {
      firstName,
      lastName,
      email:       String(email),
      companyName: company ? String(company) : undefined,
      source:      'NWS Website',
      tags:        ['nws-website', service ? `interest-${service.toLowerCase().replace(/\s+/g, '-')}` : 'general'].filter(Boolean),
      customFields: message ? [{ id: 'message', field_value: String(message) }] : [],
    });

    return res.status(200).json({ ok: true, contactId: contact?.contact?.id });
  } catch (err: any) {
    console.error('[CRM contact]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
