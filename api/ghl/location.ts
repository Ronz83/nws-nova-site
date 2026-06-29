import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getValidGHLToken } from '../lib/ghl';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const locationId = req.query.locationId as string;
  if (!locationId) {
    return res.status(400).json({ error: 'locationId is required' });
  }

  try {
    const tokenData = await getValidGHLToken();
    
    // GHL V2 API to get location details
    const url = `https://services.leadconnectorhq.com/locations/${locationId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch GHL location ${locationId}:`, errorText);
      return res.status(response.status).json({ error: 'Failed to fetch GHL location' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error(`Error in /api/ghl/location for ${locationId}:`, error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
