import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Phone,
  Database,
  MessageSquare,
  Workflow,
  CheckCircle,
  ArrowUpRight,
  Mic,
  Bell,
  Star,
  Zap,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { PRICING_TIERS } from "../config/pricing";
import { BOOKING_URL } from "../config/links";
import { redirectToCheckout } from "../lib/stripe";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — Dark Tech Variant
   Base:    #080f1e (darkest navy)
   Surface: #0c1a2e (dark navy)
   Card:    rgba(255,255,255,0.04) — glassmorphic
   Text:    white / white/80 — NO grey anywhere
   Accent:  sky-400 (#38bdf8), sky-500 (#0ea5e9)
   Warm:    amber-400 (#fbbf24)
   Success: emerald-400 (#34d399)
───────────────────────────────────────────────────────────────────────────── */

// ── Dark BentoCard ──────────────────────────────────────────────────────────
function BentoCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
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
      className={`bento-glow-container relative rounded-[24px] border border-white/[0.08] p-8 md:p-9 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:border-sky-500/50 cursor-pointer ${className}`}
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14,165,233,0.07), transparent 50%)",
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </div>
  );
}

// ── Live Dashboard Preview ──────────────────────────────────────────────────
function DashboardPreview() {
  return (
    <div
      className="relative w-full rounded-[28px] overflow-hidden p-6"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Glow behind card */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)" }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-mono font-bold text-sky-400 uppercase tracking-[0.18em]">
            Business OS · Live Dashboard
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* CRM Pipeline */}
      <div className="mb-5">
        <span className="text-sm font-mono font-bold text-sky-400/70 uppercase tracking-[0.22em] block mb-2">
          CRM Pipeline
        </span>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "New", count: 4, bar: "bg-sky-400", num: "text-sky-300" },
            { label: "Qualified", count: 7, bar: "bg-violet-400", num: "text-violet-300" },
            { label: "Proposal", count: 3, bar: "bg-amber-400", num: "text-amber-300" },
            { label: "Won", count: 12, bar: "bg-emerald-400", num: "text-emerald-300" },
          ].map((col) => (
            <div
              key={col.label}
              className="rounded-xl p-2.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${col.bar}`} />
                <span className={`text-sm font-black ${col.num}`}>{col.count}</span>
              </div>
              <span className="text-sm text-white/50 font-bold uppercase tracking-wider">{col.label}</span>
              <div className="mt-1.5 flex flex-col gap-1">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-1 rounded-full bg-white/10 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voice AI waveform */}
      <div
        className="mb-4 rounded-xl p-3 flex items-center gap-3"
        style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}
      >
        <div
          className="p-2 rounded-lg"
          style={{ background: "rgba(14,165,233,0.15)" }}
        >
          <Phone size={13} className="text-sky-400" />
        </div>
        <div className="flex items-end gap-[3px] h-9 flex-1">
          {[0.3, 0.7, 1.0, 0.5, 0.9, 0.4, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4].map((val, i) => (
            <motion.div
              key={i}
              className="w-1.5 shrink-0 bg-sky-400 rounded-full"
              style={{ height: `${val * 100}%` }}
              animate={{ scaleY: [1, 1.4, 0.7, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: i * 0.08 }}
            />
          ))}
        </div>
        <span className="text-sm font-mono font-bold text-sky-400 uppercase tracking-[0.15em]">Live</span>
      </div>

      {/* Chat AI widget */}
      <div
        className="rounded-xl p-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(139,92,246,0.2)" }}>
            <MessageSquare size={11} className="text-violet-400" />
          </div>
          <span className="text-sm font-mono font-bold text-white/50 uppercase tracking-[0.15em]">Chat AI</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="self-start max-w-[80%] rounded-xl rounded-tl-none px-3 py-2"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span className="text-sm text-white/80">What are your hours?</span>
          </div>
          <div
            className="self-end max-w-[80%] px-3 py-2 rounded-xl rounded-tr-none"
            style={{ background: "linear-gradient(135deg, #0369a1, #0ea5e9)" }}
          >
            <span className="text-sm text-white">We&apos;re available 24/7! Want to book?</span>
          </div>
          <div
            className="self-start flex items-center gap-1 px-3 py-2 rounded-xl rounded-tl-none"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {[0, 0.2, 0.4].map((delay) => (
              <motion.div
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-sky-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function BusinessOS() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const checkoutState = searchParams.get("checkout");
  const selectedTier = searchParams.get("tier");

  const onBookDemo = () => { window.open("https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call", "_blank", "noopener,noreferrer"); };
  const handleCheckout = async (tierId: string) => {
    if (tierId === 'free') {
      navigate('/business-os/onboarding');
      return;
    }
    
    setLoading(tierId);
    try {
      const tier = PRICING_TIERS.find(t => t.id === tierId);
      if (!tier) throw new Error("Tier not found");
      
      const priceId = isYearly ? tier.stripeYearly : tier.stripeMonthly;
      await redirectToCheckout(priceId, undefined, undefined, tierId);
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout. Please try again or contact support.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <main className="relative overflow-x-hidden" style={{ background: "#080f1e" }}>
        {checkoutState && (
          <section className="px-6 pt-6">
            <div
              className="max-w-5xl mx-auto rounded-2xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              style={checkoutState === "success"
                ? { background: "rgba(16, 185, 129, 0.12)", borderColor: "rgba(52, 211, 153, 0.35)", color: "#d1fae5" }
                : { background: "rgba(245, 158, 11, 0.12)", borderColor: "rgba(251, 191, 36, 0.35)", color: "#fde68a" }}
            >
              <div>
                <p className="text-sm uppercase tracking-[0.18em] font-bold">
                  {checkoutState === "success" ? "Checkout Complete" : "Checkout Canceled"}
                </p>
                <p className="text-sm mt-1 text-white/80">
                  {checkoutState === "success"
                    ? `Your ${selectedTier ? `${selectedTier} ` : ""}subscription request was submitted successfully. Book your onboarding call and we will help you get live fast.`
                    : "No charge was made. You can review the plans below or book a strategy call if you want help choosing the right setup."}
                </p>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center text-sm uppercase tracking-[0.18em] font-bold bg-white text-sky-800 px-5 py-3 rounded-xl shadow-md"
              >
                Book Onboarding Call
              </a>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════
            SECTION 1 · HERO — full dark navy
        ══════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[calc(100vh-96px)] flex items-center justify-center py-16 px-6 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #080f1e 0%, #0c1a2e 60%, #0f2040 100%)" }}
        >
          {/* Electric sky glow — top left */}
          <div
            className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 65%)",
              transform: "translate(-35%, -35%)",
            }}
          />
          {/* Amber glow — bottom right */}
          <div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%)",
              transform: "translate(35%, 35%)",
            }}
          />
          {/* Indigo center haze */}
          <div
            className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-40"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 60%)" }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18]"
            style={{
              backgroundImage: "radial-gradient(rgba(56,189,248,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

            {/* Left — text */}
            <div className="lg:col-span-5 flex flex-col text-left pt-4">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full text-sm tracking-[0.18em] uppercase font-bold text-sky-300 mb-8"
                style={{ border: "1px solid rgba(56,189,248,0.3)", background: "rgba(14,165,233,0.1)" }}
              >
                <Sparkles size={12} className="text-sky-400 animate-pulse" />
                <span>AI-Powered Business Platform</span>
              </div>

              {/* H1 — Instrument Serif italic, sky gradient text */}
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-white">
                The Business{" "}
                <span
                  style={{
                    backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    display: "inline",
                  }}
                >
                  Operating System
                </span>{" "}
                Built for the Caribbean.
              </h1>

              <p className="font-sans font-black uppercase text-sm tracking-[0.25em] text-sky-400 mt-6 flex items-center gap-2.5">
                <span className="h-[2px] w-8 bg-gradient-to-r from-sky-400 to-cyan-300 inline-block rounded-full" />
                One platform. Every function.
              </p>

              {/* Body — white/80, NOT grey */}
              <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed font-medium max-w-lg">
                CRM, Voice AI, Chat AI, and Automations — unified in one platform that works
                around the clock so you can focus on running your business.
              </p>

              {/* Social proof pills — sky-tinted */}
              <div className="mt-6 flex flex-wrap gap-3">
                {["24/7 AI Employees", "GHL-Powered CRM", "Caribbean-Based Support"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold text-sky-300"
                    style={{ border: "1px solid rgba(56,189,248,0.2)", background: "rgba(14,165,233,0.08)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a
                  href="#pricing"
                  className="text-sm uppercase tracking-[0.18em] font-bold text-white px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none hover:scale-[1.02] text-center"
                  style={{ background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)" }}
                >
                  Get Started
                </a>
                <button
                  onClick={onBookDemo}
                  className="text-sm uppercase tracking-[0.18em] font-bold text-white px-7 py-4 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)" }}
                >
                  Book a Demo
                </button>
              </div>

              <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-white/40">
                No credit card required · Cancel anytime
              </p>
            </div>

            {/* Right — dashboard */}
            <motion.div
              className="lg:col-span-7 w-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 2 · PROBLEM — slightly lighter surface
        ══════════════════════════════════════════════════ */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: "#0c1a2e", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.10]"
            style={{
              backgroundImage: "radial-gradient(rgba(56,189,248,0.6) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-14">
              <span className="text-sm uppercase tracking-[0.22em] text-sky-400 font-bold">
                The Real Cost of Doing Nothing
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl tracking-tight leading-tight font-sans font-black text-white">
                Running a Caribbean Business Is Harder
                <br className="hidden md:block" /> Than It Needs to Be
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: <Phone size={20} className="text-sky-400" />,
                  iconStyle: { background: "rgba(14,165,233,0.15)", border: "1px solid rgba(56,189,248,0.25)" },
                  hoverColor: "group-hover:text-sky-400",
                  title: "Missed Calls, Missed Revenue",
                  desc: "Every unanswered call is a hot lead walking straight to your competitor. It happens dozens of times a week.",
                  accentColor: "text-sky-400",
                },
                {
                  icon: <Bell size={20} className="text-amber-400" />,
                  iconStyle: { background: "rgba(245,158,11,0.12)", border: "1px solid rgba(251,191,36,0.25)" },
                  hoverColor: "group-hover:text-amber-400",
                  title: "Leads Go Cold Overnight",
                  desc: "Without instant follow-up, prospects choose whoever responded first — and it usually isn't you.",
                  accentColor: "text-amber-400",
                },
                {
                  icon: <Zap size={20} className="text-violet-400" />,
                  iconStyle: { background: "rgba(139,92,246,0.12)", border: "1px solid rgba(167,139,250,0.25)" },
                  hoverColor: "group-hover:text-violet-400",
                  title: "Too Many Disconnected Tools",
                  desc: "Paying for 5 apps that don't talk to each other wastes money, time, and mental energy every single day.",
                  accentColor: "text-violet-400",
                },
              ].map((item) => (
                <BentoCard key={item.title}>
                  <div className="p-3 rounded-xl self-start" style={item.iconStyle}>{item.icon}</div>
                  <div className="my-6 flex-grow flex flex-col justify-center font-sans">
                    <h3
                      className={`text-xl md:text-2xl font-black tracking-tight mb-3 text-white flex items-center gap-1.5 ${item.hoverColor} transition-colors`}
                    >
                      {item.title}
                      <ArrowUpRight size={17} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 3 · FEATURES BENTO — dark base
        ══════════════════════════════════════════════════ */}
        <section
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: "#080f1e", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Sky glow top-right */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
              <div className="max-w-xl">
                <span className="text-sm uppercase tracking-[0.22em] text-sky-400 font-bold">
                  One Platform. Every Function.
                </span>
                <h2 className="text-4xl md:text-5xl tracking-tight leading-tight text-white mt-4 font-sans font-black">
                  Everything your business needs, finally in one place.
                </h2>
              </div>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-sm font-medium">
                NWS Business OS combines your CRM, AI employees, and automations into one
                Caribbean-ready platform — all powered by GHL.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* CRM — col-span-2 */}
              <BentoCard className="md:col-span-2 min-h-[320px]">
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(56,189,248,0.2)" }}>
                    <Database size={20} className="text-sky-400" />
                  </div>
                  <span
                    className="text-sm uppercase tracking-widest text-sky-400 font-mono font-bold px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid rgba(56,189,248,0.25)", background: "rgba(14,165,233,0.08)" }}
                  >
                    Smart CRM
                  </span>
                </div>
                <div className="my-6 flex-grow flex items-center justify-between gap-6 w-full font-sans">
                  <div className="flex flex-col max-w-sm">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white flex items-center gap-2 group-hover:text-sky-400 transition-colors">
                      Full CRM Pipeline
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                      Manage every lead from first touch to closed deal. Automated follow-ups,
                      pipeline stages, and a live dashboard — all in one place.
                    </p>
                  </div>
                  {/* Mini pipeline */}
                  <div className="hidden sm:grid grid-cols-4 gap-1.5 h-28 w-56 shrink-0">
                    {[
                      { label: "New", color: "bg-sky-400" },
                      { label: "Qualified", color: "bg-violet-400" },
                      { label: "Proposal", color: "bg-amber-400" },
                      { label: "Won", color: "bg-emerald-400" },
                    ].map((col) => (
                      <div
                        key={col.label}
                        className="rounded-xl p-2 flex flex-col gap-1"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <div className={`w-full h-1.5 rounded-full ${col.color}`} />
                        <span className="text-[8px] font-mono font-bold text-white/40 uppercase">{col.label}</span>
                        {[...Array(2)].map((_, j) => (
                          <div key={j} className="h-1 rounded-full bg-white/10" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="flex justify-between items-center pt-3.5 w-full text-sm font-mono font-bold"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex gap-3 text-white/40">
                    <span>PIPELINES: UNLIMITED</span><span>•</span><span>CONTACTS: UNLIMITED</span>
                  </div>
                  <span className="text-sky-400 uppercase tracking-widest font-bold group-hover:underline">
                    View Features →
                  </span>
                </div>
              </BentoCard>

              {/* Voice AI — col-span-1 */}
              <BentoCard className="min-h-[320px]">
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(56,189,248,0.2)" }}>
                    <Mic size={20} className="text-sky-400" />
                  </div>
                  <span
                    className="text-sm uppercase tracking-widest text-sky-400 font-mono font-bold px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid rgba(56,189,248,0.25)", background: "rgba(14,165,233,0.08)" }}
                  >
                    Voice AI
                  </span>
                </div>
                <div className="my-6 flex-grow flex flex-col justify-center font-sans">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white group-hover:text-sky-400 transition-colors flex items-center gap-2">
                    Voice AI Employee
                    <ArrowUpRight size={17} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                    Answers calls, qualifies leads, and books appointments — 24/7, no voicemail ever again.
                  </p>
                  {/* Waveform */}
                  <div
                    className="mt-5 flex items-end gap-[3px] h-12 w-full rounded-xl px-3"
                    style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(56,189,248,0.15)" }}
                  >
                    {[0.4, 0.7, 1.0, 0.5, 0.9, 0.3, 0.8, 0.6, 0.9, 0.4].map((val, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 shrink-0 bg-sky-400 rounded-full"
                        style={{ height: `${val * 100}%` }}
                        animate={{ scaleY: [1, 1.4, 0.8, 1.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="flex justify-between items-center pt-3.5 w-full text-sm font-mono font-bold"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-white/40">CHANNELS: PHONE / WEB</span>
                  <span className="text-sky-400 uppercase tracking-widest group-hover:underline">Try Demo →</span>
                </div>
              </BentoCard>

              {/* Chat AI — col-span-1 */}
              <BentoCard className="min-h-[320px]">
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(167,139,250,0.2)" }}>
                    <MessageSquare size={20} className="text-violet-400" />
                  </div>
                  <span
                    className="text-sm uppercase tracking-widest text-violet-400 font-mono font-bold px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid rgba(167,139,250,0.25)", background: "rgba(139,92,246,0.08)" }}
                  >
                    Chat AI
                  </span>
                </div>
                <div className="my-6 flex-grow flex flex-col justify-center font-sans">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white group-hover:text-violet-400 transition-colors flex items-center gap-2">
                    Chat AI Employee
                    <ArrowUpRight size={17} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                    Converts website visitors into booked clients automatically — handles FAQs,
                    qualifies leads, and books appointments.
                  </p>
                  <div className="mt-5 flex flex-col gap-2 w-full">
                    <div
                      className="self-start max-w-[85%] rounded-xl rounded-tl-none px-3 py-2"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <span className="text-[12px] text-white/80">Do you offer payment plans?</span>
                    </div>
                    <div
                      className="self-end max-w-[85%] px-3 py-2 rounded-xl rounded-tr-none"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
                    >
                      <span className="text-[12px] text-white">Yes! Let me walk you through the options...</span>
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-between items-center pt-3.5 w-full text-sm font-mono font-bold"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-white/40">WEB / SMS / WHATSAPP*</span>
                  <span className="text-violet-400 uppercase tracking-widest group-hover:underline">See Example →</span>
                </div>
              </BentoCard>

              {/* Automations — col-span-2 */}
              <BentoCard className="md:col-span-2 min-h-[320px]">
                <div className="flex justify-between items-start w-full">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <Workflow size={20} className="text-emerald-400" />
                  </div>
                  <span
                    className="text-sm uppercase tracking-widest text-emerald-400 font-mono font-bold px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.08)" }}
                  >
                    Automations
                  </span>
                </div>
                <div className="my-6 flex-grow flex items-center justify-between gap-6 w-full font-sans">
                  <div className="flex flex-col max-w-sm">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      Business Automations
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-medium">
                      Auto follow-ups, appointment reminders, review requests, and lead
                      reactivation — running in the background while you focus on your work.
                    </p>
                  </div>
                  {/* 4-tile automation stack — larger, more airy */}
                  <div className="hidden sm:flex flex-col gap-2.5 w-64 shrink-0">
                    {[
                      { label: "Auto Follow-Up", sub: "Instant lead response", icon: <Zap size={15} />, style: { background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)" }, textColor: "text-emerald-400" },
                      { label: "Appt. Reminders", sub: "24h & 1h before", icon: <Calendar size={15} />, style: { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(56,189,248,0.18)" }, textColor: "text-sky-400" },
                      { label: "Review Requests", sub: "Post-service trigger", icon: <Star size={15} />, style: { background: "rgba(245,158,11,0.08)", border: "1px solid rgba(251,191,36,0.18)" }, textColor: "text-amber-400" },
                      { label: "Lead Reactivation", sub: "90-day win-back", icon: <TrendingUp size={15} />, style: { background: "rgba(139,92,246,0.08)", border: "1px solid rgba(167,139,250,0.18)" }, textColor: "text-violet-400" },
                    ].map((tile) => (
                      <div key={tile.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${tile.textColor}`} style={tile.style}>
                        <div className="shrink-0">{tile.icon}</div>
                        <div className="flex flex-col">
                          <span className="text-sm font-mono font-bold text-white/90 leading-tight">{tile.label}</span>
                          <span className={`text-sm font-mono leading-tight mt-0.5 ${tile.textColor} opacity-70`}>{tile.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="flex justify-between items-center pt-3.5 w-full text-sm font-mono font-bold"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex gap-3 text-white/40">
                    <span>WORKFLOWS: UNLIMITED</span><span>•</span><span>TRIGGERS: 50+ TYPES</span>
                  </div>
                  <span className="text-emerald-400 uppercase tracking-widest group-hover:underline">See Automations →</span>
                </div>
              </BentoCard>

            </div>

            <p className="mt-6 text-sm text-white/35 font-bold">
              * WhatsApp available as an add-on at client request (client&apos;s own number or GHL-native).
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 4 · PRICING
        ══════════════════════════════════════════════════ */}
        <section
          id="pricing"
          className="py-24 px-6 relative overflow-hidden"
          style={{ background: "#0c1a2e", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm uppercase tracking-[0.22em] text-sky-400 font-bold">Pricing</span>
              <h2 className="mt-4 text-4xl md:text-5xl tracking-tight leading-tight font-sans font-black text-white">
                Plans that grow with your business.
              </h2>
              <p className="mt-4 text-lg text-white/70 font-medium max-w-2xl mx-auto">
                Start with what you need. Scale as you grow.
              </p>
              <div className="flex justify-center items-center mt-8">
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-sm font-bold transition-colors ${!isYearly ? "text-white" : "text-white/50"}`}>Monthly</span>
                  <button 
                    onClick={() => setIsYearly(!isYearly)}
                    className="relative w-14 h-7 bg-white/10 rounded-full cursor-pointer transition-colors border border-white/20"
                    aria-label="Toggle billing cycle"
                  >
                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? "translate-x-7 bg-sky-400" : ""}`} />
                  </button>
                  <span className={`text-sm font-bold flex items-center gap-1.5 transition-colors ${isYearly ? "text-white" : "text-white/50"}`}>
                    Yearly 
                    <span className="text-[10px] uppercase tracking-widest bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/30">2 Months Free</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
              {PRICING_TIERS.map(plan => {
                const currentPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
                const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(currentPrice);
                const compareAtMap: Record<string, { monthly: number; yearly: number }> = { lite: { monthly: 597, yearly: 5970 }, pro: { monthly: 997, yearly: 9970 }, platinum: { monthly: 1497, yearly: 14970 } };
                const compareAt = compareAtMap[plan.id];
                const comparePrice = isYearly ? compareAt.yearly : compareAt.monthly;
                const savings = comparePrice - currentPrice;

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-[24px] p-6 lg:p-8 flex flex-col gap-5 ${plan.isPopular ? "lg:-mt-4 lg:-mb-4" : ""}`}
                    style={plan.isPopular ? {
                      background: "linear-gradient(160deg, rgba(14,165,233,0.12) 0%, rgba(3,105,161,0.08) 100%)",
                      border: "1px solid rgba(56,189,248,0.35)",
                      boxShadow: "0 0 60px rgba(14,165,233,0.12), 0 24px 48px rgba(0,0,0,0.4)"
                    } : {
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
                    }}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span
                          className="text-xs font-bold uppercase tracking-[0.18em] text-white px-5 py-2 rounded-full flex items-center gap-1.5"
                          style={{ background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%)" }}
                        >
                          <Sparkles size={12} /> Most Popular
                        </span>
                      </div>
                    )}
                    {!plan.isPopular && (
                      <span className="text-sm uppercase tracking-[0.2em] text-white/50 font-bold">Premium</span>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-2xl font-black text-white">{plan.name}</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-emerald-400/15 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-400/25">Summer Launch</span>
                      </div>
                      <div className="mt-1 flex items-end gap-2">
                        <span className="text-2xl font-black font-mono line-through" style={{ color: '#ef4444', textDecorationColor: '#ef4444' }}>
                          ${comparePrice.toLocaleString()}
                        </span>
                        <span className="text-4xl font-black font-mono text-white">{formattedPrice}</span>
                        <span className="text-sm text-white/50 font-medium mb-1">/{isYearly ? 'yr' : 'mo'}</span>
                        <span className="text-[11px] font-bold bg-emerald-400/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/25">
                          Save ${savings.toLocaleString()}{isYearly ? '/yr' : '/mo'}
                        </span>
                      </div>
                      
                      <p className="mt-2 text-sm text-white/60 font-medium pb-4 border-b border-white/10">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 flex-grow">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-3 text-sm text-white/80 font-medium">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={plan.isPopular 
                              ? { background: "rgba(14,165,233,0.2)", border: "1px solid rgba(56,189,248,0.3)" }
                              : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                          >
                            <CheckCircle size={11} className={plan.isPopular ? "text-sky-400" : "text-white/50"} />
                          </div>
                          {f}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCheckout(plan.id)}
                      disabled={loading === plan.id}
                      className="mt-2 text-sm uppercase tracking-[0.18em] font-bold text-white px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none hover:scale-[1.02] text-center"
                      style={plan.isPopular 
                        ? { background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)" }
                        : { border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)" }}
                    >
                      {loading === plan.id ? "Loading..." : "Get Started"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            SECTION 5 · FINAL CTA — ocean gradient panel
        ══════════════════════════════════════════════════ */}
        <section
          className="py-24 px-6"
          style={{ background: "#080f1e", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="relative rounded-[32px] overflow-hidden px-8 py-20 md:px-20 md:py-28 text-center"
              style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0c2a4a 50%, #0369a1 100%)" }}
            >
              {/* Dot grid on panel */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Sky glow */}
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
                style={{
                  background: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
                  transform: "translate(20%, -20%)",
                }}
              />
              <div className="relative z-10">
                <span className="text-sm uppercase tracking-[0.22em] font-bold text-sky-300 mb-6 block">
                  Start Today
                </span>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] leading-[1.04] text-white mb-6">
                  Ready to run your business{" "}
                  <span
                    className="pr-2"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Smarter?
                  </span>
                </h2>
                <p className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto font-medium mb-10">
                  Join 50+ Caribbean businesses already running on NWS Business OS.
                  Get set up and start automating today.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="#pricing"
                    className="text-sm uppercase tracking-[0.18em] font-bold bg-white text-sky-800 px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-sky-50 cursor-pointer border-none hover:scale-[1.02]"
                  >
                    Get Started
                  </a>
                  <button
                    onClick={onBookDemo}
                    className="text-sm uppercase tracking-[0.18em] font-bold text-white px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)" }}
                  >
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
