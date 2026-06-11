import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, User, Mail, Phone, Building, Users, Target, CheckCircle } from 'lucide-react';
import WorkbenchResults from './WorkbenchResults';

interface FormData {
  domain: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  teamSize: string;
  revenueRange: string;
  challenges: string[];
}

const INDUSTRIES = [
  'Healthcare / Medical', 'Legal / Law Firm', 'Real Estate', 'Automotive',
  'Home Services', 'Restaurant / Food & Bev', 'Retail / E-Commerce',
  'Financial Services', 'Fitness / Wellness', 'Education', 'Construction',
  'Beauty / Salon', 'Hospitality / Tourism', 'Professional Services', 'Other',
];

const TEAM_SIZES = [
  { value: 'solo', label: 'Just me' },
  { value: '2_10', label: '2–10 people' },
  { value: '11_50', label: '11–50 people' },
  { value: '50_plus', label: '50+ people' },
];

const REVENUE_RANGES = [
  { value: '<5k', label: 'Under $5K/mo' },
  { value: '5k_20k', label: '$5K – $20K/mo' },
  { value: '20k_100k', label: '$20K – $100K/mo' },
  { value: '100k_plus', label: '$100K+/mo' },
];

const CHALLENGES = [
  { value: 'losing_leads', label: '🚨 Losing leads after hours' },
  { value: 'slow_followup', label: '⏳ Slow follow-up on inquiries' },
  { value: 'manual_processes', label: '🔄 Too many manual processes' },
  { value: 'no_booking', label: '📅 No automated booking system' },
  { value: 'bad_reputation', label: '⭐ Need more / better reviews' },
  { value: 'cant_scale', label: '📈 Can\'t scale without hiring' },
];

const PROCESSING_STAGES = [
  'Scanning website…',
  'Extracting brand intelligence…',
  'Scoring your digital operations…',
  'Identifying revenue leaks…',
  'Building your custom AI agent…',
  'Compiling your free report…',
  'Almost ready…',
];

// Ticker entries — feel "live"
const TICKER_ENTRIES = [
  { name: 'Marcus T.', type: 'Auto Shop', loc: 'Barbados', score: 34, sev: 'critical' },
  { name: 'Aisha B.', type: 'Legal Services', loc: 'Trinidad', score: 71, sev: 'good' },
  { name: 'DigiKing', type: 'E-Commerce', loc: 'Jamaica', score: 48, sev: 'warning' },
  { name: 'Sunrise Spa', type: 'Beauty & Wellness', loc: 'St. Lucia', score: 29, sev: 'critical' },
  { name: 'Peak Fit', type: 'Fitness Studio', loc: 'Barbados', score: 63, sev: 'warning' },
  { name: 'BlueBay Rentals', type: 'Hospitality', loc: 'Antigua', score: 55, sev: 'warning' },
  { name: 'Clarke & Co.', type: 'Accounting', loc: 'T&T', score: 82, sev: 'good' },
  { name: 'Urban Bites', type: 'Restaurant', loc: 'Grenada', score: 38, sev: 'critical' },
];

const SAMPLE_CATEGORIES = [
  { name: 'Lead Capture', scores: [34, 58, 22, 71, 45] },
  { name: 'Speed to Lead', scores: [52, 29, 76, 41, 63] },
  { name: 'Follow-up', scores: [22, 67, 38, 55, 81] },
  { name: 'Reputation', scores: [45, 33, 61, 28, 72] },
  { name: '24/7 Access', scores: [31, 74, 19, 82, 37] },
];

const SAMPLE_SCORES   = [47, 63, 31, 74, 52];
const SAMPLE_LEAKAGES = ['$2,100', '$4,800', '$1,400', '$8,300', '$3,600'];

function SeverityDot({ sev }: { sev: string }) {
  const c = sev === 'critical' ? 'bg-red-400' : sev === 'good' ? 'bg-emerald-400' : 'bg-amber-400';
  return <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${c}`} />;
}

function AnimatedBar({ target, delay = 0 }: { target: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(target), delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  const color = target >= 65 ? '#34d399' : target >= 40 ? '#fbbf24' : '#f87171';
  return (
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

// ─── Live Workbench Idle Animation ───────────────────────────
function IdlePreview() {
  const [sampleIdx, setSampleIdx] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [count, setCount] = useState(143);
  const [scoreDisplayed, setScoreDisplayed] = useState(0);

  const currentScore    = SAMPLE_SCORES[sampleIdx];
  const currentLeakage  = SAMPLE_LEAKAGES[sampleIdx];
  const currentCats     = SAMPLE_CATEGORIES.map(c => c.scores[sampleIdx]);
  const grade           = currentScore >= 80 ? 'A' : currentScore >= 65 ? 'B' : currentScore >= 50 ? 'C' : currentScore >= 35 ? 'D' : 'F';
  const gradeColor      = currentScore >= 65 ? '#34d399' : currentScore >= 40 ? '#fbbf24' : '#f87171';

  // Cycle sample reports every 5s
  useEffect(() => {
    const t = setInterval(() => setSampleIdx(i => (i + 1) % SAMPLE_SCORES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Animate score count-up on sample change
  useEffect(() => {
    setScoreDisplayed(0);
    let c = 0;
    const t = setInterval(() => {
      c += 3;
      if (c >= currentScore) { setScoreDisplayed(currentScore); clearInterval(t); }
      else setScoreDisplayed(c);
    }, 18);
    return () => clearInterval(t);
  }, [currentScore]);

  // Cycle ticker every 3s
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ENTRIES.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Slowly increment the "businesses analyzed" counter
  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => c + 1);
    }, 12000);
    return () => clearInterval(t);
  }, []);

  const entry1 = TICKER_ENTRIES[tickerIdx];
  const entry2 = TICKER_ENTRIES[(tickerIdx + 1) % TICKER_ENTRIES.length];

  return (
    <div className="space-y-5">
      {/* Sample report preview — two columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Score ring mock */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Sample Score</p>
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <motion.circle
                key={currentScore}
                cx="40" cy="40" r="32" fill="none"
                stroke={gradeColor} strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - currentScore / 100) }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black tabular-nums" style={{ color: gradeColor }}>{scoreDisplayed}</span>
              <span className="text-[9px] text-slate-500 font-bold">/ 100</span>
            </div>
          </div>
          <span className="text-3xl font-black" style={{ color: gradeColor }}>{grade}</span>
          <div className="text-center">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Monthly Leak</p>
            <p className="text-sm font-black text-red-400">{currentLeakage}</p>
          </div>
        </div>

        {/* Category bars */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col justify-center gap-2.5">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Gap Scan</p>
          {SAMPLE_CATEGORIES.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 w-20 shrink-0 font-medium">{cat.name}</span>
              <AnimatedBar key={`${sampleIdx}-${i}`} target={currentCats[i]} delay={i * 120} />
              <span className="text-[10px] font-bold w-6 text-right shrink-0" style={{ color: currentCats[i] >= 65 ? '#34d399' : currentCats[i] >= 40 ? '#fbbf24' : '#f87171' }}>{currentCats[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live ticker */}
      <div className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Recent Analyses
          </p>
          <p className="text-[10px] text-slate-600 font-mono font-bold">{count} today</p>
        </div>
        <div className="space-y-2 overflow-hidden" style={{ height: '52px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={tickerIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-2">
              {[entry1, entry2].map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <SeverityDot sev={e.sev} />
                  <span className="text-slate-400 font-medium">{e.name}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500">{e.type}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-600">{e.loc}</span>
                  <span className="ml-auto font-bold text-[10px]" style={{ color: e.score >= 65 ? '#34d399' : e.score >= 40 ? '#fbbf24' : '#f87171' }}>{e.score}/100</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Asset teasers */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { emoji: '📊', label: 'Business Score & Grade' },
          { emoji: '🤖', label: 'Custom AI Demo Agent' },
          { emoji: '📋', label: 'Full Gap Analysis Report' },
          { emoji: '🎯', label: '72-Hour Quick Win Guide' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-[12px] text-slate-400 font-medium bg-white/5 rounded-xl px-3 py-2.5">
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Wizard ─────────────────────────────────────────────
export default function WorkbenchWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    domain: '', firstName: '', lastName: '', email: '', phone: '',
    businessName: '', industry: '', teamSize: '', revenueRange: '', challenges: [],
  });
  const [processingStage, setProcessingStage] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const update = (key: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleChallenge = (val: string) => {
    setForm(prev => ({
      ...prev,
      challenges: prev.challenges.includes(val)
        ? prev.challenges.filter(c => c !== val)
        : [...prev.challenges, val],
    }));
  };

  const handleStep0 = (e: React.FormEvent) => { e.preventDefault(); if (form.domain.trim()) setStep(1); };
  const handleStep1 = (e: React.FormEvent) => { e.preventDefault(); if (form.firstName && form.email) setStep(2); };
  const handleStep2 = (e: React.FormEvent) => { e.preventDefault(); if (form.industry && form.teamSize) runAnalysis(); };

  const runAnalysis = async () => {
    setStep(3);
    setError('');
    let stageIdx = 0;
    const stageInterval = setInterval(() => {
      stageIdx++;
      if (stageIdx < PROCESSING_STAGES.length) setProcessingStage(stageIdx);
      else clearInterval(stageInterval);
    }, 1800);

    try {
      const res = await fetch('/api/workbench/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: form.domain, firstName: form.firstName, lastName: form.lastName,
          email: form.email, phone: form.phone,
          businessName: form.businessName || form.domain,
          industry: form.industry, teamSize: form.teamSize,
          revenueRange: form.revenueRange, challenges: form.challenges,
        }),
      });
      const data = await res.json();
      clearInterval(stageInterval);
      if (data.status !== 'success') { setError(data.message || 'Analysis failed.'); setStep(2); return; }
      await new Promise(r => setTimeout(r, 1500));
      setResults(data);
      setStep(4);
    } catch {
      clearInterval(stageInterval);
      setError('Something went wrong. Please try again.');
      setStep(2);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setForm({ domain: '', firstName: '', lastName: '', email: '', phone: '', businessName: '', industry: '', teamSize: '', revenueRange: '', challenges: [] });
    setResults(null); setError(''); setProcessingStage(0);
  };

  if (step === 4 && results) return <WorkbenchResults data={results} form={form} onRestart={handleRestart} />;

  return (
    <div className="w-full rounded-[22px] overflow-hidden shadow-2xl" style={{ background: '#0c1a2e' }}>
      {/* Window bar */}
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/70" />
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400/70" />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-[11px] font-mono tracking-widest font-bold uppercase text-slate-400">
          NWS Business Intelligence Engine
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${step >= i ? 'bg-sky-400' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-7 flex flex-col" style={{ minHeight: '560px' }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 0: Domain entry + animated preview ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5 h-full">
              {/* Headline */}
              <div>
                <h3 className="text-base font-black uppercase tracking-widest text-amber-400 mb-1">
                  Free Business Intelligence Report
                </h3>
                <p className="text-[14px] text-slate-300 leading-relaxed font-medium">
                  Enter your domain. We scan, score, build a{' '}
                  <span className="text-sky-400 font-bold">custom AI demo</span>{' '}
                  trained on your business, and deliver a{' '}
                  <span className="text-sky-400 font-bold">full intelligence report</span> — free.
                </p>
              </div>

              {/* Domain input */}
              <form onSubmit={handleStep0}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-white/8 border border-white/12 rounded-xl px-5 py-4 focus-within:border-sky-500/70 focus-within:bg-white/10 transition-all">
                    <Globe size={17} className="text-slate-500 shrink-0" />
                    <input
                      type="text" value={form.domain} required
                      onChange={e => update('domain', e.target.value)}
                      placeholder="e.g. myrestaurant.com"
                      className="flex-1 bg-transparent text-[15px] text-slate-200 placeholder:text-slate-600 border-none focus:outline-none font-mono"
                    />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.15em] font-black bg-sky-500 hover:bg-sky-400 text-white px-6 py-4 rounded-xl transition-all cursor-pointer border-none shrink-0 shadow-lg shadow-sky-500/20">
                    Scan Business <ArrowRight size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 font-medium mt-2.5">
                  🔒 No credit card · No spam · Report delivered by email
                </p>
              </form>

              {/* Live animated preview */}
              <IdlePreview />
            </motion.div>
          )}

          {/* ── STEP 1: Contact info ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 text-[12px] font-bold">✓ Domain captured</span>
                  <span className="text-slate-600 text-[12px]">→</span>
                  <span className="text-amber-400 text-[12px] font-bold">Your details</span>
                </div>
                <h3 className="text-xl font-black text-white">Where should we send your report?</h3>
                <p className="text-[13px] text-slate-400 mt-1">We'll also notify you when your custom AI agent is ready.</p>
              </div>

              <form onSubmit={handleStep1} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InputField icon={<User size={15} />} value={form.firstName} onChange={v => update('firstName', v)} placeholder="First name" required />
                  <InputField icon={<User size={15} />} value={form.lastName} onChange={v => update('lastName', v)} placeholder="Last name" />
                </div>
                <InputField icon={<Mail size={15} />} value={form.email} onChange={v => update('email', v)} placeholder="Email address" type="email" required />
                <InputField icon={<Phone size={15} />} value={form.phone} onChange={v => update('phone', v)} placeholder="Phone (optional)" type="tel" />
                <InputField icon={<Building size={15} />} value={form.businessName} onChange={v => update('businessName', v)} placeholder="Business name" />

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(0)}
                    className="px-5 py-3.5 text-[12px] font-bold text-slate-400 hover:text-white border border-white/10 rounded-xl cursor-pointer bg-transparent transition-colors">
                    ← Back
                  </button>
                  <button type="submit"
                    className="flex-1 flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.12em] font-black bg-sky-500 hover:bg-sky-400 text-white px-6 py-3.5 rounded-xl transition-all cursor-pointer border-none shadow-lg shadow-sky-500/20">
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </form>

              {/* Preview reminder */}
              <div className="border border-white/8 rounded-xl px-4 py-3 bg-white/5">
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-2">What you'll receive</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ e: '📊', l: 'Business Score' }, { e: '🤖', l: 'Custom AI Demo' }, { e: '📋', l: 'Gap Analysis Report' }, { e: '🎯', l: 'Quick Win Guide' }].map(i => (
                    <div key={i.l} className="flex items-center gap-2 text-[12px] text-slate-400 font-medium">
                      <span>{i.e}</span><span>{i.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Business profile ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 text-[12px] font-bold">✓ Contact saved</span>
                  <span className="text-slate-600 text-[12px]">→</span>
                  <span className="text-amber-400 text-[12px] font-bold">Business profile</span>
                </div>
                <h3 className="text-xl font-black text-white">Tell us about your business</h3>
                {error && <p className="text-red-400 text-[12px] mt-1">{error}</p>}
              </div>

              <form onSubmit={handleStep2} className="space-y-5">
                {/* Industry */}
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Industry</label>
                  <select required value={form.industry} onChange={e => update('industry', e.target.value)}
                    className="w-full rounded-xl px-5 py-3.5 text-[14px] text-slate-200 focus:outline-none focus:border-sky-500/60 cursor-pointer border border-white/10"
                    style={{ background: '#0c1a2e' }}>
                    <option value="" disabled>Select your industry…</option>
                    {INDUSTRIES.map(i => <option key={i} value={i} style={{ background: '#0c1a2e' }}>{i}</option>)}
                  </select>
                </div>

                {/* Team size */}
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 flex items-center gap-1.5 block"><Users size={12} /> Team size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TEAM_SIZES.map(t => (
                      <button key={t.value} type="button" onClick={() => update('teamSize', t.value)}
                        className={`py-3 px-2 text-[12px] font-bold rounded-xl border transition-all cursor-pointer text-center ${form.teamSize === t.value ? 'bg-sky-500 border-sky-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-sky-500/40'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Revenue */}
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Monthly revenue</label>
                  <div className="grid grid-cols-2 gap-2">
                    {REVENUE_RANGES.map(r => (
                      <button key={r.value} type="button" onClick={() => update('revenueRange', r.value)}
                        className={`py-3 px-3 text-[12px] font-bold rounded-xl border transition-all cursor-pointer text-center ${form.revenueRange === r.value ? 'bg-amber-500 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/40'}`}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 flex items-center gap-1.5 block"><Target size={12} /> Biggest challenges</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CHALLENGES.map(c => (
                      <button key={c.value} type="button" onClick={() => toggleChallenge(c.value)}
                        className={`py-2.5 px-3 text-[12px] font-bold rounded-xl border transition-all cursor-pointer text-left flex items-center gap-2 ${form.challenges.includes(c.value) ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                        {form.challenges.includes(c.value) && <CheckCircle size={12} className="text-emerald-400 shrink-0" />}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-5 py-3.5 text-[12px] font-bold text-slate-400 hover:text-white border border-white/10 rounded-xl cursor-pointer bg-transparent transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={!form.industry || !form.teamSize}
                    className="flex-1 flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.12em] font-black bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white px-6 py-3.5 rounded-xl transition-all cursor-pointer border-none shadow-lg shadow-sky-500/20">
                    Generate My Report <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── STEP 3: Processing ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-8 text-center py-12 flex-1">
              {/* Radar animation */}
              <div className="relative w-32 h-32">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="absolute inset-0 rounded-full border border-sky-500/20 animate-ping"
                    style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2s' }} />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500/15 border border-sky-500/40 flex items-center justify-center">
                    <Globe size={24} className="text-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-black text-xl">Analyzing {form.businessName || form.domain}</h3>
                <motion.p key={processingStage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="text-sky-400 text-[15px] font-mono font-bold">
                  {PROCESSING_STAGES[processingStage]}
                </motion.p>
              </div>

              {/* Progress */}
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden max-w-xs">
                <motion.div className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full"
                  initial={{ width: '5%' }}
                  animate={{ width: `${Math.min(95, ((processingStage + 1) / PROCESSING_STAGES.length) * 100)}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }} />
              </div>

              {/* Stage checklist */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
                {['Website scanned', 'Brand DNA extracted', 'AI agent built', 'Report compiled'].map((label, i) => {
                  const done = processingStage > i * 1.5;
                  return (
                    <div key={label} className={`flex items-center gap-2 text-[12px] font-bold transition-colors ${done ? 'text-emerald-400' : 'text-slate-700'}`}>
                      <span className="text-base">{done ? '✓' : '○'}</span>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-600 max-w-[240px]">
                Building a custom AI agent for {form.businessName || form.domain}. Takes ~15–30 seconds.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

function InputField({ icon, value, onChange, placeholder, type = 'text', required = false }: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-5 py-3.5 focus-within:border-sky-500/60 transition-all">
      <span className="text-slate-500 shrink-0">{icon}</span>
      <input type={type} value={value} required={required} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[14px] text-slate-200 placeholder:text-slate-600 border-none focus:outline-none" />
    </div>
  );
}
