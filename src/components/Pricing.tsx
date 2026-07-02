import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";

interface PricingProps {
  onBookDemo: () => void;
  onSignUp?: () => void;
}

export default function Pricing({ onBookDemo, onSignUp }: PricingProps) {
  const plans = [
    {
      name: "Solo Plan",
      price: "$299",
      setup: "Most Popular for Solopreneurs",
      label: "Voice AI live in 5 days — start recovering leads now.",
      featured: false,
      badge: "Solo",
      features: [
        "1 AI Receptionist (Voice + Chat)",
        "2,500 Contacts CRM",
        "1 Sales Pipeline & Calendar",
        "AI Appointment Booking",
        "Basic Nurture Workflows",
        "Web Chat Widget",
        "Full Reporting Dashboard",
      ],
      cta: "Get Started",
    },
    {
      name: "Business Plan",
      price: "$599",
      setup: "For scaling operations",
      label: "Full automation — your gaps are too costly to wait.",
      featured: true,
      badge: "Business",
      features: [
        "Everything in Solo",
        "Unlimited AI Agents (Voice + Chat)",
        "Unlimited Contacts CRM",
        "Unlimited Pipelines & Calendars",
        "Custom AI Agent Personalities",
        "Advanced Automation Workflows",
        "Full Payments Suite (Stripe)",
        "Dedicated Technical Support",
      ],
      cta: "Get Business",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 border-t border-border-base bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Intelligence Tiers</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Start free. Scale as you grow. Pay only for what you use.
          </h2>
        </div>

        {/* AI Employee Plans */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-5xl mx-auto">
            {plans.map(plan => {
              return (
                <div key={plan.name}
                  className={`relative rounded-[24px] border-2 flex flex-col p-6 lg:p-8 transition-all duration-300 shadow-sm hover:shadow-lg ${plan.featured ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white md:-mt-4 md:-mb-4" : "border-slate-100 bg-white hover:border-sky-100"}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sunrise-gradient text-white text-sm uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md whitespace-nowrap">
                      <Sparkles size={9} />
                      {plan.badge}
                    </div>
                  )}
                  {!plan.featured && (
                    <span className="text-sm uppercase tracking-widest text-sky-600 font-bold mb-2">{plan.badge}</span>
                  )}

                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 mt-2">
                    <div>
                      <h3 className="text-lg lg:text-xl font-black text-text-base">{plan.name}</h3>
                      <div className="text-3xl lg:text-4xl font-black tracking-tight mt-1 text-text-base font-mono">
                        {plan.price}
                        {plan.price !== "$0" && <span className="text-base font-sans text-text-muted font-bold"> /mo</span>}
                      </div>
                    </div>
                    {plan.featured
                      ? <div className="p-2 lg:p-3 bg-sky-100 border border-sky-200 rounded-xl text-sky-600 shadow-sm"><Zap size={18} /></div>
                      : <div className="p-2 lg:p-3 bg-slate-100 border border-slate-200 rounded-xl text-sky-700"><Zap size={18} /></div>
                    }
                  </div>

                  <p className="text-sm text-text-muted font-medium mb-6 leading-relaxed border-b border-slate-100 pb-6">{plan.label}</p>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8 flex-grow">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm lg:text-sm text-text-muted font-medium">
                        <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.featured ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-sky-700"}`}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={plan.price === "$0" && onSignUp ? onSignUp : onBookDemo}
                    className={`w-full flex items-center justify-center gap-2 text-sm lg:text-sm uppercase tracking-[0.18em] font-bold px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-200 cursor-pointer border-2 shadow-sm ${plan.featured ? "bg-accent-deep hover:bg-sky-800 text-white border-transparent shadow-md" : "border-slate-200 hover:border-sky-300 text-text-muted hover:text-sky-700 bg-transparent shadow-none hover:bg-sky-50"}`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={12} />
                  </button>
                  <p className="text-sm font-medium text-text-muted/80 text-center mt-4">{plan.setup}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
