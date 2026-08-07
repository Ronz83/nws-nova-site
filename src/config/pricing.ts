export const STRIPE_PRICES = {
  lite: {
    monthly: 'price_1TsoAAKOur9dRgFblJPCtIec',
    yearly: 'price_1TsoABKOur9dRgFbZXIbF3cQ'
  },
  pro: {
    monthly: 'price_1Tp916KOur9dRgFbShITtJVO',
    yearly: 'price_1Tp916KOur9dRgFbDPVGUrHe'
  },
  platinum: {
    monthly: 'price_1Tp916KOur9dRgFbJy3TmUuH',
    yearly: 'price_1Tp917KOur9dRgFbIQeW1dIR'
  }
};

export const PRICING_TIERS = [
  {
    id: 'lite', // Kept as 'lite' for Stripe backwards compatibility
    name: 'Business OS Solopreneur',
    description: 'You run the business. AI runs the front desk. Built for the one-person operation.',
    priceMonthly: 297,
    priceYearly: 2970, // 2 months free
    stripeMonthly: STRIPE_PRICES.lite.monthly,
    stripeYearly: STRIPE_PRICES.lite.yearly,
    features: [
      'Website Overhaul or New Build',
      'AI Chat Widget (Answers visitors 24/7)',
      'Unified Inbox (Email, FB, IG)',
      'Integrated Booking System',
      'Unlimited CRM & Pipeline Management',
      'CaricomBusiness.com Regional Listing',
      'Monthly Performance Report',
      'Business Audit & Setup Support'
    ]
  },
  {
    id: 'pro',
    name: 'Business OS Pro',
    description: 'Your AI-Powered Growth Engine. Stop missing calls and let AI handle the first conversation.',
    priceMonthly: 597,
    priceYearly: 5970, // 2 months free
    stripeMonthly: STRIPE_PRICES.pro.monthly,
    stripeYearly: STRIPE_PRICES.pro.yearly,
    isPopular: true,
    features: [
      'Everything in Solopreneur, plus:',
      'Voice AI Receptionist (Answers calls 24/7)',
      'Reputation Management AI (Auto-reviews)',
      'WhatsApp Business Integration',
      'Advanced Workflow Automations',
      'Lead Capture Forms & Landing Pages',
      'AI Copilot (Pipeline Insights)',
      '100 Monthly AI Credits Included',
      'Priority Support (Extended Hours)'
    ]
  },
  {
    id: 'platinum',
    name: 'Business OS Platinum',
    description: 'Your Complete AI Operations Center. Multiple AI agents handle sales, support, and service simultaneously.',
    priceMonthly: 997,
    priceYearly: 9970, // 2 months free
    stripeMonthly: STRIPE_PRICES.platinum.monthly,
    stripeYearly: STRIPE_PRICES.platinum.yearly,
    features: [
      'Everything in Pro, plus:',
      'Multi-Agent AI (Sales, Support, CS)',
      'Custom Agent Studio Workflows',
      'Content AI (Drafts blogs, emails, social)',
      'Weekly Automated Performance Reports',
      'Multi-Location Support',
      '500 Monthly AI Credits Included',
      'White Glove Onboarding & Setup',
      '24/7 Priority SLA Support'
    ]
  }
];
