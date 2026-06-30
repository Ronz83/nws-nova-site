import { Request, Response } from 'express';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// All 25 granular features the system knows about
const ALL_FEATURES = [
  'pipeline_management',
  'contact_crm',
  'advanced_analytics',
  'review_automation',
  'social_scheduler',
  'email_campaigns',
  'universal_chat_ai',
  'pro_chat_ai',
  'voice_ai_agent',
  'router_agent',
  'ai_knowledge_base',
  'lead_capture_workflow',
  'followup_workflow',
  'booking_confirmation',
  'upgrade_nudge',
  'onboarding_videos',
  'advanced_playbooks',
  'holiday_promo_banner',
  'bogo_offer_widget',
  'seasonal_landing_page',
  'referral_program',
  'flash_sale_timer',
  'vibe_coder_access',
  'white_label_branding',
  'api_access',
];

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  pipeline_management: 'Sales pipeline and deal tracking',
  contact_crm: 'Full CRM contact management',
  advanced_analytics: 'Business analytics and reporting dashboards',
  review_automation: 'Automated review request and reputation management',
  social_scheduler: 'Social media post scheduling and management',
  email_campaigns: 'Email marketing and drip campaigns',
  universal_chat_ai: 'Basic AI chat widget for website',
  pro_chat_ai: 'Advanced AI chat with lead qualification',
  voice_ai_agent: 'AI voice receptionist (24/7 phone answering)',
  router_agent: 'AI routing agent to direct callers/chats intelligently',
  ai_knowledge_base: 'AI knowledge base for business info sync',
  lead_capture_workflow: 'Automated lead capture and intake workflow',
  followup_workflow: 'Automated follow-up sequences for leads',
  booking_confirmation: 'Appointment booking confirmation automation',
  upgrade_nudge: 'Plan upgrade prompt workflow for clients',
  onboarding_videos: 'Onboarding video library for new clients',
  advanced_playbooks: 'Advanced training playbooks for the team',
  holiday_promo_banner: 'Holiday promotional banner widget',
  bogo_offer_widget: 'Buy-one-get-one promotional widget',
  seasonal_landing_page: 'Seasonal promotional landing page',
  referral_program: 'Referral program automation',
  flash_sale_timer: 'Flash sale countdown timer widget',
  vibe_coder_access: 'Premium website builder access (Vibe Coder)',
  white_label_branding: 'White-label branding for reseller clients',
  api_access: 'API access for custom integrations',
};

/**
 * POST /api/ai/niche-blueprint
 * Body: { niche: string, notes?: string }
 * Returns: { growth: string[], pro: string[], elite: string[], marketingCopy: { headline, subheadline, features: {...} } }
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { niche, notes } = req.body;

  if (!niche || typeof niche !== 'string') {
    return res.status(400).json({ error: 'niche is required' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server' });
  }

  const featureList = ALL_FEATURES.map(f => `- ${f}: ${FEATURE_DESCRIPTIONS[f]}`).join('\n');

  const prompt = `You are an expert GHL (GoHighLevel) business automation consultant helping to build a "Snapshot Blueprint" for the ${niche} industry.

A Snapshot Blueprint maps which automation features should be enabled for each plan tier (Growth, Pro, Elite).

Here are ALL available features:
${featureList}

${notes ? `Additional context from the team: ${notes}` : ''}

Your task:
1. Recommend which features to enable for each plan tier for a ${niche} business.
   - Growth: Essential features only (basic CRM, pipeline, one or two automations)
   - Pro: Everything in Growth + AI agents + more workflows + review automation
   - Elite: Everything in Pro + premium features like advanced analytics, voice AI, white-label, API access

2. Write tailored marketing copy for this niche with:
   - A headline (max 10 words, punchy and industry-specific)
   - A subheadline (max 25 words, focuses on the main pain point)  
   - A short description of what Growth tier unlocks for this niche (2-3 sentences)
   - A short description of what Pro tier unlocks for this niche (2-3 sentences)
   - A short description of what Elite tier unlocks for this niche (2-3 sentences)
   - 3 key pain points this solution addresses for ${niche} businesses

Respond ONLY with a valid JSON object in this exact structure (no markdown, no code fences):
{
  "growth": ["feature_key1", "feature_key2"],
  "pro": ["feature_key1", "feature_key2", "feature_key3"],
  "elite": ["feature_key1", "feature_key2", "feature_key3", "feature_key4"],
  "marketingCopy": {
    "headline": "...",
    "subheadline": "...",
    "growthDescription": "...",
    "proDescription": "...",
    "eliteDescription": "...",
    "painPoints": ["pain point 1", "pain point 2", "pain point 3"]
  }
}`;

  try {
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'AI service unavailable', details: errText });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean the response — strip any accidental markdown fences
    const cleanJson = rawText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    let blueprint;
    try {
      blueprint = JSON.parse(cleanJson);
    } catch {
      console.error('Failed to parse Gemini JSON response:', cleanJson);
      return res.status(500).json({ error: 'AI returned invalid JSON', raw: cleanJson });
    }

    // Validate that all returned feature keys are valid
    const validateTier = (tier: string[]) =>
      Array.isArray(tier) ? tier.filter(f => ALL_FEATURES.includes(f)) : [];

    return res.status(200).json({
      success: true,
      niche,
      growth: validateTier(blueprint.growth),
      pro: validateTier(blueprint.pro),
      elite: validateTier(blueprint.elite),
      marketingCopy: blueprint.marketingCopy || {},
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Niche Blueprint API Error:', message);
    return res.status(500).json({ error: message });
  }
}
