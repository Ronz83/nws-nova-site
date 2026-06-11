// api/crm/contact.ts
// POSTs NWS Nova contact form data to a GHL Inbound Webhook workflow.
// No API key, no OAuth — GHL handles contact creation via the workflow.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const WEBHOOK_URL = process.env.GHL_WEBHOOK_URL
  ?? 'https://services.leadconnectorhq.com/hooks/PiPGhGQUHooNH7p8no1p/webhook-trigger/6d732939-314f-4339-a907-0da48a26c41f';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name = '', email, company, service, message } = req.body ?? {};
  if (!email) return res.status(400).json({ error: 'email is required' });

  const [firstName, ...rest] = String(name).trim().split(' ');
  const lastName = rest.join(' ') || 'Contact';

  const payload = {
    firstName,
    lastName,
    email:       String(email),
    companyName: company  ? String(company)  : undefined,
    service:     service  ? String(service)  : undefined,
    message:     message  ? String(message)  : undefined,
    source:      'NWS Website',
    tags:        ['nws-website'],
  };

  try {
    const ghlRes = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!ghlRes.ok) {
      const text = await ghlRes.text();
      console.error('[CRM] Webhook error:', ghlRes.status, text);
      return res.status(502).json({ error: `Webhook ${ghlRes.status}`, detail: text });
    }

    console.log('[CRM] Webhook fired successfully');
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('[CRM]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
