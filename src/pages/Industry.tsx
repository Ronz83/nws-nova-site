import { Settings, FileCode, Zap, Workflow, Search, PenTool, LayoutTemplate, Briefcase, ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";

const capabilities = [
  { icon: <LayoutTemplate size={20} />, title: "Pre-built Snapshots", desc: "A CRM and website layout designed specifically for your industry's workflows." },
  { icon: <PenTool size={20} />, title: "Industry AI Prompts", desc: "Your AI is pre-trained on the vocabulary and common questions of your field." },
  { icon: <FileCode size={20} />, title: "Custom Intake Forms", desc: "Collect the exact data you need before the first meeting or job." },
  { icon: <Workflow size={20} />, title: "Specialized Pipelines", desc: "Track leads through stages that actually make sense for your business model." },
  { icon: <Search size={20} />, title: "SEO Templates", desc: "Websites pre-optimized for local search keywords in your industry." },
  { icon: <Zap size={20} />, title: "1-Click Install", desc: "Launch an entire digital infrastructure in minutes, not months." },
];

const stats = [
  { value: "100%", label: "Custom Fit" },
  { value: "0", label: "Dev Required" },
  { value: "10x", label: "Faster Launch" },
  { value: "24/7", label: "Reliability" },
];

export default function IndustryTemplate() {
  const { industry } = useParams();
  
  const formattedIndustry = industry ? industry.charAt(0).toUpperCase() + industry.slice(1).replace(/-/g, ' ') : "Your Industry";

return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100 blur-[140px] rounded-full pointer-events-none opacity-60"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 border border-sky-200 bg-sky-50 px-4 py-2 rounded-full text-sm tracking-[0.2em] uppercase font-bold text-sky-700 mb-6 shadow-sm">
              <Settings size={11} className="animate-pulse text-sky-500" />
              NWS Industry Blueprints
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-[-0.04em] leading-[1.04] text-text-base capitalize">
              General Software Doesn't Work for <span className="text-accent-primary">{formattedIndustry}s.</span>
            </h1>
            <p className="mt-4 text-sm text-text-muted leading-relaxed font-medium max-w-md">
              You shouldn't have to change how you work to fit your software. We build specialized Business OS snapshots that match your exact business model.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all shadow-md cursor-pointer border-none">
                Book a Discovery Call <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Simple Visual Instead of Widget */}
          <div className="w-full h-64 border-2 border-slate-100 bg-slate-50 flex items-center justify-center rounded-[28px] shadow-lg overflow-hidden relative p-8">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-sky-600">
                    <Briefcase size={32} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-2 w-32 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                    <div className="h-2 w-40 bg-slate-200 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-10 px-6 border-b border-border-base bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black font-mono text-sky-600">{stat.value}</div>
              <div className="text-sm uppercase tracking-widest text-text-muted font-bold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-20 px-6 bg-bg-tint border-b border-border-base">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">What's in the Box</span>
            <h2 className="text-3xl md:text-4xl font-black text-text-base mt-3">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <div key={i} className="border-2 border-slate-100 bg-white rounded-2xl p-7 hover:border-sky-200 hover:shadow-md transition-all duration-300">
                <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl w-fit text-sky-600 mb-5 shadow-sm">
                  {cap.icon}
                </div>
                <h3 className="text-base font-black text-text-base mb-2">{cap.title}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Trained */}
      <section className="py-20 px-6 bg-white border-b border-border-base">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">The Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-text-base mt-3 mb-6">Your blueprint, installed instantly.</h2>
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Select Your Niche", desc: "We have pre-built architectures for home services, real estate, agencies, and more." },
                { step: "02", title: "Apply Snapshot", desc: "With one click, your CRM is populated with the exact funnels, emails, and forms you need." },
                { step: "03", title: "Brand Customization", desc: "We map the templates to your colors, logo, and domain." },
                { step: "04", title: "Go Live", desc: "Launch your customized system faster than building from scratch." },
              ].map(s => (
                <div key={s.step} className="flex gap-5 items-start">
                  <span className="text-3xl font-black font-mono text-slate-100 shrink-0 leading-none">{s.step}</span>
                  <div>
                    <h4 className="font-black text-text-base text-sm mb-1">{s.title}</h4>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample conversation */}
          <div className="border-2 border-slate-100 bg-white rounded-[24px] p-6 shadow-lg font-sans flex flex-col gap-3">
            <div className="text-sm uppercase tracking-widest text-sky-600 font-bold border-b border-border-base pb-3 mb-2">Sample Interaction</div>
            <div className="self-end max-w-[85%] bg-slate-100 text-text-base px-4 py-3 rounded-2xl rounded-tr-none text-sm font-medium shadow-sm">
              Hi, do you offer website redesigns for existing businesses?
            </div>
            <div className="self-start max-w-[90%] bg-sky-500 text-white px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed font-medium shadow-md">
              <span className="text-sm uppercase tracking-widest text-sky-200 block mb-1">Samantha · NWS AI</span>
              Absolutely! We specialize in full website rebuilds — typically from $1,500. We'd do a full brand audit, rebuild in React for speed, and integrate your booking calendar. Want me to schedule a 30-minute strategy call with Ronald this week?
            </div>
            <div className="self-end max-w-[85%] bg-slate-100 text-text-base px-4 py-3 rounded-2xl rounded-tr-none text-sm font-medium shadow-sm">
              Yes, Thursday afternoon works.
            </div>
            <div className="self-start max-w-[90%] bg-sky-500 text-white px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed font-medium shadow-md">
              <span className="text-sm uppercase tracking-widest text-sky-200 block mb-1">Samantha · NWS AI</span>
              Perfect — I've opened Thursday 2 PM EST in our calendar. I'll send a confirmation link to your email now. Is there anything specific you'd like Ronald to review beforehand?
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-bg-tint">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black text-text-base">Ready to upgrade your operations?</h3>
          <p className="text-sm text-text-muted mt-3 font-medium">Setup takes 5–10 business days. Book a call and we'll walk you through the full training protocol.</p>
          <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all">
            Book a Discovery Call <ArrowRight size={12} />
          </a>
        </div>
      </section>

    </div>
  );
}
