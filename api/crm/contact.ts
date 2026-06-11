// api/crm/contact.ts
// Creates a GHL contact from the NWS Nova contact form.
// Uses a Private Integration key — no OAuth, no token refresh needed.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const GHL_API = 'https://services.leadconnectorhq.com';
const API_VER   = '2021-07-28';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key        = process.env.GHL_PRIVATE_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!key || !locationId) {
    console.error('[CRM] Missing GHL_PRIVATE_KEY or GHL_LOCATION_ID');
    return res.status(500).json({ error: 'CRM not configured', missing: { key: !key, locationId: !locationId } });
  }

  const { name = '', email, company, service, message } = req.body ?? {};

  if (!email) return res.status(400).json({ error: 'email is required' });

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

  if (company)  payload.companyName = String(company);
  if (message)  payload.customFields = [{ key: 'message', field_value: String(message) }];

  try {
    const ghlRes = await fetch(`${GHL_API}/contacts/`, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Version':       API_VER,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await ghlRes.json() as any;

    if (!ghlRes.ok) {
      console.error('[CRM] GHL error:', ghlRes.status, data);
      return res.status(502).json({ error: `GHL error ${ghlRes.status}`, detail: data });
    }

    console.log('[CRM] Contact created:', data?.contact?.id);
    return res.status(200).json({ ok: true, contactId: data?.contact?.id });
  } catch (err: any) {
    console.error('[CRM] Fetch error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
