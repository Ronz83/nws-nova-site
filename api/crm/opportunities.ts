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

    // Fetch pipelines for this location
    const pipelinesRes = await fetch(`https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!pipelinesRes.ok) {
      throw new Error(`Failed to fetch pipelines: ${pipelinesRes.statusText}`);
    }

    const pipelinesJson = await pipelinesRes.json();
    const pipelines = pipelinesJson.pipelines || [];

    if (pipelines.length === 0) {
      return res.json({ opportunities: [] });
    }

    // Grab the first pipeline ID
    const pipelineId = pipelines[0].id;

    // Fetch opportunities for this pipeline
    const oppsRes = await fetch(`https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}&pipeline_id=${pipelineId}&limit=20`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!oppsRes.ok) {
      throw new Error(`Failed to fetch opportunities: ${oppsRes.statusText}`);
    }

    const oppsJson = await oppsRes.json();
    return res.json({ 
      pipelineName: pipelines[0].name,
      opportunities: oppsJson.opportunities || [] 
    });

  } catch (error: any) {
    console.error('API Error in /api/crm/opportunities:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
