import { Request, Response } from 'express';
import { getValidGHLToken } from '../lib/ghl.js';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tokenData = await getValidGHLToken();
    const locationId = tokenData.locationId;

    if (!locationId) {
      return res.status(400).json({ error: 'No location ID associated with this GHL token.' });
    }

    // Fetch conversations (inbox)
    const url = `https://services.leadconnectorhq.com/conversations/search?locationId=${locationId}&limit=20`;
    
    const inboxRes = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-04-15',
        'Accept': 'application/json'
      }
    });

    if (!inboxRes.ok) {
      const txt = await inboxRes.text();
      console.error('Conversations Error:', txt);
      throw new Error(`Failed to fetch conversations: ${inboxRes.statusText}`);
    }

    const inboxJson = await inboxRes.json();
    
    // Map GHL conversations to our UI format
    const formattedConversations = (inboxJson.conversations || []).map((c: any) => ({
      id: c.id,
      name: c.contactName || c.fullName || 'Unknown Contact',
      preview: c.lastMessageBody || 'No recent messages',
      time: new Date(c.dateUpdated || c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: c.lastMessageType || 'sms',
      unread: c.unreadCount > 0,
    }));

    return res.json({ conversations: formattedConversations });

  } catch (error: any) {
    console.error('API Error in /api/crm/conversations:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
