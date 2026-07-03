import Stripe from 'stripe';

export default async function checkoutHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, customerEmail, industry, tier } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const sessionUrl = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      metadata: {
        industry: industry || 'Other',
        tier: tier || 'bos_lite'
      },
      success_url: `${process.env.VITE_SITE_URL || 'https://noveltywebsolutions.com'}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_SITE_URL || 'https://noveltywebsolutions.com'}/pricing?canceled=true`,
    });

    return res.status(200).json({ url: sessionUrl.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
