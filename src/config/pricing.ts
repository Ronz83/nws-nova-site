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
    id: 'lite',
    name: 'Business OS Lite',
    description: 'Essential tools for solo operators and small teams to capture leads and automate basics.',
    priceMonthly: 297,
    priceYearly: 2970, // 2 months free
    stripeMonthly: STRIPE_PRICES.lite.monthly,
    stripeYearly: STRIPE_PRICES.lite.yearly,
    features: [
      'Unlimited CRM & Pipeline Management',
      'Unified Inbox (Email, FB, IG DMs)',
      'Chat AI (Website Chatbot)',
      'Custom Website (Mobile, SEO, Hosted)',
      'Appointment Booking Calendar',
      'Basic Email Campaigns',
      'Monthly Performance Report',
      'Business Audit & CB Connect Listing',
      'Standard Support (Business Hours)'
    ]
  },
  {
    id: 'pro',
    name: 'Business OS Pro',
    description: 'Powerful AI automation for growing businesses ready to scale their operations.',
    priceMonthly: 597,
    priceYearly: 5970, // 2 months free
    stripeMonthly: STRIPE_PRICES.pro.monthly,
    stripeYearly: STRIPE_PRICES.pro.yearly,
    isPopular: true,
    features: [
      'Everything in Lite, plus:',
      'Voice AI Receptionist (Handles inbound calls)',
      'Reputation Management AI (Smart Routing)',
      'Advanced Workflow Automations (Drip, Nurture)',
      'Lead Capture Forms & Landing Pages',
      'WhatsApp Business Integration',
      'Appointment Reminders & Review Requests',
      'Priority Support (Extended Hours)'
    ]
  },
  {
    id: 'platinum',
    name: 'Business OS Platinum',
    description: 'Enterprise-grade power, custom-built workflows, and white-glove setup.',
    priceMonthly: 997,
    priceYearly: 9970, // 2 months free
    stripeMonthly: STRIPE_PRICES.platinum.monthly,
    stripeYearly: STRIPE_PRICES.platinum.yearly,
    features: [
      'Everything in Pro, plus:',
      'Multi-Location Support',
      'Multi-Agent AI (Customer Service, Sales, Support)',
      'Custom AI Workflow Builder',
      'Custom API Integrations',
      'Business App (Text AI, Voice AI, Transfers)',
      'White Glove Onboarding & Setup',
      'Advanced Analytics & Custom Reporting',
      '24/7 Priority SLA Support'
    ]
  }
];

export const FREE_TIER = {
  id: 'free',
  name: 'Business OS Free',
  description: 'Your business deserves better tools. Start free and upgrade when you are ready.',
  priceMonthly: 0,
  features: [
    'Basic CRM Shell (50 Contacts)',
    '1 Pipeline View (Read-Only)',
    'Unified Inbox Preview',
    'Basic Website Template',
    'CB Connect Directory Listing',
    'Interactive Business Audit Report'
  ]
};
