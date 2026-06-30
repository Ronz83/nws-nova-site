import { Request, Response } from 'express';
import { getValidGHLToken } from '../lib/ghl.ts';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

/**
 * GET /api/ghl/chat-widget?locationId=xyz
 * 
 * Fetches the GHL chat widget ID for a given client location.
 * Looks for CB Chat Widget ID and CB Voice Widget ID custom values.
 */
export default async function handler(req: Request, res: Response) {
  try {
    const locationId = req.query.locationId as string;

    if (!locationId) {
      return res.status(400).json({ error: 'locationId is required' });
    }

    const tokenData = await getValidGHLToken();

    const ghlRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!ghlRes.ok) {
      const errText = await ghlRes.text();
      console.error('GHL Custom Values fetch failed:', errText);
      return res.status(502).json({ error: 'Failed to fetch widget IDs from GHL' });
    }

    const ghlData = await ghlRes.json();
    const customValues = ghlData.customValues || [];

    let chatWidgetId: string | null = null;
    let voiceWidgetId: string | null = null;
    let chatEnabled = false;
    let voiceEnabled = false;

    for (const cv of customValues) {
      if (cv.name === 'CB Chat Widget ID') chatWidgetId = cv.value || null;
      if (cv.name === 'CB Voice Widget ID') voiceWidgetId = cv.value || null;
      if (cv.name === 'CB Chat Enabled') chatEnabled = cv.value === 'true';
      if (cv.name === 'CB Voice Enabled') voiceEnabled = cv.value === 'true';
    }

    return res.status(200).json({
      success: true,
      chatWidgetId,
      voiceWidgetId,
      chatEnabled,
      voiceEnabled,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Chat Widget API Error:', message);
    return res.status(500).json({ error: message });
  }
}
