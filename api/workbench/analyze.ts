// api/workbench/analyze.ts
// NWS Business Intelligence Engine
// Scrapes domain → Gemini AI analysis → business score + gap report + custom Vapi agent → lead to GHL

import type { VercelRequest, VercelResponse } from '@vercel/node';

const VAPI_API_KEY    = process.env.VAPI_API_KEY;
const VAPI_PUBLIC_KEY = process.env.VAPI_PUBLIC_KEY;
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY;
const GHL_TOKEN       = process.env.GHL_PRIVATE_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
const GHL_STAGE_ID    = process.env.GHL_STAGE_HOT_LEAD_ID;
const GHL_BASE        = 'https://services.leadconnectorhq.com';
const SUPABASE_URL    = process.env.SUPABASE_URL;
const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_ROLE_KEY;

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function scrapeDomain(domain: string): Promise<string> {
  const url = domain.startsWith('http') ? domain : `https://${domain}`;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 NWS-Intelligence-Bot/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    // Strip tags, scripts, styles
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s{3,}/g, '\n')
      .substring(0, 8000);
    return text;
  } catch {
    return `Could not scrape ${domain} — using business description only.`;
  }
}

async function analyzeWithGemini(payload: any, siteContent: string): Promise<any> {
  const prompt = `You are an expert business digital consultant. Analyze this Caribbean/global small business and produce a detailed intelligence report.

BUSINESS INFO:
- Name: ${payload.businessName}
- Domain: ${payload.domain}
- Industry: ${payload.industry}
- Team Size: ${payload.teamSize}
- Monthly Revenue: ${payload.revenueRange}
- Self-reported challenges: ${(payload.challenges || []).join(', ')}
- Contact: ${payload.firstName} ${payload.lastName}

WEBSITE CONTENT (scraped):
${siteContent}

Produce a JSON report with this exact structure (no markdown, no backticks):
{
  "businessProfile": {
    "description": "2-sentence summary of what the business does",
    "primaryServices": ["service1", "service2", "service3"],
    "tone": "professional/casual/friendly",
    "targetAudience": "description of their target customers"
  },
  "overallScore": <number 0-100>,
  "grade": "<letter grade A-F>",
  "headline": "<one punchy sentence summarizing their biggest opportunity>",
  "estimatedMonthlyLeakage": "<dollar amount they're losing monthly from inefficiency>",
  "categories": [
    {
      "name": "Lead Capture & Conversion",
      "icon": "target",
      "score": <0-100>,
      "severity": "critical|warning|good",
      "problem": "Specific problem found for this business",
      "impact": "Quantified impact on their revenue/time",
      "nwsSolution": "How NWS specifically solves this",
      "nwsProduct": "Solo Plan ($299/mo) | Business Plan ($599/mo) | Website + AI Bundle",
      "manualSteps": ["Step 1 they could do themselves", "Step 2", "Step 3"],
      "manualTimeEstimate": "X hours/week",
      "manualCostEstimate": "$X/mo in tools + time"
    },
    {
      "name": "Speed to Lead",
      "icon": "zap",
      "score": <0-100>,
      "severity": "critical|warning|good",
      "problem": "...",
      "impact": "...",
      "nwsSolution": "...",
      "nwsProduct": "...",
      "manualSteps": ["..."],
      "manualTimeEstimate": "...",
      "manualCostEstimate": "..."
    },
    {
      "name": "Customer Follow-up & Nurture",
      "icon": "repeat",
      "score": <0-100>,
      "severity": "critical|warning|good",
      "problem": "...",
      "impact": "...",
      "nwsSolution": "...",
      "nwsProduct": "...",
      "manualSteps": ["..."],
      "manualTimeEstimate": "...",
      "manualCostEstimate": "..."
    },
    {
      "name": "Reputation & Social Proof",
      "icon": "star",
      "score": <0-100>,
      "severity": "critical|warning|good",
      "problem": "...",
      "impact": "...",
      "nwsSolution": "...",
      "nwsProduct": "...",
      "manualSteps": ["..."],
      "manualTimeEstimate": "...",
      "manualCostEstimate": "..."
    },
    {
      "name": "24/7 Availability",
      "icon": "clock",
      "score": <0-100>,
      "severity": "critical|warning|good",
      "problem": "...",
      "impact": "...",
      "nwsSolution": "...",
      "nwsProduct": "...",
      "manualSteps": ["..."],
      "manualTimeEstimate": "...",
      "manualCostEstimate": "..."
    }
  ],
  "quickWins": [
    {"title": "Quick win 1 they can do today", "timeToImplement": "30 minutes", "impact": "description"},
    {"title": "Quick win 2", "timeToImplement": "1 hour", "impact": "description"},
    {"title": "Quick win 3", "timeToImplement": "2 hours", "impact": "description"}
  ],
  "agentGreeting": "Hi, thanks for calling ${payload.businessName}! I'm Nova, your AI assistant. How can I help you today?",
  "agentSystemPrompt": "Full system prompt for a voice AI agent trained on this specific business. Include their services, common FAQs, pricing if found, booking CTA, and tone guidelines. 300-400 words."
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      signal: AbortSignal.timeout(30000),
    }
  );

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);

  const data = await res.json() as any;
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

function generateSimulatedAssessment(payload: any): any {
  const challengeMap: Record<string, any> = {
    losing_leads:     { category: 'Lead Capture & Conversion', score: 28, severity: 'critical' },
    slow_followup:    { category: 'Speed to Lead', score: 32, severity: 'critical' },
    manual_processes: { category: 'Customer Follow-up & Nurture', score: 35, severity: 'critical' },
    no_booking:       { category: '24/7 Availability', score: 25, severity: 'critical' },
    bad_reputation:   { category: 'Reputation & Social Proof', score: 30, severity: 'critical' },
    cant_scale:       { category: 'Lead Capture & Conversion', score: 40, severity: 'warning' },
  };

  const weakChallenges = (payload.challenges || [])
    .map((c: string) => challengeMap[c])
    .filter(Boolean);

  const baseScore = weakChallenges.length > 3 ? 31 : weakChallenges.length > 1 ? 44 : 58;
  const revenueMultiplier: Record<string, number> = { '<5k': 800, '5k_20k': 2100, '20k_100k': 6500, '100k_plus': 18000 };
  const leakage = revenueMultiplier[payload.revenueRange] || 2100;

  return {
    businessProfile: {
      description: `${payload.businessName} is a ${payload.industry.toLowerCase()} business serving their local market. Based on their profile, they have significant opportunity to automate customer operations.`,
      primaryServices: ['Core Service', 'Secondary Service', 'Support Service'],
      tone: 'professional',
      targetAudience: 'Local businesses and consumers seeking quality service',
    },
    overallScore: baseScore,
    grade: baseScore >= 80 ? 'A' : baseScore >= 65 ? 'B' : baseScore >= 50 ? 'C' : baseScore >= 35 ? 'D' : 'F',
    headline: `${payload.businessName} is losing an estimated $${leakage.toLocaleString()}/mo to manual processes and missed leads`,
    estimatedMonthlyLeakage: `$${leakage.toLocaleString()}`,
    categories: [
      {
        name: 'Lead Capture & Conversion',
        icon: 'target',
        score: (payload.challenges || []).includes('losing_leads') ? 24 : 55,
        severity: (payload.challenges || []).includes('losing_leads') ? 'critical' : 'warning',
        problem: 'No automated lead capture detected. Potential customers who visit outside business hours leave without a way to connect.',
        impact: 'Research shows 78% of customers buy from the first business that responds. Every missed contact = lost revenue.',
        nwsSolution: 'Nova AI captures every lead 24/7 via voice and chat, instantly qualifies them, and syncs to your CRM.',
        nwsProduct: 'Solo Plan ($299/mo)',
        manualSteps: ['Set up a Google Form on your site', 'Create an email auto-responder in Gmail', 'Build a manual follow-up checklist in Notion', 'Check form submissions twice daily'],
        manualTimeEstimate: '3–5 hours/week',
        manualCostEstimate: '$120/mo in tools + 20hrs/mo of your time',
      },
      {
        name: 'Speed to Lead',
        icon: 'zap',
        score: (payload.challenges || []).includes('slow_followup') ? 19 : 48,
        severity: (payload.challenges || []).includes('slow_followup') ? 'critical' : 'warning',
        problem: 'Leads are going cold. Without instant response, prospects move to competitors within minutes of first inquiry.',
        impact: 'Studies show calling a lead within 5 minutes is 100x more effective than calling after 30 minutes. Most businesses call back in 24+ hours.',
        nwsSolution: 'Nova responds instantly — on calls, chat, SMS — 24/7. No lead waits more than 3 seconds.',
        nwsProduct: 'Business Plan ($599/mo)',
        manualSteps: ['Enable SMS notifications for all form submissions', 'Set a personal goal to call back within 1 hour', 'Use a free CRM like HubSpot for lead tracking', 'Block 30-min calendar slots twice daily for lead callbacks'],
        manualTimeEstimate: '2–4 hours/week',
        manualCostEstimate: '$80/mo in tools + 15hrs/mo of your time',
      },
      {
        name: 'Customer Follow-up & Nurture',
        icon: 'repeat',
        score: (payload.challenges || []).includes('manual_processes') ? 22 : 51,
        severity: (payload.challenges || []).includes('manual_processes') ? 'critical' : 'warning',
        problem: 'Customer follow-up is happening manually, if at all. Most leads go cold because there\'s no automated nurture sequence.',
        impact: '80% of sales require 5+ follow-up touches. Manual follow-up stops at 1–2 touches for most small businesses.',
        nwsSolution: 'GHL CRM automation sends personalized follow-ups via SMS, email, and voice — automatically, on schedule.',
        nwsProduct: 'Business Plan ($599/mo)',
        manualSteps: ['Set up a free Mailchimp email sequence', 'Create SMS templates and send manually weekly', 'Build a Google Sheets tracking system for follow-ups', 'Schedule weekly reminder to manually contact cold leads'],
        manualTimeEstimate: '4–6 hours/week',
        manualCostEstimate: '$150/mo in tools + 25hrs/mo of your time',
      },
      {
        name: 'Reputation & Social Proof',
        icon: 'star',
        score: (payload.challenges || []).includes('bad_reputation') ? 20 : 62,
        severity: (payload.challenges || []).includes('bad_reputation') ? 'critical' : 'good',
        problem: 'Review generation is passive. Most satisfied customers never leave a review unless specifically asked at the right moment.',
        impact: '93% of consumers read online reviews before buying. A business with 4.8 stars earns 19% more revenue than one with 4.0 stars.',
        nwsSolution: 'Automated review requests sent via SMS after every interaction. AI responds to reviews in real-time.',
        nwsProduct: 'Business Plan ($599/mo)',
        manualSteps: ['Ask every satisfied customer directly for a Google Review', 'Create a QR code linking to your Google review page', 'Respond manually to every review within 24 hours', 'Set a monthly reminder to request reviews from recent customers'],
        manualTimeEstimate: '2–3 hours/week',
        manualCostEstimate: '$40/mo in tools + 10hrs/mo of your time',
      },
      {
        name: '24/7 Availability',
        icon: 'clock',
        score: (payload.challenges || []).includes('no_booking') ? 15 : 40,
        severity: (payload.challenges || []).includes('no_booking') ? 'critical' : 'warning',
        problem: 'Business is only reachable during working hours. After-hours inquiries go unanswered until the next day — or never.',
        impact: '43% of customers prefer to contact businesses outside 9–5 hours. Night and weekend leads are being lost completely.',
        nwsSolution: 'Nova handles calls, chats, and booking 24/7/365 — including holidays. Never miss a lead again.',
        nwsProduct: 'Solo Plan ($299/mo)',
        manualSteps: ['Set up a Google Voice number with voicemail to email', 'Use Calendly for self-service booking', 'Create a detailed FAQ page on your website', 'Set up an out-of-office auto-reply for emails'],
        manualTimeEstimate: '1–2 hours setup, 1hr/week maintenance',
        manualCostEstimate: '$60/mo in tools + 5hrs/mo of your time',
      },
    ],
    quickWins: [
      { title: 'Add a click-to-call button on your website homepage', timeToImplement: '15 minutes', impact: 'Increases mobile inquiries by up to 30%' },
      { title: 'Set up Google Business Profile (if not done)', timeToImplement: '45 minutes', impact: 'Gets you on Google Maps and local search results immediately' },
      { title: 'Create a Calendly link and add it to your email signature', timeToImplement: '30 minutes', impact: 'Eliminates back-and-forth scheduling, saves 3+ hours/week' },
    ],
    agentGreeting: `Hi there! Thanks so much for calling ${payload.businessName}. I'm your AI assistant — how can I help you today?`,
    agentSystemPrompt: `You are a friendly AI receptionist for ${payload.businessName}, a ${payload.industry} business.

Your speaking style:
- Speak naturally and conversationally. Use contractions like "I'm", "we'll", "you're".
- Keep responses short — 1 to 2 sentences max before pausing for the caller.
- Vary your tone. Be warm on greetings, focused on questions, reassuring on concerns.
- Never list items robotically. Say "we can help with a few things" rather than reciting a list.
- Use natural filler affirmations: "Absolutely!", "Of course!", "Great question!"
- Always pause after asking a question to let the caller respond.

Your goals:
1. Warmly greet and qualify the caller's need.
2. Answer common questions about services and pricing if you know them.
3. Offer to book an appointment or get their contact details for follow-up.
4. If unsure about something specific, say: "Let me have ${payload.firstName} follow up with you on that directly."

Never discuss competitor pricing. Always end the call by offering to book a time or take a message.`,
  };
}

async function createVapiAgent(assessment: any, payload: any): Promise<{ assistantId: string; publicKey: string }> {
  if (!VAPI_API_KEY || !VAPI_PUBLIC_KEY) throw new Error('Vapi not configured');

  const vapiPayload = {
    name: `Nova — ${payload.businessName}`,
    model: {
      provider: 'openai',
      model: 'gpt-4o',
      systemPrompt: assessment.agentSystemPrompt,
      temperature: 0.7,
      maxTokens: 150,
    },
    voice: {
      provider: 'openai',
      voiceId: 'nova',
    },
    firstMessage: assessment.agentGreeting,
    endCallMessage: `It was great speaking with you! Have a wonderful day!`,
    transcriber: { provider: 'deepgram', model: 'nova-2' },
    silenceTimeoutSeconds: 25,
    responseDelaySeconds: 0,
    backgroundSound: 'off',
  };

  const res = await fetch('https://api.vapi.ai/assistant', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${VAPI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(vapiPayload),
  });

  if (!res.ok) throw new Error(`Vapi error: ${res.status}`);
  const data = await res.json() as any;
  return { assistantId: data.id, publicKey: VAPI_PUBLIC_KEY! };
}

async function captureLeadInGHL(payload: any, assessment: any): Promise<string | null> {
  if (!GHL_TOKEN || !GHL_LOCATION_ID) {
    console.log('[GHL] Skipping — GHL_PRIVATE_KEY or GHL_LOCATION_ID not set');
    return null;
  }

  const headers = {
    Authorization: `Bearer ${GHL_TOKEN}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };

  // Build tags from survey answers
  const challenge = (payload.challenges?.[0] ?? '').replace(/_/g, '-');
  const teamTag   = (payload.teamSize ?? '').replace(/_/g, '-');
  const tags = [
    'source:survey-funnel',
    challenge && `challenge:${challenge}`,
    teamTag   && `team-size:${teamTag}`,
    'score:hot',
  ].filter(Boolean) as string[];

  // Build custom fields array (only include if field ID env var is set)
  const customFields = [
    process.env.GHL_CF_CHALLENGE && challenge
      ? { id: process.env.GHL_CF_CHALLENGE, value: challenge } : null,
    process.env.GHL_CF_TITLE && payload.title
      ? { id: process.env.GHL_CF_TITLE,     value: payload.title } : null,
    process.env.GHL_CF_TEAM_SIZE && payload.teamSize
      ? { id: process.env.GHL_CF_TEAM_SIZE, value: payload.teamSize } : null,
    process.env.GHL_CF_INDUSTRY && payload.industry
      ? { id: process.env.GHL_CF_INDUSTRY,  value: payload.industry } : null,
    process.env.GHL_CF_SCORE
      ? { id: process.env.GHL_CF_SCORE, value: `${assessment.overallScore}/100 (Grade ${assessment.grade})` } : null,
  ].filter(Boolean);

  try {
    // 1. Upsert contact (creates or updates by email)
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName:   payload.firstName,
        lastName:    payload.lastName  || '',
        email:       payload.email,
        phone:       payload.phone     || '',
        companyName: payload.businessName || payload.domain,
        tags,
        customFields,
      }),
    });

    const contactData = await contactRes.json() as any;
    const contactId   = contactData?.contact?.id;

    if (!contactId) {
      console.error('[GHL] No contactId returned:', JSON.stringify(contactData));
      return null;
    }
    console.log(`[GHL] Contact upserted: ${contactId}`);

    // 2. Create opportunity in AI Employee pipeline → New Lead stage
    if (GHL_PIPELINE_ID && GHL_STAGE_ID) {
      const oppRes = await fetch(`${GHL_BASE}/opportunities/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          locationId:      GHL_LOCATION_ID,
          name:            `${payload.firstName} ${payload.lastName || ''} — AI Employee Lead`.trim(),
          pipelineId:      GHL_PIPELINE_ID,
          pipelineStageId: GHL_STAGE_ID,
          contactId,
          status: 'open',
        }),
      });
      const oppData = await oppRes.json() as any;
      console.log(`[GHL] Opportunity created: ${oppData?.opportunity?.id ?? 'unknown'}`);
    }

    return contactId;
  } catch (e) {
    console.error('[GHL] Lead capture failed:', e);
    return null;
  }
}

// ── Save results to Supabase ─────────────────────────────────────────
async function saveResultToSupabase(payload: any, assessment: any, agentData: any): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('[Supabase] Skipping — SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set');
    return null;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/workbench_results`, {
      method: 'POST',
      headers: {
        apikey:          SUPABASE_KEY,
        Authorization:   `Bearer ${SUPABASE_KEY}`,
        'Content-Type':  'application/json',
        Prefer:          'return=representation',
      },
      body: JSON.stringify({
        first_name:       payload.firstName,
        last_name:        payload.lastName  || null,
        email:            payload.email,
        phone:            payload.phone     || null,
        domain:           payload.domain,
        business_name:    payload.businessName || payload.domain,
        title:            payload.title     || null,
        industry:         payload.industry  || null,
        challenge:        (payload.challenges || [])[0] || null,
        team_size:        payload.teamSize  || null,
        assessment:       assessment,
        agent_id:         agentData.assistantId || null,
        agent_public_key: agentData.publicKey   || null,
      }),
    });
    const rows = await res.json() as any[];
    const id = rows?.[0]?.id;
    if (id) console.log(`[Supabase] Result saved: ${id}`);
    return id ?? null;
  } catch (e) {
    console.error('[Supabase] Save failed:', e);
    return null;
  }
}

// ── Write result URL back to GHL contact ──────────────────────────────
async function updateGHLResultUrl(contactId: string, resultUrl: string) {
  const cfId = process.env.GHL_CF_RESULT_URL;
  if (!GHL_TOKEN || !cfId || !contactId) return;
  try {
    await fetch(`${GHL_BASE}/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        Authorization:  `Bearer ${GHL_TOKEN}`,
        'Content-Type': 'application/json',
        Version:        '2021-07-28',
      },
      body: JSON.stringify({
        customFields: [{ id: cfId, value: resultUrl }],
      }),
    });
    console.log(`[GHL] Result URL written to contact ${contactId}`);
  } catch (e) {
    console.error('[GHL] Result URL update failed:', e);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  const payload = req.body;
  const requiredFields = ['firstName', 'email', 'businessName', 'industry'];
  const missing = requiredFields.filter(f => !payload[f]);
  if (missing.length) return res.status(400).json({ status: 'error', message: `Missing: ${missing.join(', ')}` });

  console.log(`[Workbench] Analyzing: ${payload.businessName} (${payload.domain})`);

  try {
    // 1. Scrape website
    let siteContent = '';
    if (payload.domain) {
      siteContent = await scrapeDomain(payload.domain);
    }

    // 2. AI Analysis
    let assessment: any;
    if (GEMINI_API_KEY) {
      try {
        console.log('[Workbench] Running Gemini analysis...');
        assessment = await analyzeWithGemini(payload, siteContent);
      } catch (e) {
        console.error('[Workbench] Gemini failed, using simulation:', e);
        assessment = generateSimulatedAssessment(payload);
      }
    } else {
      console.log('[Workbench] No Gemini key — using intelligent simulation');
      assessment = generateSimulatedAssessment(payload);
    }

    // 3. Create Vapi agent trained on their business
    let agentData = { assistantId: null as any, publicKey: VAPI_PUBLIC_KEY || '' };
    if (VAPI_API_KEY) {
      try {
        const result = await createVapiAgent(assessment, payload);
        agentData = result;
        console.log(`[Workbench] Vapi agent created: ${agentData.assistantId}`);
      } catch (e) {
        console.error('[Workbench] Vapi agent creation failed:', e);
      }
    }

    // 4. Save results to Supabase — get shareable UUID
    const resultId  = await saveResultToSupabase(payload, assessment, agentData);
    const resultUrl = resultId
      ? `${req.headers.origin || 'https://nws-nova-site.vercel.app'}/results/${resultId}`
      : null;

    // 5. Capture lead in GHL (v2 API — non-blocking)
    captureLeadInGHL(payload, assessment)
      .then(contactId => {
        if (contactId && resultUrl) updateGHLResultUrl(contactId, resultUrl).catch(() => {});
      })
      .catch(() => {});

    return res.status(200).json({
      status: 'success',
      assessment,
      agent: agentData,
      businessName: payload.businessName,
      firstName:    payload.firstName,
      resultId,
      resultUrl,
    });

  } catch (err: any) {
    console.error('[Workbench] Fatal error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
