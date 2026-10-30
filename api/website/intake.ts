import { Request, Response } from 'express';
import { bos } from '../lib/bos.ts';
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

      // 3. Save standard fields to Business OS (upsert on location_id)
      await bos.websiteIntake.upsert(locationId, {
        business_name: businessName ?? null, tagline: tagline ?? null, primary_color: primaryColor ?? null, secondary_color: secondaryColor ?? null,
        services_list: servicesList ?? null, operating_hours: operatingHours ?? null, phone: phone ?? null, email: email ?? null, address: address ?? null,
        social_links: socialLinks ?? null, special_instructions: specialInstructions ?? null, updated_at: new Date().toISOString(),
      });

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
      const data = await bos.websiteIntake.get(locationId);

      return res.status(200).json({ success: true, data });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
}

export default handler;
