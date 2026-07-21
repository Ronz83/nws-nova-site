import { Phone, Layers, Database, Workflow, Check, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "web-design",
    icon: <Layers size={24} />,
    color: "amber",
    iconBg: "bg-amber-50 border-amber-100 text-amber-600",
    badge: "Design & Development",
    title: "Bespoke Website Design",
    tagline: "Conversion-first websites built natively in code.",
    description: "We design and build mobile-first, fast-loading websites that position your brand as a premium operator. No page builders, no templates — every site is hand-coded in React or modern web stacks for maximum performance and SEO.",
    price: "",
    priceNote: "",
    features: [
      "Custom mobile-first UI design (Figma → Code)",
      "React / Next.js / Vite or WordPress / WooCommerce / Shopify",
      "SEO-optimized page structure and meta tags",
      "Google Analytics + conversion tracking setup",
      "Booking widget and lead capture integration",
      "3 revision rounds included",
      "CMS access for self-managed content",
      "3 months post-launch support",
    ],
  },
  {
    id: "voice-ai",
    icon: <Phone size={24} />,
    color: "sky",
    iconBg: "bg-sky-50 border-sky-100 text-sky-600",
    badge: "AI Operations",
    title: "24/7 AI Voice Receptionist",
    tagline: "An AI employee that answers your phone, always.",
    description: "Samantha is trained on your specific business — products, pricing, FAQs, and escalation rules. It handles unlimited concurrent inbound calls, qualifies leads, books calendar appointments, and syncs everything to your CRM automatically. Meet Samantha — our showcase AI receptionist. When we set up your AI Receptionist Pack, you choose the name, the voice, and the personality that fits your brand.",
    price: "From $299/mo",
    priceNote: "+ $499 one-time setup",
    features: [
      "Unlimited concurrent inbound call handling",
      "Custom semantic knowledge base training",
      "Live calendar booking integration (Calendly)",
      "CRM contact sync (HubSpot, Salesforce)",
      "SMS follow-up automation post-call",
      "Custom escalation routing (human handoff rules)",
      "Call transcript logging and review dashboard",
      "Monthly performance and call quality reports",
    ],
  },
  {
    id: "crm",
    icon: <Database size={24} />,
    color: "emerald",
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    badge: "Automation",
    title: "CRM & Marketing Automations",
    tagline: "One dashboard. Every customer interaction, synced.",
    description: "We consolidate your customer data and marketing channels into a single CRM-powered dashboard. Contacts captured via web, phone, or chat are automatically tagged, scored, and dropped into nurture sequences — with zero manual effort.",
    price: "Included in retainer",
    priceNote: "Business plan ($599/mo)",
    features: [
      "CRM workspace setup",
      "Contact import and database migration",
      "Multi-step email + SMS drip campaign builds",
      "Pipeline and deal stage configuration",
      "Lead source attribution tracking",
      "Web form → CRM auto-sync",
      "Monthly automation audit reports",
      "Integration with Zapier, Slack, and custom webhooks",
    ],
  },
  {
    id: "reputation",
    icon: <Workflow size={24} />,
    color: "violet",
    iconBg: "bg-violet-50 border-violet-100 text-violet-600",
    badge: "Local SEO",
    title: "Reputation Management",
    tagline: "More 5-star reviews. Automatically.",
    description: "Rank higher in local Google search by building a consistent review volume. We automate review request SMS/emails post-transaction and deploy AI-written personalized replies to every review — improving your local discoverability score.",
    price: "Included in retainer",
    priceNote: "Business plan ($599/mo)",
    features: [
      "Google Business Profile optimization",
      "Automated post-transaction review request SMS/email",
      "AI-generated personalized review replies",
      "Facebook Reviews integration",
      "Negative review alert and escalation routing",
      "Monthly reputation score report",
      "Competitor review benchmarking",
      "Local SEO keyword tracking dashboard",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState("web-design");
  const active = services.find(s => s.id === activeService)!;

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 blur-[120px] rounded-full pointer-events-none opacity-70"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">What We Build</span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-text-base mt-3">
            Four Services. <span className="text-accent-primary">One System.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Every NWS engagement is built around the same philosophy — automate the operations so your team focuses on the work that actually moves the business forward.
          </p>
        </div>
      </section>

      {/* Service Selector */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Tab List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {services.map(svc => (
              <button
                key={svc.id}
                onClick={() => setActiveService(svc.id)}
                className={`w-full text-left flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${activeService === svc.id ? "border-sky-200 bg-sky-50 shadow-md" : "border-slate-100 bg-white hover:border-sky-100"}`}
              >
                <div className={`p-2.5 rounded-xl border ${activeService === svc.id ? svc.iconBg : "bg-slate-50 border-slate-100 text-sky-600"} shrink-0 transition-all`}>
                  {svc.icon}
                </div>
                <div>
                  <span className="text-sm uppercase tracking-widest font-bold text-text-muted block">{svc.badge}</span>
                  <span className={`text-sm font-black transition-colors ${activeService === svc.id ? "text-sky-700" : "text-text-base"}`}>{svc.title}</span>
                </div>
                {activeService === svc.id && <ChevronDown size={14} className="ml-auto text-sky-500 -rotate-90" />}
              </button>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-8 border-2 border-slate-100 bg-white rounded-[28px] p-8 md:p-10 shadow-sm">
            <div className="flex justify-between items-start gap-6 mb-6">
              <div>
                <div className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded-full text-sm uppercase tracking-[0.2em] font-bold mb-3 ${active.iconBg}`}>
                  {active.icon}
                  {active.badge}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-text-base tracking-tight">{active.title}</h2>
                <p className="text-sm text-sky-600 font-bold mt-1 italic">{active.tagline}</p>
              </div>
              <div className="text-right shrink-0">
                {active.price && <div className="text-xl font-black font-mono text-text-base">{active.price}</div>}
                {active.priceNote && <div className="text-sm text-text-muted font-medium">{active.priceNote}</div>}
              </div>
            </div>

            <p className="text-sm text-text-muted leading-relaxed font-medium mb-8 border-b border-border-base pb-8">{active.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {active.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-text-muted font-medium">
                  <div className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <a href="/services/samantha-ai" className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer border-none">
              <span>Book a Consultation</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 border-t border-border-base bg-bg-tint">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black text-text-base">Not sure which service fits?</h3>
          <p className="text-sm text-text-muted mt-3 font-medium">Book a free 30-minute strategy call. We'll map your current setup and recommend the right entry point.</p>
          <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all">
            Book Free Consultation <ArrowRight size={12} />
          </a>
        </div>
      </section>
    </div>
  );
}
