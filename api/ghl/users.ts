import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getValidGHLToken } from '../lib/ghl';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const tokenData = await getValidGHLToken();
    
    if (!tokenData.locationId && !tokenData.companyId) {
       return res.status(400).json({ error: 'No companyId or locationId associated with token' });
    }

    // Usually GHL users are fetched by company or location.
    // The endpoint is GET /users/search?companyId=... or locationId=...
    const url = `https://services.leadconnectorhq.com/users/search?companyId=${tokenData.companyId}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch GHL users:', errorText);
      return res.status(response.status).json({ error: 'Failed to fetch GHL users' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error in /api/ghl/users:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
