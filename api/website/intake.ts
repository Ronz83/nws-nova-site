import { Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase.ts';

async function handler(req: Request, res: Response) {
  try {
    if (req.method === 'POST') {
      const {
        locationId,
        businessName,
        tagline,
        primaryColor,
        secondaryColor,
        servicesList,
        operatingHours,
        phone,
        email,
        address,
        socialLinks,
        specialInstructions,
      } = req.body;

      if (!locationId) {
        return res.status(400).json({ success: false, message: 'locationId is required' });
      }

      const { error } = await supabaseAdmin
        .from('website_intake')
        .upsert(
          {
            location_id: locationId,
            business_name: businessName,
            tagline,
            primary_color: primaryColor,
            secondary_color: secondaryColor,
            services_list: servicesList,
            operating_hours: operatingHours,
            phone,
            email,
            address,
            social_links: socialLinks,
            special_instructions: specialInstructions,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'location_id' },
        );

      if (error) throw error;

      return res.status(200).json({
        success: true,
        message: 'Website intake submitted successfully',
        submittedAt: new Date().toISOString(),
      });
    }

    if (req.method === 'GET') {
      const locationId = req.query.locationId as string;

      if (!locationId) {
        return res.status(400).json({ success: false, message: 'locationId query param is required' });
      }

      const { data, error } = await supabaseAdmin
        .from('website_intake')
        .select('*')
        .eq('location_id', locationId)
        .maybeSingle();

      if (error) throw error;

      return res.status(200).json({ success: true, data });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
}

export default handler;
