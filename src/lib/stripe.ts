import { loadStripe } from '@stripe/stripe-js';

// The publishable key from environment variables
// @ts-ignore - stripePromise is currently unused but kept for future checkout usage
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function redirectToCheckout(priceId: string, customerEmail?: string, industry?: string, tier?: string) {
  try {
    const currentUrl = new URL(window.location.href);
    const successUrl = new URL(currentUrl.pathname, window.location.origin);
    successUrl.searchParams.set('checkout', 'success');
    if (tier) successUrl.searchParams.set('tier', tier);

    const cancelUrl = new URL(currentUrl.pathname, window.location.origin);
    cancelUrl.searchParams.set('checkout', 'canceled');
    cancelUrl.hash = 'pricing';

    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerEmail,
        industry,
        tier,
        successUrl: successUrl.toString(),
        cancelUrl: cancelUrl.toString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    // Redirect the user to the Stripe Checkout page
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}
