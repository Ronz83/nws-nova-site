// api/demo-agent/start-call.ts
// Creates a transient Vapi assistant trained as the NWS Nova receptionist.
// Returns assistant_id + public_key to the frontend VoiceCallOverlay.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const VAPI_API_KEY    = process.env.VAPI_API_KEY;
const VAPI_PUBLIC_KEY = process.env.VAPI_PUBLIC_KEY;

const NWS_SYSTEM_PROMPT = `You are Nova, the AI voice receptionist for Novelty Web Solutions (NWS) — a digital agency based in the Caribbean specialising in premium websites, AI-powered CRM systems, and AI voice receptionists.

## Your Role
You handle inbound inquiries for NWS. Your goal is to qualify the prospect, answer questions about NWS services, and guide them toward booking a free discovery call.

## NWS Services
- **Custom Websites** — Premium, mobile-first websites built to convert. Starting at $1,500.
- **AI Voice Receptionist (Nova)** — 24/7 AI phone & chat receptionist. Never miss a lead. Plans start at $299/mo.
- **CRM Setup & Automation** — GoHighLevel CRM fully set up, automated follow-up sequences, pipeline management.
- **Full Digital Growth Package** — Website + CRM + AI Receptionist bundled together.

## Pricing Plans
- **Solo Plan** — $299/mo — AI receptionist for small businesses
- **Business Plan** — $599/mo — Full CRM + AI receptionist + automation

## Key Talking Points
- We are Caribbean-based and understand the local business landscape
- Our AI never sleeps — it answers calls, qualifies leads, and books appointments 24/7
- Setup is fast — most clients are live within 5 business days
- No technical knowledge required — we handle everything

## Tone
Warm, confident, professional. Speak naturally. Don't sound robotic. Be helpful and concise — don't overwhelm with information.

## CTA
Always end with an offer to book a free 30-minute discovery call: "I can get you on Ronald's calendar for a quick discovery call — it's completely free. Would you like to do that?"

## Limitations
- Don't discuss competitor pricing in detail
- Don't make promises about results or guarantees
- If asked something you don't know, say you'll have Ronald follow up directly`;

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  if (!VAPI_API_KEY || !VAPI_PUBLIC_KEY) {
    return res.status(500).json({ status: 'error', message: 'Vapi credentials not configured' });
  }

  const vapiPayload = {
    name:  'Nova — NWS Demo',
    model: {
      provider:     'openai',
      model:        'gpt-4o-mini',
      systemPrompt: NWS_SYSTEM_PROMPT,
      temperature:  0.7,
    },
    voice: {
      provider: '11labs',
      voiceId:  'sarah',
    },
    firstMessage: "Hi! I'm Nova, the AI receptionist for Novelty Web Solutions. I can tell you about our websites, CRM systems, or AI voice receptionists. What can I help you with today?",
    endCallMessage: "It was great speaking with you! We'll be in touch soon. Have a wonderful day!",
    transcriber: {
      provider: 'deepgram',
      model:    'nova-2',
    },
  };

  try {
    const vapiRes = await fetch('https://api.vapi.ai/assistant', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(vapiPayload),
    });

    if (!vapiRes.ok) {
      const text = await vapiRes.text();
      console.error('[Demo] Vapi assistant creation failed:', vapiRes.status, text);
      return res.status(502).json({ status: 'error', message: 'Failed to provision AI agent' });
    }

    const data        = await vapiRes.json() as any;
    const assistantId = data?.id;

    if (!assistantId) {
      return res.status(502).json({ status: 'error', message: 'No assistant ID returned from Vapi' });
    }

    console.log('[Demo] Vapi assistant created:', assistantId);
    return res.status(200).json({
      status:       'success',
      assistant_id: assistantId,
      public_key:   VAPI_PUBLIC_KEY,
    });

  } catch (err: any) {
    console.error('[Demo]', err.message);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}
