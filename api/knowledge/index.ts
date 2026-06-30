import { Request, Response } from 'express';
import { getValidGHLToken } from '../lib/ghl.ts';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const KB_CUSTOM_VALUE_NAME = 'CB AI Knowledge';

export default async function handler(req: Request, res: Response) {
  try {
    const { method } = req;
    
    // GET /api/knowledge?locationId=xyz
    if (method === 'GET') {
      const locationId = req.query.locationId as string;
      
      if (!locationId) {
        return res.status(400).json({ error: 'locationId is required' });
      }

      const tokenData = await getValidGHLToken();

      // Fetch custom values from GHL
      const response = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const err = await response.text();
        console.error('Failed to fetch GHL custom values:', err);
        throw new Error('Failed to fetch from GHL API');
      }

      const data = await response.json();
      
      // Find the specific KB custom value
      const kbValue = data.customValues?.find((cv: any) => cv.name === KB_CUSTOM_VALUE_NAME);

      return res.status(200).json({
        knowledgeText: kbValue ? kbValue.value : '',
        updatedAt: new Date().toISOString()
      });
    }
    
    // POST /api/knowledge
    if (method === 'POST') {
      const { locationId, knowledgeText } = req.body;
      
      if (!locationId) {
        return res.status(400).json({ error: 'locationId is required' });
      }

      const tokenData = await getValidGHLToken();

      // 1. Fetch existing custom values to see if CB AI Knowledge exists
      const getRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });

      if (!getRes.ok) throw new Error('Failed to fetch from GHL API');
      
      const getData = await getRes.json();
      const kbValue = getData.customValues?.find((cv: any) => cv.name === KB_CUSTOM_VALUE_NAME);

      let updateRes;

      if (kbValue) {
        // 2a. Update existing custom value
        updateRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues/${kbValue.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: KB_CUSTOM_VALUE_NAME,
            value: knowledgeText || ' '
          })
        });
      } else {
        // 2b. Create new custom value if it doesn't exist yet
        updateRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: KB_CUSTOM_VALUE_NAME,
            value: knowledgeText || ' '
          })
        });
      }

      if (!updateRes.ok) {
        const err = await updateRes.text();
        console.error('Failed to update GHL custom value:', err);
        throw new Error('Failed to update GHL custom value');
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Knowledge base synced to GHL successfully',
        updatedAt: new Date().toISOString()
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Knowledge API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
