import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { businessName, industry, messages } = req.body as {
    businessName: string;
    industry: string;
    messages: { role: string; content: string }[];
  };

  if (!businessName || !messages?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const systemPrompt = `You are a friendly, professional AI receptionist for ${businessName}, a ${industry || 'general'} business.

Your role:
- Answer questions about the business naturally and helpfully
- Be warm, concise, and conversational — keep replies to 1-3 sentences
- If you don't know a specific detail, offer to take a message or suggest booking a call
- Naturally guide interested prospects toward booking a consultation
- Never make up specific prices, staff names, or policies you don't know about
- End responses with a helpful follow-up question when appropriate

Respond as if you are the receptionist for ${businessName}. Be professional but friendly.`;

  // Build Gemini contents array (alternating user/model turns)
  const lastMsg = messages[messages.length - 1];
  const historyContents = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const payload = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [
      ...historyContents,
      { role: 'user', parts: [{ text: lastMsg.content }] },
    ],
    generationConfig: {
      maxOutputTokens: 180,
      temperature: 0.75,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "I'm sorry, I'm having trouble connecting right now. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ reply: "I'm sorry, I'm having a little trouble right now. Please try again in a moment." });
  }
}
