import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";

interface PricingProps {
  onBookDemo: () => void;
}

export default function Pricing({ onBookDemo }: PricingProps) {
  const plans = [
    {
      name: "Solo",
      monthly: "$299",
      setup: "$499 setup",
      label: "Great for solo operators & small teams",
      color: "sky",
      featured: false,
      features: [
        "AI Voice Receptionist (unlimited calls)",
        "Custom-tuned knowledge base",
        "Live calendar booking integration",
        "CRM contact sync (GHL)",
        "Monthly performance reporting",
        "Website hosting & maintenance",
        "Business hours escalation routing",
      ],
    },
    {
      name: "Business",
      monthly: "$599",
      setup: "$799 setup",
      label: "Full-stack automation for growing businesses",
      color: "deep",
      featured: true,
      features: [
        "Everything in Solo",
        "Multi-channel outreach (SMS + email drips)",
        "Custom workflow automations",
        "Reputation management (Google + Facebook reviews)",
        "AI auto-response to reviews",
        "Priority support (same-day response)",
        "Quarterly strategy review calls",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 border-t border-border-base bg-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* Title */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Investment Tiers</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Simple, transparent pricing.
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-md mx-auto font-medium">
            Both plans include a dedicated setup sprint and ongoing support. No hidden fees — one monthly line item.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-2">
          {plans.map(plan => (
            <div key={plan.name}
              className={`relative rounded-[24px] border-2 flex flex-col p-8 md:p-10 transition-all duration-300 shadow-sm hover:shadow-lg ${plan.featured ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white" : "border-slate-100 bg-white hover:border-sky-100"}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sunrise-gradient text-white text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md">
                  <Sparkles size={9} />
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-600">{plan.name}</span>
                  <div className="text-4xl font-black tracking-tight mt-1 text-text-base font-mono">{plan.monthly}<span className="text-base font-sans text-text-muted font-bold"> /mo</span></div>
                  <span className="text-[10px] text-text-muted font-medium">{plan.setup} · Cancel anytime</span>
                </div>
                {plan.featured
                  ? <div className="p-3 bg-sky-100 border border-sky-200 rounded-xl text-sky-600 shadow-sm"><Zap size={18} /></div>
                  : <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"><Zap size={18} /></div>
                }
              </div>

              <p className="text-xs text-text-muted font-medium mb-6 leading-relaxed border-b border-slate-100 pb-6">{plan.label}</p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-grow">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-text-muted font-medium">
                    <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.featured ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"}`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookDemo}
                className={`w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-bold px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer border-none shadow-md hover:shadow-lg ${plan.featured ? "bg-accent-deep hover:bg-sky-800 text-white" : "border-2 border-slate-200 hover:border-sky-300 text-text-muted hover:text-sky-700 bg-transparent shadow-none hover:bg-sky-50"}`}
              >
                <span>Start with {plan.name}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise note */}
        <div className="border-2 border-slate-100 rounded-2xl p-6 text-center bg-slate-50">
          <p className="text-sm text-text-muted font-medium">
            Building something bigger? <span className="font-bold text-text-base">Enterprise packages</span> are available for franchises, law firms, and multi-location businesses.{" "}
            <button onClick={onBookDemo} className="text-sky-600 hover:underline font-bold cursor-pointer bg-transparent border-none p-0">Book a custom consultation →</button>
          </p>
        </div>
      </div>
    </section>
  );
}
