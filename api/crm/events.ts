import { getValidGHLToken } from '../lib/ghl.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { locationId } = req.query;
    if (!locationId) {
      return res.status(400).json({ error: 'locationId query parameter is required' });
    }

    const tokenData = await getValidGHLToken();

    // In GHL v2 API, we can fetch calendars first
    const calRes = await fetch(`https://services.leadconnectorhq.com/calendars/?locationId=${locationId}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-04-15',
        'Accept': 'application/json'
      }
    });

    if (!calRes.ok) {
      throw new Error(`Failed to fetch calendars: ${calRes.statusText}`);
    }

    const calJson = await calRes.json();
    const calendars = calJson.calendars || [];
    
    if (calendars.length === 0) {
       return res.json({ events: [] });
    }
    
    const calendarId = calendars[0].id;
    
    // Now get events for this calendar
    // Fetch upcoming events from today
    const startTime = new Date().getTime();
    const endTime = startTime + (7 * 24 * 60 * 60 * 1000); // 7 days from now

    const eventsRes = await fetch(`https://services.leadconnectorhq.com/calendars/events?locationId=${locationId}&calendarId=${calendarId}&startTime=${startTime}&endTime=${endTime}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-04-15',
        'Accept': 'application/json'
      }
    });

    if (!eventsRes.ok) {
       throw new Error(`Failed to fetch events: ${eventsRes.statusText}`);
    }

    const eventsJson = await eventsRes.json();

    return res.json({ events: eventsJson.events || [] });

  } catch (error: any) {
    console.error('API Error in /api/crm/events:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
