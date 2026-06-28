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

      if (functionCall.name === 'trigger_sales_email') {
        const { name, email, brand_interest } = functionCall.parameters;
        console.log(`[Automotive Art] Triggering sales email for ${name} (${email}) regarding ${brand_interest}`);
        // TODO: Integrate with SendGrid/GHL to actually send the email
        
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Sales email for ${brand_interest} successfully queued for ${name}.`
          }]
        });
      }

      if (functionCall.name === 'book_service_appointment') {
        const { name, email, service_type } = functionCall.parameters;
        console.log(`[Automotive Art] Triggering service booking link for ${name} (${email}) for ${service_type}`);
        // TODO: Integrate with SendGrid/GHL to send calendar link
        
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Service booking link successfully queued for ${name}.`
          }]
        });
      }
      
      if (functionCall.name === 'transfer_call_to_human') {
        const { department } = functionCall.parameters;
        console.log(`[Automotive Art] Transferring call to ${department} department.`);
        
        // Vapi expects a specific response to execute a SIP transfer or phone number transfer
        // Note: You must configure the transfer destination in the Vapi dashboard or return it here.
        return res.status(200).json({
          results: [{
            toolCallId: functionCall.id,
            result: `Transferring caller to the ${department} department now.`
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
