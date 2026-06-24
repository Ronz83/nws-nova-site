import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";

interface PricingProps {
  onBookDemo: () => void;
  onSignUp?: () => void;
}

export default function Pricing({ onBookDemo, onSignUp }: PricingProps) {
  const plans = [
    {
      name: "Starter OS",
      price: "$0",
      setup: "Free forever",
      label: "Run the basics. See what's possible.",
      featured: false,
      badge: "Start Free",
      features: [
        "500 Contacts",
        "1 Sales Pipeline",
        "1 Calendar",
        "Funnel Builder",
        "Forms & Surveys",
        "Web Chat Widget",
        "20 Social Posts/Month",
        "10 Email Review Requests/Month",
        "500 Emails/Month",
        "Proposals, Contracts & e-Signature",
        "Google Integration",
        "NWS Knowledge Base & Walkthroughs",
      ],
      cta: "Get Your Free Account",
    },
    {
      name: "Growth OS",
      price: "$299",
      setup: "Most Popular",
      label: "Your business starts running on autopilot.",
      featured: true,
      badge: "Most Popular",
      features: [
        "Everything in Starter",
        "2,500 Contacts",
        "5 Pipelines & Calendars",
        "2 AI Agents (Chat + Voice)",
        "AI Appointment Booking",
        "AI Review Response Agent",
        "5 Automation Workflows",
        "2,500 Emails/Month",
        "50 Review Requests/Month",
        "100 Social Posts/Month",
        "Website Builder & Landing Pages",
        "Full Payments Suite (Stripe)",
        "Full Reporting Dashboard",
        "Zapier, API & Webhooks",
        "10 User Seats",
        "Technical Support",
      ],
      cta: "Get Growth OS",
    },
    {
      name: "Professional OS",
      price: "$799",
      setup: "For scaling teams",
      label: "Full pipeline. Full AI. Full visibility.",
      featured: false,
      badge: "Professional",
      features: [
        "Everything in Growth",
        "5,000 Contacts",
        "10 Pipelines / 20 Calendars",
        "10 AI Agents",
        "20 Automation Workflows",
        "Custom Workflow Builds (by NWS)",
        "5,000 Emails/Month",
        "200 Review Requests/Month",
        "250 Social Posts/Month",
        "100 User Seats",
        "Priority Support SLA",
      ],
      cta: "Get Professional OS",
    },
    {
      name: "Enterprise OS",
      price: "$1,499",
      setup: "Maximum power",
      label: "Unlimited scale. Maximum power.",
      featured: false,
      badge: "Enterprise",
      features: [
        "Everything in Professional",
        "Unlimited Contacts",
        "Unlimited Pipelines & Calendars",
        "Unlimited AI Agents & Workflows",
        "Unlimited Emails, Posts & Seats",
        "Custom AI Agent Personality",
        "Custom Branding",
        "Priority Support",
      ],
      cta: "Talk to Us",
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full mx-auto">
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
