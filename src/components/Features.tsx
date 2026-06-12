import React from "react";
import { motion } from "framer-motion";
import { Phone, Database, Workflow, Sparkles, Layers, ArrowUpRight } from "lucide-react";

interface BentoItemProps {
  className?: string;
  children: React.ReactNode;
}

function BentoCard({ className = "", children }: BentoItemProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-glow-container relative rounded-[24px] border-2 border-slate-100 bg-white p-8 md:p-9 flex flex-col justify-between overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-lg hover:border-sky-200 cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 border-t border-border-base bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Flagship Solutions</span>
            <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
              Bespoke digital services engineered for growth.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm font-medium">
            We build high-converting websites and deploy pre-trained AI systems that consolidate your customer operations in one place.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1: Voice AI */}
          <BentoCard className="md:col-span-2 min-h-[300px]">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 rounded-xl border border-sky-100 bg-sky-50 shadow-sm">
                <Phone size={18} className="text-sky-600" />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-sky-700 border border-sky-200 bg-sky-50 px-3 py-1 rounded-full font-mono font-bold">
                Voice AI
              </span>
            </div>
            <div className="my-6 flex-grow flex items-center justify-between gap-6 w-full text-left font-sans">
              <div className="flex flex-col max-w-sm">
                <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-text-base flex items-center gap-1.5 group-hover:text-sky-700 transition-colors">
                  24/7 Voice Receptionist
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                  Qualify inbound phone calls, collect intake details, answer pricing questions, and book calendar appointments conversationally. Never let another hot lead slide to voicemail.
                </p>
              </div>
              {/* Voice Wave */}
              <div className="hidden sm:flex items-center gap-1.5 h-16 w-36 border border-sky-100 rounded-xl p-3 bg-sky-50/60 shadow-inner">
                {[0.2, 0.5, 0.8, 0.4, 0.9, 0.3, 0.6, 0.8, 0.2, 0.5].map((val, i) => (
                  <motion.div key={i} className="w-1.5 bg-sky-400 rounded-full" style={{ height: `${val * 100}%` }}
                    animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 w-full text-[9px] text-text-muted/60 font-mono font-bold">
              <div className="flex gap-3">
                <span>CONCURRENT CALLS: INFINITE</span><span>•</span><span>CHANNELS: TELEPHONE / WEB / SMS</span>
              </div>
              <span className="text-sky-600 uppercase tracking-widest font-bold group-hover:underline">Schedule Demo →</span>
            </div>
          </BentoCard>

          {/* Card 2: Website Design */}
          <BentoCard className="min-h-[300px]">
            <div className="p-3 rounded-xl border border-amber-100 bg-amber-50 self-start shadow-sm">
              <Layers size={18} className="text-amber-600" />
            </div>
            <div className="my-6 flex-grow flex flex-col justify-center text-left font-sans">
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-text-base flex items-center gap-1.5 group-hover:text-amber-600 transition-colors">
                Bespoke Website Design
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                Custom, mobile-optimized, conversion-focused websites that showcase your authority. Natively coded in React/Tailwind, WooCommerce, or Shopify.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full border-t border-slate-100 pt-3.5">
              <div className="flex justify-between items-center text-[9px] font-mono text-text-muted/60 font-bold">
                <span>PACKAGES FROM</span>
                <span className="text-text-base font-bold">$1,500</span>
              </div>
              <span className="text-amber-600 uppercase tracking-widest font-bold group-hover:underline text-[9px] text-right">View Process →</span>
            </div>
          </BentoCard>

          {/* Card 3: CRM & Automations */}
          <BentoCard className="min-h-[300px]">
            <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50 self-start shadow-sm">
              <Database size={18} className="text-emerald-600" />
            </div>
            <div className="my-6 flex-grow flex flex-col justify-center text-left font-sans">
              <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-text-base flex items-center gap-1.5 group-hover:text-emerald-600 transition-colors">
                CRM & Automations
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                Consolidate your customer interactions. Automatically sync contacts, trigger SMS/email drips, and monitor marketing channels from one live dashboard.
              </p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 w-full text-[9px] text-text-muted/60 font-mono font-bold">
              <span>INTEGRATIONS: CRM / HUBSPOT</span>
              <span className="text-emerald-600 uppercase tracking-widest font-bold group-hover:underline">Connect Stack →</span>
            </div>
          </BentoCard>

          {/* Card 4: Reputation Management */}
          <BentoCard className="md:col-span-2 min-h-[300px]">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 rounded-xl border border-violet-100 bg-violet-50 shadow-sm">
                <Workflow size={18} className="text-violet-600" />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-violet-700 border border-violet-200 bg-violet-50 px-3 py-1 rounded-full font-mono font-bold">
                Reviews AI
              </span>
            </div>
            <div className="my-6 flex-grow flex items-center justify-between gap-6 w-full text-left font-sans">
              <div className="flex flex-col max-w-sm">
                <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-text-base flex items-center gap-1.5 group-hover:text-violet-600 transition-colors">
                  Reputation Management
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
                  Outsmart local search algorithms. Automate Google and Facebook review requests, and let NWS AI automatically reply to optimize your local discoverability.
                </p>
              </div>
              {/* Review Widget */}
              <div className="hidden sm:flex flex-col gap-2 w-48 border border-violet-100 rounded-xl p-3 bg-violet-50/60 text-[9px] font-mono font-bold shadow-inner">
                <div className="flex justify-between items-center text-violet-600">
                  <span>Google Review</span>
                  <Sparkles size={10} className="animate-pulse" />
                </div>
                <div className="text-[10px] text-text-base font-bold leading-none mt-1">5 Stars — Ronald P.</div>
                <p className="text-[8px] text-text-muted font-normal leading-normal mt-0.5">&quot;Excellent design and setup!&quot;</p>
                <div className="border border-violet-200 p-2 rounded bg-white text-[8px] text-violet-600">
                  <span className="font-bold text-[7px] text-text-muted uppercase block mb-0.5">AI Auto-Reply</span>
                  Thank you Ronald! We appreciate it.
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 w-full text-[9px] text-text-muted/60 font-mono font-bold">
              <div className="flex gap-3"><span>TARGETS: GOOGLE / FACEBOOK</span><span>•</span><span>REPLY MODE: PERSONALIZED</span></div>
              <span className="text-violet-600 uppercase tracking-widest font-bold group-hover:underline">Manage Reviews →</span>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
