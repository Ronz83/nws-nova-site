import { Request, Response } from 'express';
import { getValidGHLToken } from '../lib/ghl.ts';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

/**
 * GET /api/ghl/feature-flags?locationId=xyz
 * 
 * Fetches all CB-prefixed Custom Values from a GHL sub-account
 * and returns them as a feature flag map for the dashboard.
 */
export default async function handler(req: Request, res: Response) {
  try {
    const locationId = req.query.locationId as string;

    if (!locationId) {
      return res.status(400).json({ error: 'locationId is required' });
    }

    // Get valid GHL token
    const tokenData = await getValidGHLToken();

    // Fetch all custom values from this location
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
      return res.status(502).json({ error: 'Failed to fetch feature flags from GHL' });
    }

    const ghlData = await ghlRes.json();
    const customValues = ghlData.customValues || [];

    // Map GHL Custom Value names back to dashboard feature keys
    const ghlFieldToFeature: Record<string, string> = {
      'CB Pipeline Enabled': 'pipeline_management',
      'CB CRM Enabled': 'contact_crm',
      'CB Analytics Enabled': 'advanced_analytics',
      'CB Review Enabled': 'review_automation',
      'CB Social Enabled': 'social_scheduler',
      'CB Email Enabled': 'email_campaigns',
      'CB Chat Enabled': 'universal_chat_ai',
      'CB Pro Chat Enabled': 'pro_chat_ai',
      'CB Voice Enabled': 'voice_ai_agent',
      'CB Router Enabled': 'router_agent',
      'CB KB Enabled': 'ai_knowledge_base',
      'CB Lead Capture Enabled': 'lead_capture_workflow',
      'CB Follow-Up Enabled': 'followup_workflow',
      'CB Booking Enabled': 'booking_confirmation',
      'CB Upgrade Nudge Enabled': 'upgrade_nudge',
      'CB Onboarding Enabled': 'onboarding_videos',
      'CB Playbooks Enabled': 'advanced_playbooks',
      'CB Promo Holiday': 'holiday_promo_banner',
      'CB Promo BOGO': 'bogo_offer_widget',
      'CB Promo Seasonal': 'seasonal_landing_page',
      'CB Promo Referral': 'referral_program',
      'CB Promo Flash Sale': 'flash_sale_timer',
      'CB Vibe Coder Enabled': 'vibe_coder_access',
      'CB White Label Enabled': 'white_label_branding',
      'CB API Access Enabled': 'api_access',
      // Note: CB Chat Widget ID and CB Voice Widget ID are handled by /api/ghl/chat-widget
    };

    // Also map to high-level dashboard section flags
    // Any feature in a section being ON enables that section
    const ghlFieldToSection: Record<string, string> = {
      // Operations
      'CB Pipeline Enabled': 'enable_operations',
      'CB CRM Enabled': 'enable_operations',
      'CB Analytics Enabled': 'enable_operations',
      // AI Studio
      'CB Chat Enabled': 'enable_ai_studio',
      'CB Pro Chat Enabled': 'enable_ai_studio',
      'CB Voice Enabled': 'enable_ai_studio',
      'CB Router Enabled': 'enable_ai_studio',
      'CB KB Enabled': 'enable_ai_studio',
      // Growth
      'CB Review Enabled': 'enable_growth',
      'CB Social Enabled': 'enable_growth',
      'CB Email Enabled': 'enable_growth',
      // Training
      'CB Onboarding Enabled': 'enable_training',
      'CB Playbooks Enabled': 'enable_training',
    };

    // Build feature flags object
    const features: Record<string, boolean> = {};
    const sections: Record<string, boolean> = {
      enable_operations: false,
      enable_ai_studio: false,
      enable_growth: false,
      enable_training: false,
    };

    // Also capture the plan tier if available
    let planTier = 'growth'; // default

    for (const cv of customValues) {
      // Feature flags
      const featureKey = ghlFieldToFeature[cv.name];
      if (featureKey) {
        features[featureKey] = cv.value === 'true';
      }

      // Section-level flags (any feature in a section being ON enables the section)
      const sectionKey = ghlFieldToSection[cv.name];
      if (sectionKey && cv.value === 'true') {
        sections[sectionKey] = true;
      }

      // Plan tier
      if (cv.name === 'CB Plan Type') {
        planTier = cv.value || 'growth';
      }
    }

    return res.status(200).json({
      success: true,
      features,
      sections,
      planTier,
      rawCount: customValues.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Feature Flags API Error:', message);
    return res.status(500).json({ error: message });
  }
}
