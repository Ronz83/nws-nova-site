export const STRIPE_PRICES = {
  frontdesk: {
    monthly: 'price_1U0NV2KOur9dRgFbVb38VK8G',
    yearly: 'price_1U0NV2KOur9dRgFbBMOU50c0'
  },
  lite: {
    monthly: 'price_1Tp915KOur9dRgFb0bH8eP24',
    yearly: 'price_1Tp915KOur9dRgFbqts8HEZW'
  },
  pro: {
    monthly: 'price_1U8UIxKOur9dRgFbWOCRBcOi',
    yearly: 'price_1U8UIxKOur9dRgFbwiafYmiX'
  },
  platinum: {
    monthly: 'price_1U8UIyKOur9dRgFbgXo7FUzV',
    yearly: 'price_1U8UIyKOur9dRgFbGWIqx2iz'
  }
};

export const PRICING_TIERS = [
  {
    id: 'frontdesk',
    name: 'Front Desk OS',
    description: 'Essential front desk engine for solo operators and booking-driven shops.',
    priceMonthly: 29,
    priceYearly: 290, // 2 months free
    stripeMonthly: STRIPE_PRICES.frontdesk.monthly,
    stripeYearly: STRIPE_PRICES.frontdesk.yearly,
    ctaText: 'Start Front Desk OS',
    features: [
      'Zero-Commission Booking Engine',
      '24/7 Web & Mobile Scheduling',
      'Native Push Reminders (OneSignal)',
      'Unified Customer Inbox',
      'Pay-As-You-Go AI Micro-Credits'
    ]
  },
  {
    id: 'base',
    name: 'Base OS',
    description: 'The foundation to organize and run your essential daily operations.',
    priceMonthly: 197,
    priceYearly: 1970, // 2 months free
    stripeMonthly: STRIPE_PRICES.lite.monthly,
    stripeYearly: STRIPE_PRICES.lite.yearly,
    ctaText: 'Start Base OS',
    features: [
      'Everything in Front Desk, plus:',
      'Industry-Specific CRM Framework',
      'Multi-Staff & Resource Scheduling',
      'Basic Workflow Automation',
      '50 Monthly AI Credits'
    ]
  },
  {
    id: 'pro',
    name: 'Pro OS',
    description: 'Advanced automations and proactive AI to scale your business.',
    priceMonthly: 597,
    priceYearly: 5970, // 2 months free
    stripeMonthly: STRIPE_PRICES.pro.monthly,
    stripeYearly: STRIPE_PRICES.pro.yearly,
    isPopular: true,
    ctaText: 'Start Pro OS',
    features: [
      'Everything in Base, plus:',
      'Advanced Pipeline Management',
      'Proactive Customer AI Nudges',
      'Reputation & Review Engine',
      'Department-Specific AI Copilots',
      '250 Monthly AI Credits'
    ]
  },
  {
    id: 'master',
    name: 'Master OS',
    description: 'The complete enterprise operating system for full-service dominance.',
    priceMonthly: 997,
    priceYearly: 9970, // 2 months free
    stripeMonthly: STRIPE_PRICES.platinum.monthly,
    stripeYearly: STRIPE_PRICES.platinum.yearly,
    ctaText: 'Start Master OS',
    features: [
      'Everything in Pro, plus:',
      'Emergency / High-Priority Dispatching',
      'Voice AI Receptionist (24/7 Calls)',
      'Custom Business Solutions Library',
      'White Glove Onboarding & Strategy',
      '1000 Monthly AI Credits'
    ]
  }
];
