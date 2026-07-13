import { useState } from "react";
import { Check, Sparkles, ArrowRight, Zap, HelpCircle, Code, Workflow, Layers, Database } from "lucide-react";
import BookingModal from "../components/BookingModal";

const faqs = [
  { q: "Is there a minimum contract?", a: "No. Monthly plans are cancel-anytime. Website projects are milestone-based (deposit + final)." },
  { q: "Can I upgrade my tier later?", a: "Yes. We prorate the difference. You keep all existing configurations and integrations." },
  { q: "What payment methods do you accept?", a: "Credit/debit cards, PayPal, wire transfer, and local Caribbean bank transfer." },
  { q: "What happens after the setup sprint?", a: "You go live. NWS monitors performance, reviews logs weekly, and retrains AI if edge cases arise." },
];

export default function PricingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState("core");

  const tabs = [
    { id: "core", label: "Core Services", icon: <Database size={14} /> },
    { id: "ai", label: "Business OS", icon: <Workflow size={14} /> },
    { id: "website", label: "Smart Website", icon: <Code size={14} /> },
    { id: "all", label: "All-In-One", icon: <Layers size={14} /> },
  ];

  // Pillar 1
  const corePlans = [
    {
      name: "Core Starter",
      price: "$97",
      yearlyPrice: "$997",
      setup: "Industry-specific CRM",
      label: "The foundational operating system for your business",
      featured: false,
      badge: "Essential",
      features: [
        "NWS CRM/business platform",
        "Unified inbox (Email, FB, IG)",
        "Pipeline management",
        "Lead capture forms",
        "Standard reporting",
        "Technical support",
      ],
      cta: "Get Started",
    },
    {
      name: "Core Pro",
      price: "$297",
      yearlyPrice: "$2,970",
      setup: "Full automation engine",
      label: "Advanced automations for high-volume operations",
      featured: true,
      badge: "Most Popular",
      features: [
        "Everything in Starter",
        "Advanced workflow automations",
        "Email marketing campaigns",
        "Proposals & e-Contracts",
        "Review request automation",
        "Priority technical support",
      ],
      cta: "Get Core Pro",
    },
  ];

  // Pillar 2
  const aiPlans = [
    {
      name: "Starter AI",
      price: "$399",
      yearlyPrice: "$3,990",
      setup: "Requires Core Services",
      label: "Essential automation for growing businesses",
      featured: false,
      badge: "AI Essentials",
      features: [
        "AI receptionist agent",
        "Customer support agent",
        "Appointment bookings",
        "Service bookings",
        "Products/Services integration",
        "Gift cards generator",
      ],
      cta: "Add Starter AI",
    },
    {
      name: "Growth AI",
      price: "$799",
      yearlyPrice: "$7,990",
      setup: "Requires Core Services",
      label: "Full-stack integration for scaling enterprises",
      featured: true,
      badge: "Full Stack",
      features: [
        "Everything in Starter AI",
        "Reputation management AI",
        "AI nurture campaigns",
        "Business landing page integration",
        "Business mobile app",
        "Custom workflow integration",
      ],
      cta: "Add Growth AI",
    },
  ];

  // Pillar 3
  const websitePlans = [
    {
      name: "Smart Website Base",
      price: "$1,000",
      yearlyPrice: "$1,000",
      setup: "+ $197/yr Maintenance",
      label: "A custom 24/7 digital storefront that captures leads",
      featured: false,
      badge: "Base Build",
      features: [
        "Custom high-converting design",
        "Mobile-first responsiveness",
        "SEO & analytics setup",
        "Lead capture integration",
        "Basic booking integration",
        "Fast global hosting",
      ],
      cta: "Start Website Build",
    },
    {
      name: "Interactive AI Site",
      price: "Custom",
      yearlyPrice: "Custom",
      setup: "+ $197/yr Maintenance",
      label: "A complex web app with deep API and AI integration",
      featured: true,
      badge: "Premium",
      features: [
        "Everything in Base",
        "Embedded AI Chat Widget",
        "Custom portal development",
        "Deep CRM API integrations",
        "Complex appointment workflows",
        "Dedicated design sprints",
      ],
      cta: "Request Quote",
    },
  ];

  // Pillar 4
  const allInOnePlans = [
    {
      name: "The Engine",
      price: "$997",
      yearlyPrice: "$9,970",
      setup: "Full System Deployment",
      label: "Core Services + Starter AI + Smart Website",
      featured: false,
      badge: "Complete System",
      features: [
        "Core Pro CRM platform",
        "Starter AI features (Voice/Chat)",
        "Smart Website Build included",
        "White glove onboarding",
        "Dedicated account manager",
        "Done-for-you setup sprint",
      ],
      cta: "Deploy The Engine",
    },
    {
      name: "The Enterprise",
      price: "$1,497",
      yearlyPrice: "$14,970",
      setup: "Maximum Power",
      label: "Core Services + Growth AI + Interactive AI Site",
      featured: true,
      badge: "Enterprise",
      features: [
        "Core Pro CRM platform",
        "Growth AI features (Full Stack)",
        "Interactive AI Site included",
        "Bespoke workflow engineering",
        "Priority 24/7 support SLA",
        "Ongoing monthly optimization",
      ],
      cta: "Deploy Enterprise",
    },
  ];

  // Select which plans to render based on tab
  const getActivePlans = () => {
    switch (activeTab) {
      case "core": return corePlans;
      case "ai": return aiPlans;
      case "website": return websitePlans;
      case "all": return allInOnePlans;
      default: return corePlans;
    }
  };

  const currentPlans = getActivePlans();

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Plans & Services</span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-text-base mt-3">
            Business Operations Infrastructure.
          </h1>
          <p className="mt-5 text-sm text-sky-800 max-w-xl mx-auto leading-relaxed font-medium">
            Choose a standalone pillar or deploy the entire AI ecosystem. We build, host, and manage the infrastructure so you can focus on running your business.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          
          {/* Main Pricing Area */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              
              {/* Tab Navigation */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${activeTab === tab.id ? "bg-white text-sky-700 shadow-sm" : "text-sky-800 hover:bg-slate-200"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Billing Toggle */}
              {activeTab !== "website" && (
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-sm font-bold transition-colors ${!isYearly ? "text-text-base" : "text-sky-800"}`}>Monthly</span>
                  <button 
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative w-14 h-7 bg-slate-200 rounded-full cursor-pointer transition-colors"
                    aria-label="Toggle billing cycle"
                  >
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? "translate-x-7 bg-sky-500" : ""}`} />
                  </button>
                  <span className={`text-sm font-bold flex items-center gap-1.5 transition-colors ${isYearly ? "text-text-base" : "text-sky-800"}`}>
                    Yearly 
                    <span className="text-sm uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Save 17%</span>
                  </span>
                </div>
              )}
            </div>

            {/* Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {currentPlans.map(plan => {
                const currentPrice = isYearly && activeTab !== "website" ? plan.yearlyPrice : plan.price;
                const isOneTime = activeTab === "website";

                return (
                  <div key={plan.name} className={`relative rounded-[24px] border-2 flex flex-col p-8 transition-all shadow-sm hover:shadow-lg ${plan.featured ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white md:-mt-4 md:-mb-4" : "border-slate-100 bg-white hover:border-sky-100"}`}>
                    {plan.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sunrise-gradient text-white text-sm uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md">
                        <Sparkles size={12} />
                        {plan.badge}
                      </div>
                    )}
                    {!plan.featured && (
                      <span className="text-sm uppercase tracking-widest text-sky-600 font-bold mb-2">{plan.badge}</span>
                    )}

                    <div className="flex justify-between items-start mb-5 mt-2">
                      <div>
                        <h2 className="text-xl font-black text-text-base">{plan.name}</h2>
                        <div className="text-3xl font-black font-mono text-text-base mt-1">
                          {currentPrice}
                          {!isOneTime && currentPrice !== "Custom" && <span className="text-sm font-sans text-sky-800 font-bold"> /mo</span>}
                          {isOneTime && currentPrice !== "Custom" && <span className="text-sm font-sans text-sky-800 font-bold"> one-time</span>}
                        </div>
                        {isYearly && !isOneTime && <div className="text-sm text-emerald-600 font-bold mt-1">Billed at {plan.yearlyPrice}/yr</div>}
                      </div>
                      {plan.featured
                        ? <div className="p-3 bg-sky-100 border border-sky-200 rounded-xl text-sky-600 shadow-sm"><Zap size={18} /></div>
                        : <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-sky-700"><Zap size={18} /></div>
                      }
                    </div>

                    <p className="text-sm text-sky-800 font-medium leading-relaxed border-b border-slate-100 pb-5 mb-5">{plan.label}</p>

                    <ul className="flex flex-col gap-3 mb-8 flex-grow">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-sm text-sky-800 font-medium">
                          <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.featured ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-sky-700"}`}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className={`w-full flex items-center justify-center gap-2 text-sm uppercase tracking-[0.18em] font-bold px-6 py-4 rounded-xl transition-all cursor-pointer border-2 shadow-sm ${plan.featured ? "bg-accent-deep hover:bg-sky-800 text-white border-transparent shadow-md" : "border-slate-200 hover:border-sky-300 text-sky-800 hover:text-sky-700 bg-transparent hover:bg-sky-50"}`}
                    >
                      {plan.cta} <ArrowRight size={12} />
                    </button>
                    <p className="text-sm text-sky-800/80 text-center font-mono mt-4">{plan.setup}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 border-t border-border-base bg-bg-tint">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle size={20} className="text-sky-500 mx-auto mb-3" />
            <h2 className="text-2xl font-black text-text-base">Pricing FAQs</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`rounded-2xl border-2 cursor-pointer transition-all ${openFaq === i ? "border-sky-200 bg-sky-50/40" : "border-slate-100 bg-white hover:border-sky-100"}`}
              >
                <div className="flex justify-between items-center p-5 gap-4">
                  <span className={`text-sm font-bold ${openFaq === i ? "text-sky-700" : "text-text-base"}`}>{faq.q}</span>
                  <span className={`text-lg font-black transition-transform ${openFaq === i ? "rotate-45 text-sky-500" : "text-sky-600"}`}>+</span>
                </div>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-sky-800 font-medium leading-relaxed border-t border-sky-100 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
