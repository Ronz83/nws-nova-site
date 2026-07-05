import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, businessName } = req.body;

  if (!firstName || !lastName || !email || !businessName) {
    return res.status(400).json({ error: 'Missing required fields (firstName, lastName, email, businessName)' });
  }

  try {
    // Proxy to the dedicated businesses-os provisioning engine
    const backendUrl = process.env.PROVISION_API_URL || 'https://api.businessesos.com/api/provision';
    const apiKey = process.env.PROVISION_API_KEY || 'nws_provision_2026';

    const payload = {
      clientName: `${firstName} ${lastName}`.trim(),
      businessName,
      email,
      phone,
      industry: 'other' // default until industry selector is added to form
    };

    const backendRes = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      throw new Error(data.error || data.detail || 'Provisioning engine failed');
    }

    return res.status(200).json({
      success: true,
      message: 'Workspace provisioned successfully.',
      locationId: data.locationId,
      jobId: data.jobId
    });

  } catch (err: any) {
    console.error('Proxy Provisioning error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
