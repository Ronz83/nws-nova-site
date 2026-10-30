import { Request, Response } from 'express';
import { bos } from '../lib/bos.ts';
import { getValidGHLToken } from '../lib/ghl.ts';


const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export default async function handler(req: Request, res: Response) {
  try {
    const { method } = req;

    // GET /api/ghl/snapshots — list all snapshot configs
    if (method === 'GET') {
      const { snapshots: data } = await bos.snapshots.list();
      return res.status(200).json({ snapshots: data || [] });
    }

    // POST /api/ghl/snapshots — create a new snapshot config
    if (method === 'POST') {
      const { name, plan_tier, industry, ghl_snapshot_id, features, integrations, template_id, promotions, custom_values, notes } = req.body;

      if (!name || !plan_tier) {
        return res.status(400).json({ error: 'name and plan_tier are required' });
      }

      const data = await bos.snapshots.create({ name, plan_tier, industry: industry || null, ghl_snapshot_id: ghl_snapshot_id || null, features, integrations, template_id: template_id || null, promotions, custom_values, notes: notes || null });

      return res.status(201).json({ success: true, snapshot: data });
    }

    // PUT /api/ghl/snapshots — update an existing snapshot config
    if (method === 'PUT') {
      const { id, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'id is required' });
      }

      const data = await bos.snapshots.update(id, updates);
      if (!data) return res.status(404).json({ error: 'Snapshot config not found' });

      return res.status(200).json({ success: true, snapshot: data });
    }

    // DELETE /api/ghl/snapshots?id=xyz
    if (method === 'DELETE') {
      const id = req.query.id as string;

      if (!id) {
        return res.status(400).json({ error: 'id query param is required' });
      }

      await bos.snapshots.remove(id);

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error: any) {
    console.error('Snapshots API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

// Separate handler for pushing snapshot feature flags to GHL
export async function pushToGHL(req: Request, res: Response) {
  try {
    const { snapshotId, locationId } = req.body;

    if (!snapshotId || !locationId) {
      return res.status(400).json({ error: 'snapshotId and locationId are required' });
    }

    // 1. Fetch the snapshot config from Business OS
    const snapshot = await bos.snapshots.get(snapshotId);

    if (!snapshot) {
      return res.status(404).json({ error: 'Snapshot config not found' });
    }

    // 2. Get valid GHL token
    const tokenData = await getValidGHLToken();

    // 3. Map feature flags to GHL Custom Field names
    const featureToGHLField: Record<string, string> = {
      pipeline_management: 'CB Pipeline Enabled',
      contact_crm: 'CB CRM Enabled',
      advanced_analytics: 'CB Analytics Enabled',
      review_automation: 'CB Review Enabled',
      social_scheduler: 'CB Social Enabled',
      email_campaigns: 'CB Email Enabled',
      universal_chat_ai: 'CB Chat Enabled',
      pro_chat_ai: 'CB Pro Chat Enabled',
      voice_ai_agent: 'CB Voice Enabled',
      router_agent: 'CB Router Enabled',
      ai_knowledge_base: 'CB KB Enabled',
      lead_capture_workflow: 'CB Lead Capture Enabled',
      followup_workflow: 'CB Follow-Up Enabled',
      booking_confirmation: 'CB Booking Enabled',
      upgrade_nudge: 'CB Upgrade Nudge Enabled',
      onboarding_videos: 'CB Onboarding Enabled',
      advanced_playbooks: 'CB Playbooks Enabled',
      // Promotions
      holiday_promo_banner: 'CB Promo Holiday',
      bogo_offer_widget: 'CB Promo BOGO',
      seasonal_landing_page: 'CB Promo Seasonal',
      referral_program: 'CB Promo Referral',
      flash_sale_timer: 'CB Promo Flash Sale',
      // Premium
      vibe_coder_access: 'CB Vibe Coder Enabled',
      white_label_branding: 'CB White Label Enabled',
      api_access: 'CB API Access Enabled'
    };

    // 4. Update each custom value in GHL
    const features = snapshot.features as Record<string, boolean>;
    const updatePromises = Object.entries(features).map(async ([featureKey, enabled]) => {
      const ghlFieldName = featureToGHLField[featureKey];
      if (!ghlFieldName) return;

      // Fetch existing custom values to find the field ID
      const getRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });

      if (!getRes.ok) return;
      const getData = await getRes.json();
      const existingField = getData.customValues?.find((cv: any) => cv.name === ghlFieldName);

      if (existingField) {
        // Update existing
        await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues/${existingField.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: ghlFieldName, value: enabled ? 'true' : 'false' })
        });
      } else {
        // Create new
        await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: ghlFieldName, value: enabled ? 'true' : 'false' })
        });
      }
    });

    await Promise.all(updatePromises);

    // 5. Also push any custom values (like default KB text)
    const customValues = snapshot.custom_values as Record<string, string>;
    for (const [name, value] of Object.entries(customValues)) {
      const getRes = await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });
      if (!getRes.ok) continue;
      const getData = await getRes.json();
      const existing = getData.customValues?.find((cv: any) => cv.name === name);

      if (existing) {
        await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues/${existing.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, value })
        });
      } else {
        await fetch(`${GHL_API_BASE}/locations/${locationId}/customValues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, value })
        });
      }
    }

    return res.status(200).json({ success: true, message: 'Snapshot features pushed to GHL successfully' });
  } catch (error: any) {
    console.error('Push to GHL Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
