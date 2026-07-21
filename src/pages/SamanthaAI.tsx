import { useState, useEffect, useRef } from "react";
import { Phone, MessageSquare, Brain, Zap, CheckCircle, ArrowRight, Mic, Globe, X } from "lucide-react";
import { motion } from "framer-motion";
const capabilities = [
  { icon: <Phone size={20} />, title: "Inbound Call Handling", desc: "Answers every call instantly. Qualifies leads, captures intake info, routes based on intent." },
  { icon: <MessageSquare size={20} />, title: "Live Web Chat", desc: "Embedded on your site. Answers questions, collects contact info, and hands off to CRM." },
  { icon: <Brain size={20} />, title: "Custom Knowledge Base", desc: "Trained on your services, pricing, FAQs, and escalation rules. No generic responses." },
  { icon: <CheckCircle size={20} />, title: "Calendar Booking", desc: "Books appointments directly into your calendar. No back-and-forth emails." },
  { icon: <Zap size={20} />, title: "CRM Auto-Sync", desc: "Every contact, call, and conversation synced to your CRM in real time." },
  { icon: <Globe size={20} />, title: "24/7 Availability", desc: "Never misses a call. Works across time zones, on holidays, and during peak volume." },
];

const stats = [
  { value: "<740ms", label: "Voice Response Latency" },
  { value: "∞", label: "Concurrent Calls Handled" },
  { value: "24/7", label: "Uptime Guarantee" },
  { value: "5–10", label: "Days to Go Live" },
];

export default function Samantha() {
  const [activeEmbed, setActiveEmbed] = useState<'chat' | 'voice' | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const voiceContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[src="https://beta.leadconnectorhq.com/loader.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://beta.leadconnectorhq.com/loader.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    if (activeEmbed === 'chat' && chatContainerRef.current && !chatContainerRef.current.querySelector('chat-widget')) {
      const w = document.createElement('chat-widget');
      w.setAttribute('data-widget-id', '6a556b66d166a8719f167972');
      chatContainerRef.current.appendChild(w);
    }
    if (activeEmbed === 'voice' && voiceContainerRef.current && !voiceContainerRef.current.querySelector('chat-widget')) {
      const w = document.createElement('chat-widget');
      w.setAttribute('data-widget-id', '6914a81b33e99255993705fa');
      voiceContainerRef.current.appendChild(w);
    }
  }, [activeEmbed]);

return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100 blur-[140px] rounded-full pointer-events-none opacity-60"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 border border-sky-200 bg-sky-50 px-4 py-2 rounded-full text-sm tracking-[0.2em] uppercase font-bold text-sky-700 mb-6 shadow-sm">
              <Mic size={11} className="animate-pulse text-sky-500" />
              AI Employee — Voice & Chat
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl tracking-[-0.04em] leading-[1.04] text-text-base">
              Meet <span className="text-accent-primary">Samantha.</span>
            </h1>
            <p className="mt-4 text-sm text-text-muted leading-relaxed font-medium max-w-md">
              Samantha is your always-on AI employee. It answers inbound calls, chats with website visitors, qualifies leads, and syncs everything to your CRM — without ever taking a lunch break.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button onClick={() => setActiveEmbed('chat')} className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all shadow-md cursor-pointer border-none">
                <MessageSquare size={12} /> Chat with Samantha
              </button>
              <button onClick={() => setActiveEmbed('voice')} className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold border-2 border-border-base hover:border-sky-300 px-7 py-4 rounded-xl text-text-muted hover:text-accent-deep hover:bg-sky-50 transition-all cursor-pointer">
                <Phone size={12} /> Talk to Samantha
              </button>
            </div>
          </div>

          {/* Voice Wave Visual */}
          <div className="w-full h-64 border-2 border-slate-100 bg-white rounded-[28px] flex flex-col items-center justify-center gap-4 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center shadow-xl">
                <Mic size={24} className="text-white" />
              </div>
              <div className="flex items-end gap-1.5 h-12">
                {[0.3, 0.6, 0.9, 0.5, 1.0, 0.7, 0.4, 0.8, 0.6, 0.3, 0.9, 0.5].map((v, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-sky-400 rounded-full"
                    style={{ height: `${v * 100}%` }}
                    animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, repeatType: "mirror", delay: i * 0.1, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <span className="text-sm uppercase tracking-widest text-sky-600 font-bold">Samantha · Active · Listening</span>
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
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">What Samantha Does</span>
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
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Training Protocol</span>
            <h2 className="text-3xl md:text-4xl font-black text-text-base mt-3 mb-6">Samantha learns your business, not a script.</h2>
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Domain Ingestion", desc: "We scrape your existing site, PDFs, and service sheets to build an initial knowledge map." },
                { step: "02", title: "Custom Rule Configuration", desc: "You define escalation triggers, pricing rules, objection scripts, and off-limit topics." },
                { step: "03", title: "Live Call Testing", desc: "We run a full test call sprint across 20+ edge-case scenarios before go-live." },
                { step: "04", title: "Ongoing Refinement", desc: "Call transcripts are reviewed monthly. Samantha is retrained whenever your business changes." },
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
          <h3 className="text-2xl md:text-3xl font-black text-text-base">Ready to deploy Samantha?</h3>
          <p className="text-sm text-text-muted mt-3 font-medium">Setup takes 5–10 business days. Book a call and we'll walk you through the full training protocol.</p>
          <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all">
            Book a Discovery Call <ArrowRight size={12} />
          </a>
        </div>
      </section>

      {/* Chat Embed Modal */}
      {activeEmbed === 'chat' && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setActiveEmbed(null)}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg h-[80vh] max-h-[700px] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
              <h3 className="font-black text-sm uppercase tracking-wider text-sky-600">Chat with Samantha</h3>
              <button onClick={() => setActiveEmbed(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent">
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            <div ref={chatContainerRef} className="flex-1 w-full" />
          </div>
        </div>
      )}

      {/* Voice Embed Modal */}
      {activeEmbed === 'voice' && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setActiveEmbed(null)}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg h-[80vh] max-h-[700px] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
              <h3 className="font-black text-sm uppercase tracking-wider text-sky-600">Talk to Samantha</h3>
              <button onClick={() => setActiveEmbed(null)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent">
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            <div ref={voiceContainerRef} className="flex-1 w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
