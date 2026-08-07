import { useEffect, useRef } from "react";
import { Star, MessageSquare, ShieldAlert, Zap, TrendingUp, ArrowRight, Shield } from "lucide-react";

const capabilities = [
  { icon: <Star size={20} />, title: "Automated Review Requests", desc: "Instantly sends SMS review requests to customers after a completed service." },
  { icon: <MessageSquare size={20} />, title: "AI Review Replies", desc: "The AI drafts and posts thoughtful replies to reviews across Google and Facebook." },
  { icon: <ShieldAlert size={20} />, title: "Negative Review Gating", desc: "Routes unhappy customers to a private feedback form before they can leave a public review." },
  { icon: <Shield size={20} />, title: "Dispute Management", desc: "Alerts you immediately when a negative review is posted so you can intercept it." },
  { icon: <TrendingUp size={20} />, title: "SEO Boost", desc: "More 5-star reviews directly improve your Google Maps ranking and visibility." },
  { icon: <Zap size={20} />, title: "Set It & Forget It", desc: "Fully automated pipeline. You focus on the work, the system builds your reputation." },
];

const stats = [
  { value: "4.9+", label: "Average Client Rating" },
  { value: "3x", label: "More Google Reviews" },
  { value: "5,200+", label: "5-Star Reviews Generated" },
  { value: "100%", label: "Automated" },
];

export default function Reputation() {
  const voiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (voiceRef.current && !voiceRef.current.querySelector('script')) {
      const s = document.createElement('script');
      s.src = 'https://widgets.leadconnectorhq.com/loader.js';
      s.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      s.setAttribute('data-widget-id', '6914a81b33e99255993705fa');
      voiceRef.current.appendChild(s);
    }
  }, []);

return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100 blur-[140px] rounded-full pointer-events-none opacity-60"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 border border-sky-200 bg-sky-50 px-4 py-2 rounded-full text-sm tracking-[0.2em] uppercase font-bold text-sky-700 mb-6 shadow-sm">
              <Star size={11} className="animate-pulse text-sky-500" />
              Automated Reputation Management
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-[-0.04em] leading-[1.04] text-text-base">
              One Bad Review Can <span className="text-accent-primary">Sink You.</span>
            </h1>
            <p className="mt-4 text-sm text-text-muted leading-relaxed font-medium max-w-md">
              Happy customers don't leave reviews. Angry ones do. Our automated system intercepts bad feedback privately and drives 5-star reviews publicly — boosting your Google rank on autopilot.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all shadow-md cursor-pointer border-none">
                Book a Discovery Call <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Simple Visual Instead of Widget */}
          <div className="w-full h-64 border-2 border-slate-100 bg-slate-50 flex items-center justify-center rounded-[28px] shadow-lg overflow-hidden relative">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 absolute hover:scale-105 transition-transform cursor-default">
              <div className="flex gap-1 justify-center mb-2 text-[#d5ac4f]">
                 <Star size={24} fill="currentColor" />
                 <Star size={24} fill="currentColor" />
                 <Star size={24} fill="currentColor" />
                 <Star size={24} fill="currentColor" />
                 <Star size={24} fill="currentColor" />
              </div>
              <h3 className="font-bold text-lg text-text-base">Amazing Service!</h3>
              <p className="text-sm text-text-muted max-w-[200px] mt-1">"They were fast, professional, and solved my problem instantly."</p>
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
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">How It Works</span>
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
            <h2 className="text-3xl md:text-4xl font-black text-text-base mt-3 mb-6">Build a 5-star reputation while you sleep.</h2>
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Job Completed", desc: "Your technician finishes a job or you mark a client as 'Won' in the CRM." },
                { step: "02", title: "Automated SMS", desc: "An automated SMS is sent 1 hour later asking: 'How did we do?'" },
                { step: "03", title: "Smart Routing", desc: "5-star experiences are routed directly to Google Maps. Anything less is routed to a private feedback form." },
                { step: "04", title: "AI Replies", desc: "The AI automatically replies to the Google review, thanking them and boosting local SEO." },
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
          <h3 className="text-2xl md:text-3xl font-black text-text-base">Ready to dominate local search?</h3>
          <p className="text-sm text-text-muted mt-3 font-medium">Setup takes 5–10 business days. Book a call and we'll walk you through the full training protocol.</p>
          <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all">
            Book a Discovery Call <ArrowRight size={12} />
          </a>
        </div>
      </section>

    </div>
  );
}
