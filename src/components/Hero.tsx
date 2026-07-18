import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import WorkbenchWizard from "./workbench/WorkbenchWizard";

interface HeroProps {
  onSignUp: () => void;
}

export default function Hero({ onSignUp }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center py-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-5 flex flex-col text-left pt-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start border border-sky-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm tracking-[0.18em] uppercase font-bold text-sky-700 mb-8 shadow-sm">
            <Sparkles size={12} className="text-sky-500 animate-pulse" />
            <span>Novelty Web Solutions · Operations Engine</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-text-base">
            Stop Losing Revenue to<br />
            <span
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              Missed Calls.
            </span>
          </h1>

          <p className="font-sans font-black uppercase text-sm tracking-[0.25em] text-text-muted mt-6 flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-gradient-to-r from-sky-400 to-cyan-300 inline-block rounded-full"></span>
            Stop the operational bleeding
          </p>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed font-medium max-w-lg">
            Every missed call is a lost deal. Every manual follow-up drains your time and sanity. We deploy custom AI employees and high-converting websites that plug the leaks in your operations and capture every lead, 24/7.
          </p>

          {/* Social proof pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {["24/7 AI Receptionist", "CRM Automation", "Caribbean-Based"].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={onSignUp}
              className="text-sm uppercase tracking-[0.18em] font-bold text-white px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none hover:scale-[1.02] text-center"
              style={{ background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)" }}
            >
              Get Your Free Business Account
            </button>
            <a
              href="#process"
              className="text-sm uppercase tracking-[0.18em] font-bold border-2 border-slate-200 hover:border-sky-300 hover:text-accent-deep px-7 py-3.5 rounded-xl text-text-muted transition-all duration-200 hover:bg-sky-50 cursor-pointer text-center"
            >
              See How It Works
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
