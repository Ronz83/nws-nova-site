import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const type = payload?.message?.type;

    if (type === 'assistant-request') {
      return res.status(200).json({
        assistant: {
          firstMessage: "Hello, thanks for calling Automotive Art. How can I help you today?",
          model: {
            provider: "openai",
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are a professional receptionist at Automotive Art, a premium automotive repair and customization shop.
Your job is to answer questions about our services, including window tints, vehicle detailing, and general repairs.
You are also responsible for booking appointments. To book an appointment, you must capture the customer's full name, phone number, and preferred date/time.
Use the 'book_appointment' function once you have gathered their name, number, and the desired details.
Always be polite, concise, and helpful.`
              }
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "book_appointment",
                  description: "Books an appointment for the customer. Requires name, phone number, and appointment details.",
                  parameters: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Full name of the customer"
                      },
                      phone: {
                        type: "string",
                        description: "Phone number of the customer"
                      },
                      details: {
                        type: "string",
                        description: "Date, time, and service required"
                      }
                    },
                    required: ["name", "phone", "details"]
                  }
                }
              }
            ]
          },
          voice: {
            provider: "11labs",
            voiceId: process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"
          }
        }
      });
    }

    return res.status(200).json({});
  } catch (error) {
    console.error('Vapi Inbound Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
