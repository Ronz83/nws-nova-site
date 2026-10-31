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
    id: 'free',
    name: 'Stage 0 · Micro-Vendor',
    description: 'Free grassroots account for micro-vendors, market stalls, and solo artisans on businessesos.com.',
    priceMonthly: 0,
    priceYearly: 0,
    stripeMonthly: '',
    stripeYearly: '',
    ctaText: 'Start Free on Business OS',
    selfServeUrl: 'https://businessesos.com',
    features: [
      'Native Business OS Account ($0/mo)',
      '3-Button Mobile Quick-Sale POS (10 Items)',
      'BiMPay / 1stPay / Cash QR Acceptance',
      'Instant WhatsApp Digital Receipts',
      'CariProof Starter Income Ledger'
    ]
  },
  {
    id: 'starter',
    name: 'Tier 1 · Starter',
    description: 'Essential Business OS CRM & POS foundation for solo operators and small shops.',
    priceMonthly: 97,
    priceYearly: 970,
    stripeMonthly: STRIPE_PRICES.frontdesk.monthly,
    stripeYearly: STRIPE_PRICES.frontdesk.yearly,
    ctaText: 'Start $97/mo on Business OS',
    selfServeUrl: 'https://businessesos.com',
    features: [
      'Provisioned Business OS Sub-Account Snapshot',
      'Full POS + CBPay & Smart Booking Engine',
      'Unified Inbox (WhatsApp, IG, FB, Web Chat, Email — Zero SMS)',
      'OneSignal Push Reminders & CariProof Ledger',
      'Optional AI Add-On: +$50/mo Starter AI or +$97/mo Pro Voice AI'
    ]
  },
  {
    id: 'growth',
    name: 'Tier 1 · Growth',
    description: 'Multi-worker splits, automated pipelines, and reserve settlement for growing shops.',
    priceMonthly: 197,
    priceYearly: 1970,
    stripeMonthly: STRIPE_PRICES.lite.monthly,
    stripeYearly: STRIPE_PRICES.lite.yearly,
    isPopular: true,
    ctaText: 'Start $197/mo on Business OS',
    selfServeUrl: 'https://businessesos.com',
    features: [
      'Everything in Starter ($97/mo), plus:',
      'CariSplit Multi-Worker & Booth-Renter Auto-Splits',
      'CariVault 1:1 Local Currency Settlement Reserve',
      'Multi-Staff & Resource Calendar Scheduling',
      'Automated WhatsApp, Push & Email Follow-Up Workflows',
      'Optional AI Add-On: +$50/mo Starter AI or +$97/mo Pro Voice AI'
    ]
  },
  {
    id: 'pro',
    name: 'Tier 1 · Pro',
    description: 'Complete small-business operating suite with dedicated onboarding & support team.',
    priceMonthly: 297,
    priceYearly: 2970,
    stripeMonthly: STRIPE_PRICES.pro.monthly,
    stripeYearly: STRIPE_PRICES.pro.yearly,
    ctaText: 'Start $297/mo on Business OS',
    selfServeUrl: 'https://businessesos.com',
    features: [
      'Everything in Growth ($197/mo), plus:',
      'Dedicated Onboarding & Support Team Included',
      'Advanced Pipeline, Reputation & Review Engine',
      'Full CariSplit, CariProof & CariVault Suite',
      'Featured Regional CARICOM Business Directory Sync',
      'Optional AI Add-On: +$50/mo Starter AI or +$97/mo Pro Voice AI'
    ]
  }
];

export const TIER2_ENTERPRISE_PLANS = [
  {
    id: 'commercial-growth-core',
    badge: 'MSB Full-Service',
    name: '1. Commercial Growth Core (MSB)',
    priceLabel: 'Starting at $997/mo USD',
    setupLabel: '+$1,000 one-time setup — scoped via Discovery',
    description: 'Turnkey managed implementation for established medium-sized businesses requiring custom CRM, funnels, and 24/7 Voice & WhatsApp AI.',
    ctaText: 'Book Discovery & Custom Quote',
    features: [
      'Managed Business OS Sub-Account & Custom CRM Implementation',
      'Custom Website / Conversion Funnel Suite',
      '24/7 Voice & WhatsApp AI Receptionist Included',
      'Up to 15 Staff Accounts & Role Permissions',
      'Dedicated Onboarding & Support Team Service'
    ]
  },
  {
    id: 'standalone-app-tier2-bundle',
    badge: 'Flagship Fleet & Industry Bundle',
    name: '2. Full Standalone App + Tier 2 Business Suite Bundle',
    priceLabel: '$1,497/mo USD',
    setupLabel: '$497/mo Standalone App (TicketFlows or Dispatch OS Pro) + $997/mo Tier 2 Niche Business Suite (+$1,500 setup)',
    description: 'Complete vertical operating system combining our flagship fleet/dispatch app with your full custom Business OS enterprise back-office.',
    isFeatured: true,
    ctaText: 'Scope App + Tier 2 Bundle',
    features: [
      '$497/mo Standalone App (TicketFlows or Dispatch OS Pro) Included',
      '$997/mo Tier 2 Niche Business Suite Included',
      'Up to 10 Trucks/Vehicles (or up to 35 Staff)',
      'Full Industry CRM Snapshot + Contractor/Fleet Portal',
      'CariSplit + CariProof + 24/7 Voice & WhatsApp AI',
      'Dedicated Onboarding & Support Team Service'
    ]
  },
  {
    id: 'enterprise-regional-transformation',
    badge: 'Enterprise & Custom SOW',
    name: '3. Enterprise & Regional Transformation',
    priceLabel: '$2,997/mo to $5,000+/mo USD',
    setupLabel: 'Custom Proposal & Statement of Work (SOW)',
    description: 'Multi-branch and multi-island rollouts, custom software engineering, ERP integrations, and dedicated campaign management.',
    ctaText: 'Request Custom Proposal & SOW',
    features: [
      'Multi-Branch & Multi-Island CARICOM Rollouts',
      'Custom Software, Web & Native Mobile Apps',
      'Deep ERP, Banking, Payment & API Integrations',
      'Dedicated Novelty Engineering & Campaign Management',
      'Executive SLA & White-Glove Team Training'
    ]
  }
];
