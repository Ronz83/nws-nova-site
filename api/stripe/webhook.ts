import Stripe from 'stripe';
import { provisionWorkspace } from '../connect/provisionService.js';

export default async function webhookHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    // req.body must be the raw buffer/string for signature verification!
    // In server.ts, we need to map this route with express.raw() BEFORE express.json()
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for checkout: ${session.id}`);
      console.log('Metadata:', session.metadata);
      
      try {
        const nameParts = (session.customer_details?.name || 'New Customer').split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || 'User';
        const email = session.customer_details?.email || session.customer_email || '';
        const phone = session.customer_details?.phone || '';
        const businessName = session.metadata?.businessName || `${firstName}'s Business`;

        if (email) {
          console.log(`Provisioning workspace for ${email}...`);
          const result = await provisionWorkspace({
            firstName,
            lastName,
            email,
            phone: phone || undefined,
            businessName
          });
          console.log('Provisioning successful:', result);
        } else {
          console.error('No email found in checkout session to provision workspace.');
        }
      } catch (e: any) {
        console.error('Error during auto-provisioning:', e.message);
      }
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription updated: ${subscription.id}`);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription deleted: ${subscription.id}`);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).send('OK');
}
