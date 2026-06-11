import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import WorkbenchWizard from "./workbench/WorkbenchWizard";

interface HeroProps {
  onBookDemo: () => void;
}

export default function Hero({ onBookDemo }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center py-16 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #fffbeb 100%)" }}>

      {/* Rich ambient glows */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)", transform: "translate(30%, 30%)" }}></div>
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)" }}></div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-5 flex flex-col text-left pt-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start border border-sky-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold text-sky-700 mb-8 shadow-sm">
            <Sparkles size={12} className="text-sky-500 animate-pulse" />
            <span>Novelty Web Solutions · Operations Engine</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.04] text-text-base">
            Put your customer<br />operations on{" "}
            <span
              className="italic font-normal"
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              autopilot.
            </span>
          </h1>

          <p className="font-sans font-black uppercase text-xs tracking-[0.25em] text-text-muted mt-6 flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-gradient-to-r from-sky-400 to-cyan-300 inline-block rounded-full"></span>
            Powered by NWS Operations Engine
          </p>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed font-medium max-w-lg">
            We build stunning, high-converting websites and deploy custom AI employees that answer voice calls, qualify leads, and synchronize your CRM — around the clock.
          </p>

          {/* Social proof pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {["24/7 AI Receptionist", "CRM Automation", "Caribbean-Based"].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={onBookDemo}
              className="text-xs uppercase tracking-[0.18em] font-bold text-white px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)" }}
            >
              Book Strategy Call
            </button>
            <a
              href="#roi"
              className="text-xs uppercase tracking-[0.18em] font-bold border-2 border-slate-200 hover:border-sky-300 hover:text-accent-deep px-7 py-3.5 rounded-xl text-text-muted transition-all duration-200 hover:bg-sky-50 cursor-pointer"
            >
              Calculate Yield
            </a>
          </div>
        </div>

        {/* ── Right Column — Business Intelligence Workbench ── */}
        <motion.div
          className="lg:col-span-7 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <WorkbenchWizard />
        </motion.div>

      </div>
    </section>
  );
}
