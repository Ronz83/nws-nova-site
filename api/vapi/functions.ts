import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const message = payload?.message;
    
    // Vapi sends 'tool-calls' (Server URL/Assistant level) or 'function-call' based on config
    if (message?.type === 'tool-calls') {
      const toolCalls = message.toolCalls || [];
      const results = [];

      for (const toolCall of toolCalls) {
        if (toolCall.type === 'function' && toolCall.function.name === 'book_appointment') {
          const args = JSON.parse(toolCall.function.arguments || '{}');
          
          console.log(`Booking appointment for ${args.name}, Phone: ${args.phone}, Details: ${args.details}`);

          // Simulate GoHighLevel push
          await new Promise(resolve => setTimeout(resolve, 800));

          results.push({
            toolCallId: toolCall.id,
            result: `Success: I've booked that for you.`
          });
        }
      }

      return res.status(200).json({ results });
    }
    
    if (message?.type === 'function-call') {
      const functionCall = message.functionCall;
      
      if (functionCall?.name === 'book_appointment') {
        const args = functionCall.parameters || {};
        
        console.log(`Booking appointment for ${args.name}, Phone: ${args.phone}, Details: ${args.details}`);

        // Simulate GoHighLevel push
        await new Promise(resolve => setTimeout(resolve, 800));

        return res.status(200).json({
          result: `I've booked that for you.`
        });
      }
    }

    return res.status(200).json({});
  } catch (error) {
    console.error('Vapi Functions Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
