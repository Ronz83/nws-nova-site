import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────
export interface SurveyData {
  firstName: string;
  lastName: string;
  title: string;
  industry: string;
  challenge: string;
  teamSize: string;
  email: string;
  phone: string;
}

interface Props {
  domain: string;
  onComplete: (data: SurveyData) => void;
}

// ── Question Data ─────────────────────────────────────────────────────
const ROLES = [
  { value: 'Owner / Founder',     label: 'Owner / Founder',     icon: '👑' },
  { value: 'Director / Manager',  label: 'Director / Manager',  icon: '📋' },
  { value: 'Marketing Lead',      label: 'Marketing Lead',      icon: '📣' },
  { value: 'Sales / Business Dev',label: 'Sales / Business Dev',icon: '🤝' },
  { value: 'Operations / Admin',  label: 'Operations / Admin',  icon: '⚙️' },
];

const INDUSTRIES = [
  { value: 'Healthcare / Medical',   icon: '🏥' },
  { value: 'Legal / Law Firm',       icon: '⚖️' },
  { value: 'Real Estate',            icon: '🏠' },
  { value: 'Automotive',             icon: '🚗' },
  { value: 'Restaurant / Food',      icon: '🍽️' },
  { value: 'Fitness / Wellness',     icon: '💪' },
  { value: 'Retail / E-Commerce',    icon: '🛍️' },
  { value: 'Construction',           icon: '🏗️' },
  { value: 'Beauty / Salon',         icon: '💈' },
  { value: 'Professional Services',  icon: '💼' },
  { value: 'Hospitality / Tourism',  icon: '🏨' },
  { value: 'Other',                  icon: '🔹' },
];

const CHALLENGES = [
  { value: 'losing_leads',      label: 'Losing leads after hours', desc: 'Prospects contact you when you\'re closed — and never follow up' },
  { value: 'slow_followup',     label: 'Slow follow-up',           desc: 'Leads go cold before your team gets back to them' },
  { value: 'manual_processes',  label: 'Too much manual work',     desc: 'Admin tasks eat hours that should go to revenue' },
  { value: 'no_booking',        label: 'No automated booking',     desc: 'Scheduling is back-and-forth instead of instant' },
  { value: 'bad_reputation',    label: 'Not enough reviews',       desc: 'You need a stronger, more consistent online presence' },
];

const TEAM_SIZES = [
  { value: 'solo',    label: 'Just me' },
  { value: '2_10',   label: '2 – 10' },
  { value: '11_50',  label: '11 – 50' },
  { value: '50_plus',label: '50+' },
];

// ── Progress Bar ─────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="px-6 pt-5 pb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Step {step} of {total}</span>
        <span className="text-sm font-bold text-slate-600">{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-sky-500"
          initial={{ width: `${((step - 1) / total) * 100}%` }}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ── Choice Card ──────────────────────────────────────────────────────
function ChoiceCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
        selected
          ? 'border-accent-primary bg-accent-glow text-accent-primary shadow-[0_0_12px_rgba(255,107,77,0.15)]'
          : 'border-border-base hover:border-accent-primary/50 bg-card-bg text-text-base'
      }`}
    >
      {selected && <CheckCircle size={15} className="text-accent-primary shrink-0" />}
      {children}
    </button>
  );
}

// ── Text Input ───────────────────────────────────────────────────────
function TextField({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-text-base uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-accent-primary ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-border-base rounded-xl px-4 py-3 text-[15px] text-text-base placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary transition-colors bg-card-bg"
      />
    </div>
  );
}

// ── Main Survey Modal ─────────────────────────────────────────────────
const TOTAL_STEPS = 6;
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

export default function SurveyModal({ domain, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<SurveyData>({
    firstName: '', lastName: '', title: '', industry: '',
    challenge: '', teamSize: '', email: '', phone: '',
  });

  const set = (key: keyof SurveyData, val: string) =>
    setData(prev => ({ ...prev, [key]: val }));

  const next = () => { setDir(1); setStep(s => s + 1); };
  const back = () => { setDir(-1); setStep(s => s - 1); };

  const canAdvance = (): boolean => {
    if (step === 1) return !!data.firstName.trim();
    if (step === 2) return !!data.title;
    if (step === 3) return !!data.industry;
    if (step === 4) return !!data.challenge;
    if (step === 5) return !!data.teamSize;
    if (step === 6) return !!data.email.trim() && data.email.includes('@');
    return false;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAdvance()) onComplete(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
         style={{ background: 'rgba(10, 20, 40, 0.85)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card-bg rounded-2xl w-full max-w-[460px] shadow-2xl overflow-hidden border border-border-base"
      >
        {/* Header */}
        <div className="px-6 py-3.5 flex items-center gap-3" style={{ background: '#0c1a2e' }}>
          <div className="w-7 h-7 rounded-full bg-accent-primary flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-black">NWS</span>
          </div>
          <div>
            <p className="text-white text-[13px] font-black leading-none">Intelligence Engine</p>
            <p className="text-accent-primary text-sm font-mono mt-0.5 truncate max-w-[240px]">{domain}</p>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar step={step} total={TOTAL_STEPS} />

        {/* Questions */}
        <div className="px-6 pb-6 overflow-hidden" style={{ minHeight: '340px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >

              {/* Q1 — Name */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">First, what's your name?</h2>
                    <p className="text-sm text-text-muted mt-1">We'll personalise your report for you.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="Jane" required />
                    <TextField label="Last name" value={data.lastName} onChange={v => set('lastName', v)} placeholder="Smith" />
                  </div>
                </div>
              )}

              {/* Q2 — Role */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">What's your role?</h2>
                    <p className="text-sm text-text-muted mt-1">Helps us tailor your recommendations.</p>
                  </div>
                  <div className="space-y-2">
                    {ROLES.map(r => (
                      <ChoiceCard key={r.value} selected={data.title === r.value} onClick={() => set('title', r.value)}>
                        <span className="text-xl shrink-0">{r.icon}</span>
                        <span className="text-[14px] font-semibold">{r.label}</span>
                      </ChoiceCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Q3 — Industry */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">What industry are you in?</h2>
                    <p className="text-sm text-text-muted mt-1">We'll benchmark you against similar businesses.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind.value}
                        type="button"
                        onClick={() => set('industry', ind.value)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-center cursor-pointer transition-all ${
                          data.industry === ind.value
                            ? 'border-accent-primary bg-accent-glow'
                            : 'border-border-base hover:border-accent-primary/50 bg-card-bg'
                        }`}
                      >
                        <span className="text-2xl">{ind.icon}</span>
                        <span className={`text-sm font-bold leading-tight ${data.industry === ind.value ? 'text-accent-primary' : 'text-text-base'}`}>
                          {ind.value.split(' /')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Q4 — Challenge */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">What's your #1 challenge right now?</h2>
                    <p className="text-sm text-text-muted mt-1">We'll focus your report on this first.</p>
                  </div>
                  <div className="space-y-2">
                    {CHALLENGES.map(c => (
                      <ChoiceCard key={c.value} selected={data.challenge === c.value} onClick={() => set('challenge', c.value)}>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-text-base leading-snug">{c.label}</p>
                          <p className="text-sm text-text-muted mt-0.5 leading-snug">{c.desc}</p>
                        </div>
                      </ChoiceCard>
                    ))}
                  </div>
                </div>
              )}

              {/* Q5 — Team Size */}
              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">How big is your team?</h2>
                    <p className="text-sm text-text-muted mt-1">We scale the solution to fit your operation.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {TEAM_SIZES.map(t => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => set('teamSize', t.value)}
                        className={`py-5 px-4 rounded-xl border-2 font-black text-[15px] cursor-pointer transition-all ${
                          data.teamSize === t.value
                            ? 'border-accent-primary bg-accent-glow text-accent-primary'
                            : 'border-border-base hover:border-accent-primary/50 bg-card-bg text-text-base'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div className="bg-bg-tint border border-border-base rounded-xl p-3 flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-[12px] text-text-muted leading-relaxed">
                      Your custom AI agent is built to scale with your team — whether you're solo or 50+, it handles the volume.
                    </p>
                  </div>
                </div>
              )}

              {/* Q6 — Contact */}
              {step === 6 && (
                <form id="survey-final" onSubmit={handleFinalSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-black text-text-base leading-snug">Where should we send your report?</h2>
                    <p className="text-sm text-slate-600 mt-1">Your full intelligence report, AI script, and quick win checklist — all free.</p>
                  </div>
                  <div className="space-y-3">
                    <TextField label="Email address" value={data.email} onChange={v => set('email', v)} placeholder="jane@yourbusiness.com" type="email" required />
                    <TextField label="Phone (optional)" value={data.phone} onChange={v => set('phone', v)} placeholder="+1 246 555 0100" type="tel" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    🔒 No spam. No credit card. We'll also send a text when your custom AI demo is live.
                  </p>
                </form>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="px-6 pb-6 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border-2 border-border-base text-text-muted text-[13px] font-bold cursor-pointer hover:border-accent-primary/50 transition-colors bg-card-bg"
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-black text-white transition-all cursor-pointer border-none disabled:opacity-35"
              style={{ background: canAdvance() ? '#0ea5e9' : '#cbd5e1' }}
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              form="survey-final"
              disabled={!canAdvance()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-black text-white transition-all cursor-pointer border-none disabled:opacity-35"
              style={{ background: canAdvance() ? '#0369a1' : '#cbd5e1' }}
            >
              Generate My Report <ArrowRight size={14} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
