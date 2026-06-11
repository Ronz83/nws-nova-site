// api/crm/contact.ts
// Creates a GHL contact from the NWS Nova contact form.
// Uses a Private Integration key — no OAuth, no token refresh needed.
// Location ID is auto-discovered from the key to avoid env var mismatch.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const GHL_API = 'https://services.leadconnectorhq.com';
const API_VER = '2021-07-28';

function ghlHeaders(key: string) {
  return { 'Authorization': `Bearer ${key}`, 'Version': API_VER, 'Content-Type': 'application/json' };
}

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Fetch the location this private key belongs to
async function resolveLocationId(key: string): Promise<string> {
  const r = await fetch(`${GHL_API}/locations/search?limit=1`, {
    headers: { 'Authorization': `Bearer ${key}`, 'Version': API_VER },
  });
  if (r.ok) {
    const d = await r.json() as any;
    const id = d?.locations?.[0]?.id;
    if (id) return id;
  }
  // Fallback to env var
  const envId = process.env.GHL_LOCATION_ID;
  if (envId) return envId;
  throw new Error('Cannot resolve GHL location ID');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.GHL_PRIVATE_KEY;
  if (!key) return res.status(500).json({ error: 'GHL_PRIVATE_KEY not configured' });

  const { name = '', email, company, service, message } = req.body ?? {};
  if (!email) return res.status(400).json({ error: 'email is required' });

  try {
    const locationId = await resolveLocationId(key);

    const [firstName, ...rest] = String(name).trim().split(' ');
    const lastName = rest.join(' ') || 'Contact';

    const tags = [
      'nws-website',
      service ? `interest-${String(service).toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : null,
    ].filter(Boolean) as string[];

    const payload: Record<string, any> = {
      locationId,
      firstName,
      lastName,
      email:   String(email),
      source:  'NWS Website',
      tags,
    };
    if (company) payload.companyName = String(company);
    if (message) payload.customFields = [{ key: 'message', field_value: String(message) }];

    const ghlRes = await fetch(`${GHL_API}/contacts/`, {
      method:  'POST',
      headers: ghlHeaders(key),
      body:    JSON.stringify(payload),
    });

    const data = await ghlRes.json() as any;
    if (!ghlRes.ok) {
      console.error('[CRM] GHL error:', ghlRes.status, JSON.stringify(data));
      return res.status(502).json({ error: `GHL ${ghlRes.status}`, detail: data });
    }

    console.log('[CRM] Contact created:', data?.contact?.id, 'in location:', locationId);
    return res.status(200).json({ ok: true, contactId: data?.contact?.id });
  } catch (err: any) {
    console.error('[CRM]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
