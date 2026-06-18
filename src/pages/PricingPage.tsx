import { useState } from "react";
import { Check, Sparkles, ArrowRight, Zap, HelpCircle, Code, TrendingUp, Briefcase } from "lucide-react";
import BookingModal from "../components/BookingModal";

const faqs = [
  { q: "Is there a minimum contract?", a: "No. Monthly plans are cancel-anytime. Website projects are milestone-based (deposit + final)." },
  { q: "Can I upgrade from Starter to Growth later?", a: "Yes. We prorate the difference. You keep all existing configurations and integrations." },
  { q: "What payment methods do you accept?", a: "Credit/debit cards, PayPal, wire transfer, and local Caribbean bank transfer." },
  { q: "What happens after the setup sprint?", a: "You go live. NWS monitors call quality, reviews logs weekly, and retrains Samantha if edge cases arise." },
];

export default function PricingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  const aiPlans = [
    {
      name: "Business Starter Plan",
      price: "$299",
      yearlyPrice: "$249",
      setup: "Plan ID: 699de84a85af9a057dbd9460",
      label: "Essential automation for growing businesses",
      featured: true,
      badge: "Most Popular",
      features: [
        "NWS CRM/business platform",
        "AI receptionist agent",
        "Customer support agent",
        "Appointment bookings",
        "Service bookings",
        "White glove onboarding",
        "Products/Services integration",
        "Gift cards generator",
      ],
      cta: "Start with Starter",
    },
    {
      name: "Business Growth Plan",
      price: "$599",
      yearlyPrice: "$499",
      setup: "Plan ID: 69b8241c10e29a130b3d993c",
      label: "Full-stack integration for scaling enterprises",
      featured: false,
      badge: "Full Stack",
      features: [
        "Everything in starter",
        "Full AI employee integration",
        "Business landing page",
        "Reputation management",
        "Email marketing campaigns",
        "Nurture campaigns",
        "Business mobile app",
      ],
      cta: "Start with Growth",
    },
  ];

  const customServices = [
    {
      name: "Website Development",
      icon: <Code size={20} />,
      desc: "Bespoke, high-converting digital storefronts engineered for your specific audience.",
      features: ["Custom React/Vite builds", "SEO & analytics setup", "Mobile-first responsive design"],
    },
    {
      name: "Marketing Services",
      icon: <TrendingUp size={20} />,
      desc: "Data-driven campaigns designed to capture leads and maximize your return on ad spend.",
      features: ["Paid ad management", "Search engine optimization", "Campaign strategy & execution"],
    },
    {
      name: "Business Development",
      icon: <Briefcase size={20} />,
      desc: "Operational scaling and CRM architecture to unify your customer interactions.",
      features: ["Sales funnel architecture", "CRM strategy & setup", "Process automation mapping"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Plans & Services</span>
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight leading-[1.04] text-text-base mt-3">
            Business Operations Infrastructure.
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Just like ServiceNow revolutionized enterprise IT, Novelty Web Solutions unifies your customer interactions, sales, and operations into a single intelligent platform.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          
          {/* AI Employee Plans */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h3 className="text-2xl font-black text-text-base">AI Employee Plans</h3>
              
              <div className="flex items-center justify-center gap-3">
                <span className={`text-sm font-bold transition-colors ${!isYearly ? "text-text-base" : "text-text-muted"}`}>Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-7 bg-slate-200 rounded-full cursor-pointer transition-colors"
                  aria-label="Toggle billing cycle"
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? "translate-x-7 bg-sky-500" : ""}`} />
                </button>
                <span className={`text-sm font-bold flex items-center gap-1.5 transition-colors ${isYearly ? "text-text-base" : "text-text-muted"}`}>
                  Yearly 
                  <span className="text-[9px] uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Save 17%</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
              {aiPlans.map(plan => {
                const currentPrice = isYearly ? plan.yearlyPrice : plan.price;

                return (
                  <div key={plan.name} className={`relative rounded-[24px] border-2 flex flex-col p-8 transition-all shadow-sm hover:shadow-lg ${plan.featured ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white md:-mt-4 md:-mb-4" : "border-slate-100 bg-white hover:border-sky-100"}`}>
                    {plan.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-sunrise-gradient text-white text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full shadow-md">
                        <Sparkles size={9} />
                        {plan.badge}
                      </div>
                    )}
                    {!plan.featured && (
                      <span className="text-[9px] uppercase tracking-widest text-sky-600 font-bold mb-2">{plan.badge}</span>
                    )}

                    <div className="flex justify-between items-start mb-5 mt-2">
                      <div>
                        <h2 className="text-xl font-black text-text-base">{plan.name}</h2>
                        <div className="text-3xl font-black font-mono text-text-base mt-1">
                          {currentPrice}
                          <span className="text-sm font-sans text-text-muted font-bold"> /mo</span>
                        </div>
                        {isYearly && <div className="text-[10px] text-emerald-600 font-bold mt-1">Billed at ${plan.name === "Business Starter Plan" ? "2,990" : "5,990"}/yr</div>}
                      </div>
                      {plan.featured
                        ? <div className="p-3 bg-sky-100 border border-sky-200 rounded-xl text-sky-600 shadow-sm"><Zap size={18} /></div>
                        : <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"><Zap size={18} /></div>
                      }
                    </div>

                    <p className="text-xs text-text-muted font-medium leading-relaxed border-b border-slate-100 pb-5 mb-5">{plan.label}</p>

                    <ul className="flex flex-col gap-3 mb-8 flex-grow">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-sm text-text-muted font-medium">
                          <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${plan.featured ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"}`}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className={`w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-bold px-6 py-4 rounded-xl transition-all cursor-pointer border-2 shadow-sm ${plan.featured ? "bg-accent-deep hover:bg-sky-800 text-white border-transparent shadow-md" : "border-slate-200 hover:border-sky-300 text-text-muted hover:text-sky-700 bg-transparent hover:bg-sky-50"}`}
                    >
                      {plan.cta} <ArrowRight size={12} />
                    </button>
                    <p className="text-[9px] text-text-muted/60 text-center font-mono mt-4">{plan.setup}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Services */}
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-2xl font-black text-text-base mb-8 text-center">Consultation Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customServices.map(service => (
                <div key={service.name} className="border-2 border-slate-100 rounded-2xl p-6 bg-slate-50 hover:border-sky-200 transition-colors flex flex-col h-full">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl w-fit text-sky-600 shadow-sm mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-black text-text-base mb-2">{service.name}</h4>
                  <p className="text-xs text-text-muted font-medium leading-relaxed mb-6">{service.desc}</p>
                  
                  <ul className="flex flex-col gap-2 mb-8 flex-grow">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex gap-2 items-start text-[11px] text-text-muted font-medium">
                        <span className="text-sky-500 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full text-[10px] uppercase tracking-[0.15em] font-bold px-4 py-3 rounded-xl border border-slate-200 hover:border-sky-300 text-text-muted hover:text-sky-700 bg-white transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </button>
                </div>
              ))}
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
                  <span className={`text-lg font-black transition-transform ${openFaq === i ? "rotate-45 text-sky-500" : "text-slate-300"}`}>+</span>
                </div>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-text-muted font-medium leading-relaxed border-t border-sky-100 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
