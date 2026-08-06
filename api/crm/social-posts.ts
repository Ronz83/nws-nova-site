import { Request, Response } from 'express';
import fetch from 'node-fetch';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { locationId } = req.query;

  if (!locationId || typeof locationId !== 'string') {
    return res.status(400).json({ error: 'locationId is required' });
  }

  try {
    const GHL_API_KEY = process.env.GHL_API_KEY;
    
    if (!GHL_API_KEY) {
      console.warn("Missing GHL_API_KEY. Using mock data for social posts.");
      return res.status(200).json({
        posts: [
          { id: '1', content: 'Check out our latest case study!', platform: 'LinkedIn', status: 'scheduled', time: 'Tomorrow' }
        ]
      });
    }

    const response = await fetch(`https://services.leadconnectorhq.com/social-media-posting/posts?locationId=${locationId}&limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL Social Posts API Error:', errorText);
      throw new Error(`GHL API responded with status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching social posts:', error);
    return res.status(500).json({ error: 'Failed to fetch social posts' });
  }
}
