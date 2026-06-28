import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const vapiSecret = req.headers['x-vapi-secret'];
  if (vapiSecret !== process.env.VAPI_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = req.body;
    const message = payload?.message;

    if (message?.type === 'function-call') {
      const functionCall = message.functionCall;

      if (functionCall.name === 'search_knowledge_base') {
        const { user_query } = functionCall.parameters;
        console.log(`[Automotive Art] Searching knowledge base for: ${user_query}`);
        // TODO: Implement actual Pinecone/Vector DB search here
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Knowledge base simulated search completed for "${user_query}". Please tell the customer this information is currently being updated.`
          }]
        });
      }

      if (functionCall.name === 'get_appointment_slots') {
        const { timezone } = functionCall.parameters;
        console.log(`[Automotive Art] Fetching slots for timezone: ${timezone}`);
        // TODO: Connect to GHL calendars
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Available slots: Today at 2:00 PM, Tomorrow at 9:00 AM and 1:00 PM.`
          }]
        });
      }

      if (functionCall.name === 'book_appointment_slot') {
        const { full_name, phone_number, selected_slot } = functionCall.parameters;
        console.log(`[Automotive Art] Booking slot for ${full_name} (${phone_number}) at ${selected_slot}`);
        // TODO: Post booking to GHL
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Successfully booked appointment for ${full_name} at ${selected_slot}.`
          }]
        });
      }

      if (functionCall.name === 'emergency_dispatch_trigger') {
        const { emergency_type, caller_phone, location } = functionCall.parameters;
        console.log(`[Automotive Art] 🚨 EMERGENCY DISPATCH TRIGGERED: ${emergency_type} at ${location} for ${caller_phone}`);
        // TODO: Push immediate SMS/Webhook to emergency responders
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Emergency dispatch alerted. Reassure the caller that help will contact them within 5 minutes.`
          }]
        });
      }

      if (functionCall.name === 'ai_employee_flow') {
        const { trigger_reason, summary } = functionCall.parameters;
        console.log(`[Automotive Art] AI Employee Flow Triggered (${trigger_reason}): ${summary}`);
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Internal team notified successfully via AI Employee Flow.`
          }]
        });
      }
    }

    if (message?.type === 'end-of-call-report') {
      console.log('[Automotive Art] End of call report received. Parsing tags for GHL CRM sync.');
      // TODO: Parse transcript, extract intent, and sync to GHL
      return res.status(200).json({});
    }

    return res.status(200).json({});
  } catch (error) {
    console.error('[Automotive Art] Webhook Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
