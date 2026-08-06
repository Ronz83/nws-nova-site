import { getValidGHLToken } from '../lib/ghl.ts';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { locationId, forwardingNumber, bookingLink, aiPersona, playbookId } = req.body || {};

  if (!locationId) {
    return res.status(400).json({ error: 'locationId is required' });
  }

  try {
    const tokenData = await getValidGHLToken();
    const headers = {
      'Authorization': `Bearer ${tokenData.access_token}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // 1. Fetch existing custom values
    const getRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
      method: 'GET',
      headers: { ...headers, 'Content-Type': undefined } // Remove content-type for GET
    });

    if (!getRes.ok) throw new Error('Failed to fetch from GHL API');
    const getData = await getRes.json();
    const existingCVs = getData.customValues || [];

    // Define the required custom values
    const cvsToSync = [
      { name: 'CB AI Forwarding Number', value: forwardingNumber },
      { name: 'CB AI Booking Link', value: bookingLink },
      { name: 'CB AI Persona', value: aiPersona }
    ].filter(cv => cv.value !== undefined && cv.value !== ''); // Only sync provided fields

    // 2. Upsert each custom value
    for (const cv of cvsToSync) {
      const existing = existingCVs.find((e: any) => e.name === cv.name);
      
      let url = `${GHL_API_BASE}/locations/${locationId}/customValues`;
      let method = 'POST';

      if (existing) {
        url = `${url}/${existing.id}`;
        method = 'PUT';
      }

      const updateRes = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ name: cv.name, value: cv.value })
      });

      if (!updateRes.ok) {
        console.error(`Failed to upsert custom value: ${cv.name}`, await updateRes.text());
        // Continue with others even if one fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Custom Values updated successfully',
      data: { forwardingNumber, bookingLink, aiPersona, playbookId }
    });
  } catch (error: any) {
    console.error('Custom Values API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
