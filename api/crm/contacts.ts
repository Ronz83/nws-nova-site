import { getValidGHLToken } from '../lib/ghl.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { locationId } = req.query;

  if (!locationId) {
    return res.status(400).json({ error: 'locationId is required' });
  }

  try {
    const token = await getValidGHLToken();

    const response = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Failed to fetch contacts from GHL:', errorData);
      return res.status(response.status).json({ error: 'Failed to fetch contacts' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error in contacts API:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
