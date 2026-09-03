export const STRIPE_PRICES = {
  lite: {
    monthly: 'price_1U8UIwKOur9dRgFbsSAXmmSB',
    yearly: 'price_1U8UIwKOur9dRgFbVYeeVpJ2'
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
    id: 'base',
    name: 'Base OS',
    description: 'The foundation to organize and run your essential daily operations.',
    priceMonthly: 197,
    priceYearly: 1970, // 2 months free
    stripeMonthly: STRIPE_PRICES.lite.monthly,
    stripeYearly: STRIPE_PRICES.lite.yearly,
    ctaText: 'Start Base OS',
    features: [
      'Industry-Specific CRM Framework',
      'Unified Communication Inbox',
      'Basic Workflow Automation',
      'Native Web Push Notifications',
      '10 Monthly AI Credits'
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
