import { useState } from "react";
import { Check, Sparkles, ArrowRight, Zap, HelpCircle } from "lucide-react";
import BookingModal from "../components/BookingModal";

const plans = [
  {
    name: "Website Design",
    price: "From $1,500",
    period: "one-time",
    badge: "Project",
    featured: false,
    description: "A fully custom, mobile-first website built in React or your preferred platform. Includes design, development, and 3 months post-launch support.",
    features: [
      "Custom UI/UX design (Figma → Code)",
      "React / Next.js / WordPress / Shopify",
      "SEO optimization & Google Analytics",
      "Booking + lead capture integration",
      "3 revision rounds",
      "3 months post-launch support",
    ],
    cta: "Start a Website Project",
  },
  {
    name: "Solo Operations",
    price: "$299",
    period: "per month",
    badge: "Most Popular",
    setup: "+ $499 setup",
    featured: true,
    description: "Your complete AI reception and operations layer for solo operators and small teams. Nova handles your calls, books appointments, and syncs your CRM.",
    features: [
      "AI Voice Receptionist (Nova) — unlimited calls",
      "Custom knowledge base training",
      "Calendar booking integration",
      "GHL CRM sync",
      "Website hosting & maintenance",
      "Monthly performance reports",
      "Business hours escalation routing",
    ],
    cta: "Start with Solo",
  },
  {
    name: "Business Operations",
    price: "$599",
    period: "per month",
    badge: "Full Stack",
    setup: "+ $799 setup",
    featured: false,
    description: "Full-stack operations for growing businesses. Everything in Solo, plus multi-channel outreach, reputation management, and priority support.",
    features: [
      "Everything in Solo Operations",
      "SMS + email drip automations",
      "Custom workflow builds",
      "Google & Facebook reputation management",
      "AI-written review replies",
      "Priority support (same-day)",
      "Quarterly strategy review calls",
    ],
    cta: "Start with Business",
  },
];

const faqs = [
  { q: "Is there a minimum contract?", a: "No. Monthly plans are cancel-anytime. Website projects are milestone-based (deposit + final)." },
  { q: "Can I upgrade from Solo to Business later?", a: "Yes. We prorate the difference. You keep all existing configurations and integrations." },
  { q: "What payment methods do you accept?", a: "Credit/debit cards, PayPal, wire transfer, and local Caribbean bank transfer." },
  { q: "What happens after the setup sprint?", a: "You go live. NWS monitors call quality, reviews logs weekly, and retrains Nova if edge cases arise." },
];

export default function PricingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Investment</span>
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight leading-[1.04] text-text-base mt-3">
            Transparent pricing. <span className="italic text-accent-primary">No surprises.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Every plan includes a dedicated setup sprint, ongoing support, and a system that compounds in value the longer it runs.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(plan => (
            <div key={plan.name} className={`relative rounded-[24px] border-2 flex flex-col p-8 transition-all shadow-sm hover:shadow-lg ${plan.featured ? "border-sky-300 bg-gradient-to-b from-sky-50 to-white" : "border-slate-100 bg-white hover:border-sky-100"}`}>
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
                  <h2 className="text-lg font-black text-text-base">{plan.name}</h2>
                  <div className="text-3xl font-black font-mono text-text-base mt-1">{plan.price}
                    <span className="text-sm font-sans text-text-muted font-bold"> /{plan.period}</span>
                  </div>
                  {plan.setup && <div className="text-[10px] text-text-muted font-medium mt-0.5">{plan.setup} · Cancel anytime</div>}
                </div>
                {plan.featured
                  ? <div className="p-3 bg-sky-100 border border-sky-200 rounded-xl text-sky-600"><Zap size={18} /></div>
                  : <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-400"><Zap size={18} /></div>
                }
              </div>

              <p className="text-xs text-text-muted font-medium leading-relaxed border-b border-slate-100 pb-5 mb-5">{plan.description}</p>

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
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="max-w-6xl mx-auto mt-6 border-2 border-slate-100 bg-slate-50 rounded-2xl p-6 text-center">
          <p className="text-sm text-text-muted font-medium">
            Building something bigger? <span className="font-bold text-text-base">Enterprise packages</span> are available for franchises, multi-location businesses, and law firms.{" "}
            <button onClick={() => setIsBookingOpen(true)} className="text-sky-600 font-bold hover:underline cursor-pointer bg-transparent border-none p-0">Book a custom consultation →</button>
          </p>
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
