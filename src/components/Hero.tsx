import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import WorkbenchWizard from "./workbench/WorkbenchWizard";

const ROTATING_WORDS = ["missed calls.", "bad follow-ups.", "slow quoting.", "tool chaos."];

interface HeroProps {}

export default function Hero(_props: HeroProps) {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center py-24 px-6 overflow-hidden bg-background">

      {/* Rich ambient glows (Sun-drenched Caribbean) */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,193,0.15) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(244,235,208,0.4) 0%, transparent 70%)", transform: "translate(30%, 30%)" }}></div>
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30" style={{ background: "radial-gradient(circle, rgba(0,75,99,0.08) 0%, transparent 65%)" }}></div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-5 flex flex-col text-left pt-4">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start border border-border-base bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-[12px] tracking-[0.1em] uppercase font-bold text-accent-deep mb-8 shadow-sun-drenched">
            <Sparkles size={12} className="text-accent-teal animate-pulse" />
            <span>Novelty Web Solutions · Operations Engine</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-[-0.02em] leading-[1.1] text-text-base h-[140px] sm:h-[160px] md:h-[180px]">
            Stop losing revenue to{" "}
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-bold inline-block text-accent-teal"
              >
                {ROTATING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="font-sans font-semibold uppercase text-xs tracking-[0.1em] text-text-muted mt-6 flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-accent-teal inline-block rounded-full"></span>
            Stop the operational bleeding
          </p>

          <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed font-medium max-w-lg">
            Every missed call is a lost deal. Every manual follow-up drains your time and sanity. We deploy custom AI employees and the ultimate Business Operating System to capture every lead in the Caribbean, 24/7.
          </p>

          {/* Social proof pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {["24/7 AI Receptionist", "CRM Automation", "Caribbean-Based"].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border-base text-xs font-bold text-text-muted shadow-sun-drenched label-caps">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal inline-block"></span>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="https://businessesos.com"
              className="text-[12px] uppercase tracking-[0.1em] font-bold text-white px-7 py-4 rounded-xl transition-all duration-200 shadow-sun-drenched hover:shadow-sun-drenched-lg cursor-pointer border-none hover:scale-[1.02] text-center bg-accent-primary hover:bg-accent-deep"
            >
              Start Your OS
            </a>
            <a
              href="#process"
              className="text-[12px] uppercase tracking-[0.1em] font-bold border-2 border-border-base hover:border-accent-primary hover:text-accent-primary px-7 py-4 rounded-xl text-text-muted transition-all duration-200 hover:bg-black/5 cursor-pointer text-center"
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
