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
    
    const headers = {
      'Authorization': `Bearer ${tokenData.access_token}`,
      'Version': '2021-07-28',
      'Accept': 'application/json'
    };

    // We fetch contacts and opportunities concurrently
    const contactsUrl = `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&limit=1`;
    const opportunitiesUrl = `https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}&limit=100`;

    const [contactsRes, oppsRes] = await Promise.all([
      fetch(contactsUrl, { headers }),
      fetch(opportunitiesUrl, { headers })
    ]);

    let totalContacts = 0;
    if (contactsRes.ok) {
      const contactsData = await contactsRes.json();
      totalContacts = contactsData.meta?.total || 0;
    }

    let totalRevenue = 0;
    let appointmentsCount = 0;
    
    if (oppsRes.ok) {
      const oppsData = await oppsRes.json();
      const opportunities = oppsData.opportunities || [];
      
      // Calculate total pipeline value (revenue) and mock appointments from opps
      totalRevenue = opportunities.reduce((sum: number, opp: any) => sum + (opp.monetaryValue || 0), 0);
      
      // If the opp is won or has a specific status we could count it as appointments,
      // but as a fallback, we'll just use the total active opportunities as a proxy for appointments
      appointmentsCount = opportunities.length; 
    }

    return res.status(200).json({
      metrics: {
        leads: totalContacts,
        revenue: totalRevenue,
        appointments: appointmentsCount
      }
    });

  } catch (error: any) {
    console.error(`Error in /api/ghl/metrics for ${locationId}:`, error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
