import React, { useState } from 'react';
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

  const handleStep0 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.domain.trim()) return;
    setStep(1);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email) return;
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.industry || !form.teamSize) return;
    runAnalysis();
  };

  const runAnalysis = async () => {
    setStep(3);
    setError('');

    // Animate stages
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
          domain: form.domain,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName || form.domain,
          industry: form.industry,
          teamSize: form.teamSize,
          revenueRange: form.revenueRange,
          challenges: form.challenges,
        }),
      });

      const data = await res.json();
      clearInterval(stageInterval);

      if (data.status !== 'success') {
        setError(data.message || 'Analysis failed. Please try again.');
        setStep(2);
        return;
      }

      // Minimum 8s of animation for effect
      await new Promise(r => setTimeout(r, Math.max(0, 8000 - (stageIdx * 1800))));
      setResults(data);
      setStep(4);

    } catch (err: any) {
      clearInterval(stageInterval);
      setError('Something went wrong. Please try again.');
      setStep(2);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setForm({ domain: '', firstName: '', lastName: '', email: '', phone: '', businessName: '', industry: '', teamSize: '', revenueRange: '', challenges: [] });
    setResults(null);
    setError('');
    setProcessingStage(0);
  };

  // ─── RESULTS ───
  if (step === 4 && results) {
    return <WorkbenchResults data={results} form={form} onRestart={handleRestart} />;
  }

  return (
    <div className="w-full rounded-[20px] overflow-hidden shadow-2xl" style={{ background: '#0c1a2e' }}>
      {/* Window bar */}
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-slate-400">
          NWS Business Intelligence Engine
        </span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${step >= i ? 'bg-sky-400' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-7 min-h-[380px] flex flex-col">
        <AnimatePresence mode="wait">

          {/* STEP 0 — Domain entry */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-1.5 text-amber-400">
                Free Business Intelligence Report
              </h3>
              <p className="text-[12px] text-slate-400 leading-relaxed mb-6">
                Enter your website domain. We'll scan your business, score your digital operations, build a{' '}
                <span className="text-sky-400 font-bold">custom AI demo</span> trained on your business, and deliver a{' '}
                <span className="text-sky-400 font-bold">full intelligence report</span> — free.
              </p>
              <form onSubmit={handleStep0} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-sky-500/60 transition-all">
                    <Globe size={15} className="text-slate-500 shrink-0" />
                    <input
                      type="text" value={form.domain} required
                      onChange={e => update('domain', e.target.value)}
                      placeholder="e.g. myrestaurant.com"
                      className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 border-none focus:outline-none font-mono"
                    />
                  </div>
                  <button type="submit"
                    className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-bold bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-xl transition-all cursor-pointer border-none shrink-0">
                    Scan Business <ArrowRight size={12} />
                  </button>
                </div>
                <p className="text-[10px] text-slate-600 font-medium">
                  🔒 No credit card. No spam. You'll receive your report by email.
                </p>
              </form>

              {/* What you'll get */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { emoji: '📊', label: 'Business Score & Grade' },
                  { emoji: '🤖', label: 'Custom AI Demo Agent' },
                  { emoji: '📋', label: 'Full Gap Analysis Report' },
                  { emoji: '🎯', label: '72-Hour Quick Win Guide' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Contact info */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-emerald-400 text-xs">✓ Domain captured</span>
                <span className="text-slate-600 text-xs">→</span>
                <span className="text-amber-400 text-xs font-bold">Your details</span>
              </div>
              <h3 className="text-base font-black text-white mb-1">Where should we send your report?</h3>
              <p className="text-[12px] text-slate-400 mb-5">We'll also notify you when your custom AI agent is ready to demo.</p>

              <form onSubmit={handleStep1} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InputField icon={<User size={14} />} value={form.firstName} onChange={v => update('firstName', v)} placeholder="First name" required />
                  <InputField icon={<User size={14} />} value={form.lastName} onChange={v => update('lastName', v)} placeholder="Last name" />
                </div>
                <InputField icon={<Mail size={14} />} value={form.email} onChange={v => update('email', v)} placeholder="Email address" type="email" required />
                <InputField icon={<Phone size={14} />} value={form.phone} onChange={v => update('phone', v)} placeholder="Phone (optional)" type="tel" />
                <InputField icon={<Building size={14} />} value={form.businessName} onChange={v => update('businessName', v)} placeholder="Business name" />

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(0)}
                    className="px-4 py-2.5 text-xs text-slate-400 hover:text-white border border-white/10 rounded-xl cursor-pointer bg-transparent transition-colors">
                    ← Back
                  </button>
                  <button type="submit"
                    className="flex-1 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-bold bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-xl transition-all cursor-pointer border-none">
                    Continue <ArrowRight size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2 — Business details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-400 text-xs">✓ Contact captured</span>
                <span className="text-slate-600 text-xs">→</span>
                <span className="text-amber-400 text-xs font-bold">Business profile</span>
              </div>
              <h3 className="text-base font-black text-white">Tell us about your business</h3>
              {error && <p className="text-red-400 text-xs">{error}</p>}

              <form onSubmit={handleStep2} className="space-y-5">
                {/* Industry */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Industry</label>
                  <select
                    required value={form.industry} onChange={e => update('industry', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-sky-500/60 cursor-pointer"
                    style={{ background: '#0c1a2e' }}>
                    <option value="" disabled>Select your industry…</option>
                    {INDUSTRIES.map(i => <option key={i} value={i} style={{ background: '#0c1a2e' }}>{i}</option>)}
                  </select>
                </div>

                {/* Team size */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block flex items-center gap-1.5"><Users size={11} /> Team size</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TEAM_SIZES.map(t => (
                      <button key={t.value} type="button" onClick={() => update('teamSize', t.value)}
                        className={`py-2.5 px-3 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${form.teamSize === t.value ? 'bg-sky-500 border-sky-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-sky-500/40 hover:text-slate-200'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Revenue */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Monthly revenue (approx)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {REVENUE_RANGES.map(r => (
                      <button key={r.value} type="button" onClick={() => update('revenueRange', r.value)}
                        className={`py-2.5 px-3 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${form.revenueRange === r.value ? 'bg-amber-500 border-amber-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/40'}`}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2 flex items-center gap-1.5"><Target size={11} /> Biggest challenges (pick all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CHALLENGES.map(c => (
                      <button key={c.value} type="button" onClick={() => toggleChallenge(c.value)}
                        className={`py-2.5 px-3 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-left flex items-center gap-2 ${form.challenges.includes(c.value) ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>
                        {form.challenges.includes(c.value) && <CheckCircle size={11} className="text-emerald-400 shrink-0" />}
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs text-slate-400 hover:text-white border border-white/10 rounded-xl cursor-pointer bg-transparent transition-colors">
                    ← Back
                  </button>
                  <button type="submit" disabled={!form.industry || !form.teamSize}
                    className="flex-1 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-bold bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-all cursor-pointer border-none">
                    Generate My Report <ArrowRight size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3 — Processing */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center flex-1 py-8 gap-6 text-center">
              {/* Animated scanner */}
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-sky-500/30 animate-ping" style={{ animationDelay: '0.3s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-sky-500/40 animate-ping" style={{ animationDelay: '0.6s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Globe size={20} className="text-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-black text-lg">Analyzing {form.businessName || form.domain}</h3>
                <motion.p key={processingStage} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-sky-400 text-sm font-mono font-bold">
                  {PROCESSING_STAGES[processingStage]}
                </motion.p>
              </div>

              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full"
                  initial={{ width: '5%' }}
                  animate={{ width: `${Math.min(95, ((processingStage + 1) / PROCESSING_STAGES.length) * 100)}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }} />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full text-left text-[10px] font-mono text-slate-600 mt-2">
                {['Website scraped', 'Brand DNA extracted', 'AI agent configured', 'Report compiled'].map((label, i) => (
                  <div key={label} className={`flex items-center gap-1.5 transition-colors ${processingStage > i * 1.5 ? 'text-emerald-400' : 'text-slate-700'}`}>
                    <span>{processingStage > i * 1.5 ? '✓' : '○'}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-slate-600 max-w-[240px]">
                Building a custom AI agent for {form.businessName || form.domain}. This takes about 15–30 seconds.
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
    <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-sky-500/60 transition-all">
      <span className="text-slate-500 shrink-0">{icon}</span>
      <input type={type} value={value} required={required} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 border-none focus:outline-none" />
    </div>
  );
}
