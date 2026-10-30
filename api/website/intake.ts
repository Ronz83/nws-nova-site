import { Request, Response } from 'express';
import { d1Query, d1First, newId } from '../lib/d1.ts';
import { getIdentity, isAdminRole } from '../lib/session.ts';

async function handler(req: Request, res: Response) {
  try {
    const identity = await getIdentity(req);
    if (!identity) return res.status(401).json({ success: false, message: 'Not authenticated' });
    const canAccess = (loc: string) => isAdminRole(identity.role) || identity.locationId === loc;

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
        existingWebsiteUrl,
        designInspirationUrl,
      } = req.body;

      if (!locationId) {
        return res.status(400).json({ success: false, message: 'locationId is required' });
      }
      if (!canAccess(locationId)) return res.status(403).json({ success: false, message: 'Forbidden' });

      // 1. Construct Vibe Coder Prompt
      let vibeCoderPrompt = `Build a 3-page website for ${businessName || 'the business'}. `;
      if (primaryColor) vibeCoderPrompt += `The primary color is ${primaryColor}. `;
      if (secondaryColor) vibeCoderPrompt += `The secondary color is ${secondaryColor}. `;
      if (servicesList) vibeCoderPrompt += `Include the following services: ${servicesList}. `;
      if (tagline) vibeCoderPrompt += `Use this exact tagline: "${tagline}". `;
      if (operatingHours) vibeCoderPrompt += `Operating hours are: ${operatingHours}. `;
      if (address) vibeCoderPrompt += `Location: ${address}. `;
      if (phone || email) vibeCoderPrompt += `Contact info: ${phone || ''} ${email || ''}. `;
      if (socialLinks) vibeCoderPrompt += `Social links: ${socialLinks}. `;
      if (specialInstructions) vibeCoderPrompt += `Additional instructions: ${specialInstructions}. `;

      if (existingWebsiteUrl) {
        vibeCoderPrompt += `\n\nCRITICAL: Perform a full site overhaul and modernization of this existing website: ${existingWebsiteUrl}. Ensure the content is restructured correctly, SEO is fully updated, and the design is completely modernized. `;
      }

      if (designInspirationUrl) {
        vibeCoderPrompt += `\n\nDESIGN INSPIRATION: Pull template structure and design inspiration from this reference: ${designInspirationUrl}. `;
      }

      // 2. Fire GHL Webhook
      const webhookUrl = process.env.VITE_GHL_VIBE_CODER_WEBHOOK_URL || process.env.GHL_VIBE_CODER_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...req.body,
              vibeCoderPrompt
            })
          });
          console.log('Successfully dispatched to Vibe Coder Webhook');
        } catch (webhookErr) {
          console.error('Failed to dispatch webhook:', webhookErr);
          // Don't fail the whole request if webhook fails, just log it.
        }
      } else {
        console.warn('No Vibe Coder Webhook URL configured. Prompt was generated but not sent.');
      }

      // 3. Save standard fields to D1 (upsert on location_id)
      const now = new Date().toISOString();
      await d1Query(
        INSERT INTO website_intake (id, location_id, business_name, tagline, primary_color, secondary_color, services_list, operating_hours, phone, email, address, social_links, special_instructions, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
         ON CONFLICT(location_id) DO UPDATE SET business_name=excluded.business_name, tagline=excluded.tagline, primary_color=excluded.primary_color,
           secondary_color=excluded.secondary_color, services_list=excluded.services_list, operating_hours=excluded.operating_hours, phone=excluded.phone,
           email=excluded.email, address=excluded.address, social_links=excluded.social_links, special_instructions=excluded.special_instructions, updated_at=excluded.updated_at,
        [newId(), locationId, businessName ?? null, tagline ?? null, primaryColor ?? null, secondaryColor ?? null, servicesList ?? null, operatingHours ?? null, phone ?? null, email ?? null, address ?? null, socialLinks ?? null, specialInstructions ?? null, now]
      );

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

      if (!canAccess(locationId)) return res.status(403).json({ success: false, message: 'Forbidden' });
      const data = await d1First('SELECT * FROM website_intake WHERE location_id = ?', [locationId]);

      return res.status(200).json({ success: true, data });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
}

export default handler;
