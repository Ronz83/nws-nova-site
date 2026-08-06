import { Request, Response } from 'express';
import { supabase } from '../../src/lib/supabase.js';
import fetch from 'node-fetch';

/**
 * Universal Profile Sync Endpoint
 * Allows external apps to fetch or push branding to the shared Businesses OS profile.
 */
export default async function handler(req: Request, res: Response) {
  // GET: Fetch the user's current branding profile (logo URL, colors)
  if (req.method === 'GET') {
    const { userId } = req.query;
    
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('business_logo, primary_color, secondary_color')
        .eq('ghl_user_id', userId)
        .single();

      if (error || !data) return res.status(404).json({ error: 'Profile not found' });

      return res.status(200).json({
        businessLogo: data.business_logo,
        primaryColor: data.primary_color,
        secondaryColor: data.secondary_color
      });
    } catch (e) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }
  
  // POST: Update the branding profile. 
  // If a file is uploaded, the caller should hit /api/crm/media first to get the URL,
  // then pass the URL here to save it to the global profile.
  if (req.method === 'POST') {
    const { userId, businessLogo, primaryColor, secondaryColor } = req.body;

    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const updates: any = { updated_at: new Date().toISOString() };
    if (businessLogo !== undefined) updates.business_logo = businessLogo;
    if (primaryColor !== undefined) updates.primary_color = primaryColor;
    if (secondaryColor !== undefined) updates.secondary_color = secondaryColor;

    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .update(updates)
        .eq('ghl_user_id', userId)
        .select();

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ success: true, profile: data[0] });
    } catch (e) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
