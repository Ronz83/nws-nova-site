import Stripe from 'stripe';

function getSafeUrl(candidate: string | undefined, fallback: string) {
  if (!candidate) return fallback;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return fallback;
    }
    return url.toString();
  } catch {
    return fallback;
  }
}

function withCheckoutSessionId(urlString: string) {
  const url = new URL(urlString);
  url.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}');
  return url.toString();
}

export default async function checkoutHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, customerEmail, industry, tier, successUrl, cancelUrl } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'Missing priceId' });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const origin = (() => {
      const headerOrigin = typeof req.headers?.origin === 'string' ? req.headers.origin : undefined;
      const fallbackOrigin = process.env.VITE_SITE_URL || 'https://noveltywebsolutions.com';
      return getSafeUrl(headerOrigin, fallbackOrigin).replace(/\/$/, '');
    })();

    const successRedirect = withCheckoutSessionId(getSafeUrl(
      successUrl,
      `${origin}/services/business-os?checkout=success${tier ? `&tier=${encodeURIComponent(tier)}` : ''}`
    ));
    const cancelRedirect = getSafeUrl(
      cancelUrl,
      `${origin}/services/business-os?checkout=canceled#pricing`
    );

    const sessionUrl = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      metadata: {
        industry: industry || 'Other',
        tier: tier || 'bos_lite'
      },
      success_url: successRedirect,
      cancel_url: cancelRedirect,
    });

    return res.status(200).json({ url: sessionUrl.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message });
  }
}
