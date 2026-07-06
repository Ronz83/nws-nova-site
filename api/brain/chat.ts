import type { Request, Response } from 'express';
import { SYSTEM_PROMPT } from './system-prompt';
import { portalTools, executeTool } from './tools';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, conversationHistory = [] } = req.body as {
    message: string;
    conversationHistory: { role: string; content: string }[];
  };

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  // 1. Build initial contents array
  const contents = conversationHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));
  
  contents.push({ role: 'user', parts: [{ text: message }] });

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    tools: [{ function_declarations: portalTools }],
    generationConfig: {
      temperature: 0.2,
    },
  };

  try {
    let finalReply = "";
    const toolsExecuted = [];

    // 2. Call Gemini
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error('Failed to communicate with AI model.');
    }

    const firstCandidate = data?.candidates?.[0];
    const firstPart = firstCandidate?.content?.parts?.[0];

    // 3. Handle Function Calling
    if (firstPart?.functionCall) {
      const { name, args } = firstPart.functionCall;
      
      // Execute the tool
      const toolResult = await executeTool(name, args);
      toolsExecuted.push({ name, args, result: toolResult });

      // Append model's tool call request
      contents.push({
        role: 'model',
        parts: [{ functionCall: { name, args } }]
      });

      // Append tool response
      contents.push({
        role: 'user', // Note: Google requires tool responses to be 'user' role with functionResponse
        parts: [{
          functionResponse: {
            name,
            response: { name, content: toolResult }
          }
        }]
      });

      // 4. Second Call to Gemini with tool results
      const followUpPayload = { ...payload, contents };
      const followUpResponse = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(followUpPayload),
      });

      const followUpData = await followUpResponse.json();
      finalReply = followUpData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Action completed.';

    } else {
      // Standard text response
      finalReply = firstPart?.text || 'I could not process that request.';
    }

    return res.status(200).json({ 
      reply: finalReply,
      toolsExecuted
    });

  } catch (err: any) {
    console.error('[Brain] Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
