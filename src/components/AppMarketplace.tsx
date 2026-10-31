import { CheckCircle, ArrowRight, ExternalLink, Sparkles, Building2, Layers } from "lucide-react";
import { PRICING_TIERS, TIER2_ENTERPRISE_PLANS } from "../config/pricing";
import { BOOKING_URL } from "../config/links";

export default function AppMarketplace() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white border-t border-border-base">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* 1. Clear Bidirectional Cross-Routing Banner (Rule FS.2) */}
        <div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-amber-50/40 p-8 md:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-sky-200/70">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-700 bg-sky-100 px-3.5 py-1.5 rounded-full mb-3">
                <Sparkles size={13} /> Platform &amp; Agency Architecture Guide
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-text-base tracking-tight leading-tight">
                Choose the Right Path for Your Business Size
              </h2>
              <p className="mt-3 text-base text-text-base/80 leading-relaxed font-medium">
                <strong>noveltywebsolutions.com</strong> is our <strong>MSB (Medium-Sized Business), Enterprise &amp; Custom Campaign Agency</strong> (where projects are scoped via Discovery &amp; Custom Quote Builder), while{" "}
                <a href="https://businessesos.com" target="_blank" rel="noopener noreferrer" className="text-sky-700 font-bold underline">
                  businessesos.com (Business OS)
                </a>{" "}
                is our <strong>Self-Serve Product &amp; Service Platform</strong> for Micro-Vendors (<strong>$0/mo</strong>) and Small Businesses (<strong>$97 / $197 / $297/mo</strong>).
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-3.5 rounded-xl shadow-md transition-all"
              >
                Book MSB / Enterprise Discovery <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Direct Self-Serve Platform Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <a
              href="https://businessesos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-sky-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-700 mb-1.5">
                  <span>Self-Serve Small Business Platform</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-lg font-black text-text-base">Business OS (businessesos.com)</div>
                <p className="text-sm text-text-base/75 mt-1 font-medium">
                  Stage 0 Micro-Vendor (<strong>$0/mo</strong>) &amp; Tier 1 Small Business (<strong>$97 / $197 / $297/mo</strong>).
                </p>
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-700">
                Launch Self-Serve Plans →
              </span>
            </a>

            <a
              href="https://servicedispatch.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-sky-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-700 mb-1.5">
                  <span>Standalone Field &amp; Fleet Dispatch</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-lg font-black text-text-base">Dispatch OS (servicedispatch.app)</div>
                <p className="text-sm text-text-base/75 mt-1 font-medium">
                  Dedicated single-industry dispatch &amp; GPS tracking at <strong>$197 / $297 / $497/mo USD</strong>.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-700">
                Open Dispatch OS →
              </span>
            </a>

            <a
              href="https://ticketflows.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-sky-200 bg-white p-5 hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-700 mb-1.5">
                  <span>Construction &amp; Heavy Hauling</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-lg font-black text-text-base">TicketFlows (ticketflows.app)</div>
                <p className="text-sm text-text-base/75 mt-1 font-medium">
                  Digital load tickets &amp; quarry settlements at <strong>$497/mo</strong> App Access or <strong>$1,497/mo</strong> App + Tier 2 Suite.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-sky-700">
                Open TicketFlows →
              </span>
            </a>
          </div>
        </div>

        {/* 2. Tier 2 — MSB to Enterprise & Custom Campaigns (noveltywebsolutions.com) */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sky-700 font-bold">
                <Building2 size={14} /> Tier 2 · MSB, Enterprise &amp; Custom Campaigns (noveltywebsolutions.com)
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-text-base mt-2 tracking-tight">
                Full-Service Managed Implementation &amp; Custom Engineering
              </h3>
            </div>
            <p className="text-sm text-text-base/75 max-w-md font-medium">
              All Tier 2 and Enterprise engagements include our <strong>Dedicated Onboarding &amp; Support Team Service</strong> and are scoped via Discovery &amp; Custom Quote Builder.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {TIER2_ENTERPRISE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 flex flex-col justify-between border-2 transition-all ${
                  plan.isFeatured
                    ? "border-sky-500 bg-sky-50/40 shadow-lg"
                    : "border-slate-200 bg-white hover:border-sky-200"
                }`}
              >
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700 bg-sky-100 px-3 py-1 rounded-full mb-4">
                    {plan.badge}
                  </span>
                  <h4 className="text-xl font-black text-text-base">{plan.name}</h4>
                  <div className="mt-4 pb-4 border-b border-slate-200">
                    <div className="text-2xl md:text-3xl font-black text-text-base">{plan.priceLabel}</div>
                    <p className="text-xs font-bold text-sky-700 mt-1">{plan.setupLabel}</p>
                  </div>
                  <p className="mt-4 text-sm text-text-base/80 font-medium leading-relaxed">
                    {plan.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 mb-6">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-text-base/90 font-medium">
                        <CheckCircle size={16} className="text-sky-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-bold py-4 px-5 rounded-xl transition-all ${
                    plan.isFeatured
                      ? "bg-accent-deep hover:bg-sky-800 text-white shadow-md"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.ctaText} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Visible Small Business Pricing Reference (businessesos.com) */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sky-700 font-bold">
                <Layers size={14} /> Small Business Self-Serve Reference (businessesos.com)
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-text-base mt-1 tracking-tight">
                Micro-Vendor ($0/mo) &amp; Tier 1 Small Business Plans ($97 / $197 / $297/mo)
              </h3>
              <p className="text-sm text-text-base/75 mt-1 font-medium">
                Looking for instant self-serve onboarding? Sign up directly on <strong>businessesos.com</strong>. Optional AI Add-Ons available at <strong>+$50/mo Starter AI</strong> or <strong>+$97/mo Pro Voice AI</strong> (0% partner commission pass-through).
              </p>
            </div>
            <a
              href="https://businessesos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-bold bg-sky-600 hover:bg-sky-700 text-white px-6 py-3.5 rounded-xl shadow-sm shrink-0"
            >
              Go to businessesos.com <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.id} className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-black text-text-base">{tier.name}</div>
                  <div className="text-2xl font-black text-sky-700 mt-1">
                    ${tier.priceMonthly}<span className="text-xs text-text-base/60 font-bold">/mo USD</span>
                  </div>
                  <p className="text-xs text-text-base/75 mt-2 font-medium leading-relaxed">{tier.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {tier.features.map((f) => (
                      <li key={f} className="text-xs text-text-base/85 font-medium flex items-start gap-1.5">
                        <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="https://businessesos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors"
                >
                  {tier.ctaText} <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
