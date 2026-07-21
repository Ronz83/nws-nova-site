import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import WorkbenchResults from './WorkbenchResults';
import SurveyModal, { type SurveyData } from './SurveyModal';

// ── Ticker / idle animation data (unchanged) ──────────────────────────
const TICKER_ENTRIES = [
  { name: 'Marcus T.',      type: 'Auto Shop',       loc: 'Barbados',   score: 34, sev: 'critical' },
  { name: 'Aisha B.',       type: 'Legal Services',  loc: 'Trinidad',   score: 71, sev: 'good' },
  { name: 'DigiKing',       type: 'E-Commerce',      loc: 'Jamaica',    score: 48, sev: 'warning' },
  { name: 'Sunrise Spa',    type: 'Beauty & Wellness',loc: 'St. Lucia', score: 29, sev: 'critical' },
  { name: 'Peak Fit',       type: 'Fitness Studio',  loc: 'Barbados',   score: 63, sev: 'warning' },
  { name: 'BlueBay Rentals',type: 'Hospitality',     loc: 'Antigua',    score: 55, sev: 'warning' },
  { name: 'Clarke & Co.',   type: 'Accounting',      loc: 'T&T',        score: 82, sev: 'good' },
  { name: 'Urban Bites',    type: 'Restaurant',      loc: 'Grenada',    score: 38, sev: 'critical' },
];

const SAMPLE_CATEGORIES = [
  { name: 'Lead Capture', scores: [34, 58, 22, 71, 45] },
  { name: 'Speed to Lead', scores: [52, 29, 76, 41, 63] },
  { name: 'Follow-up',    scores: [22, 67, 38, 55, 81] },
  { name: 'Reputation',   scores: [45, 33, 61, 28, 72] },
  { name: '24/7 Access',  scores: [31, 74, 19, 82, 37] },
];

const SAMPLE_SCORES   = [47, 63, 31, 74, 52];
const SAMPLE_LEAKAGES = ['$2,100', '$4,800', '$1,400', '$8,300', '$3,600'];

const PROCESSING_STAGES = [
  'Scanning website…',
  'Extracting brand intelligence…',
  'Scoring your digital operations…',
  'Identifying revenue leaks…',
  'Building your custom AI agent…',
  'Compiling your free report…',
  'Almost ready…',
];

// ── Small helpers ─────────────────────────────────────────────────────
function SeverityDot({ sev }: { sev: string }) {
  const c = sev === 'critical' ? 'bg-red-400' : sev === 'good' ? 'bg-emerald-400' : 'bg-amber-400';
  return <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${c}`} />;
}

function AnimatedBar({ target, delay = 0 }: { target: number; delay?: number }) {
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
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

// ── Idle Preview (unchanged from original) ────────────────────────────
function IdlePreview() {
  const [sampleIdx, setSampleIdx]       = React.useState(0);
  const [tickerIdx, setTickerIdx]       = React.useState(0);
  const [count, setCount]               = React.useState(143);
  const [scoreDisplayed, setScoreDisplayed] = React.useState(0);

  const currentScore   = SAMPLE_SCORES[sampleIdx];
  const currentLeakage = SAMPLE_LEAKAGES[sampleIdx];
  const currentCats    = SAMPLE_CATEGORIES.map(c => c.scores[sampleIdx]);
  const grade          = currentScore >= 80 ? 'A' : currentScore >= 65 ? 'B' : currentScore >= 50 ? 'C' : currentScore >= 35 ? 'D' : 'F';
  const gradeColor     = currentScore >= 65 ? '#34d399' : currentScore >= 40 ? '#fbbf24' : '#f87171';

  React.useEffect(() => {
    const t = setInterval(() => setSampleIdx(i => (i + 1) % SAMPLE_SCORES.length), 5000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    setScoreDisplayed(0);
    let c = 0;
    const t = setInterval(() => {
      c += 3;
      if (c >= currentScore) { setScoreDisplayed(currentScore); clearInterval(t); }
      else setScoreDisplayed(c);
    }, 18);
    return () => clearInterval(t);
  }, [currentScore]);

  React.useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ENTRIES.length), 3000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const t = setInterval(() => setCount(c => c + 1), 12000);
    return () => clearInterval(t);
  }, []);

  const entry1 = TICKER_ENTRIES[tickerIdx];
  const entry2 = TICKER_ENTRIES[(tickerIdx + 1) % TICKER_ENTRIES.length];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {/* Score ring */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col items-center gap-2">
          <p className="text-sm uppercase tracking-widest text-white/80 font-bold">Sample Score</p>
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
              <span className="text-sm text-white/60 font-bold">/ 100</span>
            </div>
          </div>
          <span className="text-3xl font-black" style={{ color: gradeColor }}>{grade}</span>
          <div className="text-center">
            <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Monthly Leak</p>
            <p className="text-sm font-black text-red-400">{currentLeakage}</p>
          </div>
        </div>

        {/* Category bars */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col justify-center gap-2.5">
          <p className="text-sm uppercase tracking-widest text-white/80 font-bold mb-1">Gap Scan</p>
          {SAMPLE_CATEGORIES.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-2">
              <span className="text-sm text-white/70 w-20 shrink-0 font-medium">{cat.name}</span>
              <AnimatedBar key={`${sampleIdx}-${i}`} target={currentCats[i]} delay={i * 120} />
              <span className="text-sm font-bold w-6 text-right shrink-0"
                style={{ color: currentCats[i] >= 65 ? '#34d399' : currentCats[i] >= 40 ? '#fbbf24' : '#f87171' }}>
                {currentCats[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm uppercase tracking-widest text-white/80 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Recent Analyses
          </p>
          <p className="text-sm text-slate-600 font-mono font-bold">{count} today</p>
        </div>
        <div className="space-y-2 overflow-hidden" style={{ height: '52px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={tickerIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-2">
              {[entry1, entry2].map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <SeverityDot sev={e.sev} />
                  <span className="text-white/80 font-medium">{e.name}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-white/70">{e.type}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-600">{e.loc}</span>
                  <span className="ml-auto font-bold text-sm"
                    style={{ color: e.score >= 65 ? '#34d399' : e.score >= 40 ? '#fbbf24' : '#f87171' }}>
                    {e.score}/100
                  </span>
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
          <div key={item.label} className="flex items-center gap-2 text-[12px] text-white/80 font-medium bg-white/5 rounded-xl px-3 py-2.5">
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Wizard ───────────────────────────────────────────────────────
type WizardState = 'idle' | 'surveying' | 'processing' | 'done';

export default function WorkbenchWizard() {
  const [wizardState, setWizardState]   = React.useState<WizardState>('idle');
  const [domain, setDomain]             = React.useState('');
  const [surveyData, setSurveyData]     = React.useState<SurveyData | null>(null);
  const [results, setResults]           = React.useState<any>(null);
  const [resultUrl, setResultUrl]       = React.useState<string | null>(null);
  const [processingStage, setProcessingStage] = React.useState(0);
  const [error, setError]               = React.useState('');

  // Body scroll lock — works only when embedded in an iframe
  React.useEffect(() => {
    const isIframe = window.self !== window.top;
    
    if (isIframe) {
      // Lock scroll locally (for the iframe itself)
      document.body.style.overflow = 'hidden';
      // Tell parent page to lock scroll too
      try { window.parent.postMessage({ type: 'nws-lock-scroll' }, '*'); } catch {}
    }

    return () => {
      if (isIframe) {
        document.body.style.overflow = '';
        try { window.parent.postMessage({ type: 'nws-unlock-scroll' }, '*'); } catch {}
      }
    };
  }, []);

  // ── Step 0 submit — just opens the survey ──────────────────────────
  const handleDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) setWizardState('surveying');
  };

  // ── Survey complete — run analysis with all data ───────────────────
  const handleSurveyComplete = async (survey: SurveyData) => {
    setSurveyData(survey);
    setWizardState('processing');
    setError('');

    // Cycle processing stage labels
    let stageIdx = 0;
    const stageInterval = setInterval(() => {
      stageIdx++;
      if (stageIdx < PROCESSING_STAGES.length) setProcessingStage(stageIdx);
      else clearInterval(stageInterval);
    }, 1800);

    try {
      const businessName = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

      const res = await fetch('/api/workbench/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain:       domain.trim(),
          firstName:    survey.firstName,
          lastName:     survey.lastName,
          email:        survey.email,
          phone:        survey.phone,
          businessName,
          title:        survey.title,
          industry:     survey.industry,
          teamSize:     survey.teamSize,
          revenueRange: '',
          challenges:   survey.challenge ? [survey.challenge] : [],
        }),
      });

      const data = await res.json();
      clearInterval(stageInterval);

      if (data.status !== 'success') {
        setError(data.message || 'Analysis failed. Please try again.');
        setWizardState('idle');
        return;
      }

      if (data.resultUrl) setResultUrl(data.resultUrl);
      await new Promise(r => setTimeout(r, 1200));
      setResults(data);
      setWizardState('done');
    } catch {
      clearInterval(stageInterval);
      setError('Something went wrong. Please try again.');
      setWizardState('idle');
    }
  };

  const handleRestart = () => {
    setWizardState('idle');
    setDomain('');
    setSurveyData(null);
    setResults(null);
    setResultUrl(null);
    setError('');
    setProcessingStage(0);
  };

  // ── Results view ──────────────────────────────────────────────────
  if (wizardState === 'done' && results) {
    return (
      <WorkbenchResults
        data={results}
        form={{
          domain,
          industry: surveyData?.industry ?? '',
          teamSize: surveyData?.teamSize ?? '',
          challenges: surveyData?.challenge ? [surveyData.challenge] : [],
          firstName: surveyData?.firstName ?? '',
          lastName: surveyData?.lastName ?? '',
          email: surveyData?.email ?? '',
          phone: surveyData?.phone ?? '',
          businessName: domain,
          revenueRange: '',
        }}
        onRestart={handleRestart}
        resultUrl={resultUrl ?? undefined}
      />
    );
  }

  return (
    <>
      {/* ── Survey Modal overlay (shown during 'surveying' state) ── */}
      {wizardState === 'surveying' && (
        <SurveyModal domain={domain} onComplete={handleSurveyComplete} />
      )}

      {/* ── Wizard Panel ─────────────────────────────────────────── */}
      <div className="w-full rounded-[22px] overflow-hidden shadow-2xl" style={{ background: '#0c1a2e' }}>
        {/* Window bar */}
        <div className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/70" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400/70" />
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-sm font-mono tracking-widest font-bold uppercase text-white/70">
            NWS Business Intelligence Engine
          </span>
          <div className="flex gap-1.5">
            {(['idle', 'surveying', 'processing', 'done'] as WizardState[]).map((_s, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${
                (['idle', 'surveying', 'processing', 'done'] as WizardState[]).indexOf(wizardState) >= i
                  ? 'bg-sky-400' : 'bg-slate-700'
              }`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col" style={{ minHeight: '560px' }}>
          <AnimatePresence mode="wait">

            {/* ── IDLE + SURVEYING: Domain entry + preview ── */}
            {(wizardState === 'idle' || wizardState === 'surveying') && (
              <motion.div key="idle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5 h-full">
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

                {/* ── Domain input (IDENTICAL to original) ── */}
                <form onSubmit={handleDomainSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-3 bg-white/8 border border-white/12 rounded-xl px-5 py-4 focus-within:border-sky-500/70 focus-within:bg-white/10 transition-all">
                      <Globe size={17} className="text-sky-700 shrink-0" />
                      <input
                        type="text"
                        value={domain}
                        required
                        onChange={e => setDomain(e.target.value)}
                        placeholder="e.g. myrestaurant.com"
                        className="flex-1 bg-transparent text-[15px] text-slate-200 placeholder:text-slate-600 border-none focus:outline-none font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 text-[13px] uppercase tracking-[0.15em] font-black bg-sky-500 hover:bg-sky-400 text-white px-6 py-4 rounded-xl transition-all cursor-pointer border-none shrink-0 shadow-lg shadow-sky-500/20"
                    >
                      Scan Business <ArrowRight size={14} />
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-[12px] font-medium mt-2">{error}</p>}
                  <p className="text-sm text-white/60 font-medium mt-2.5">
                    No credit card. No spam. Report delivered instantly.
                  </p>
                </form>

                {/* Live animated preview */}
                <IdlePreview />
              </motion.div>
            )}

            {/* ── PROCESSING ── */}
            {wizardState === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                  <h3 className="text-white font-black text-xl">
                    Analyzing {domain}
                  </h3>
                  <motion.p key={processingStage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="text-sky-400 text-[15px] font-mono font-bold">
                    {PROCESSING_STAGES[processingStage]}
                  </motion.p>
                </div>

                {/* Progress bar */}
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
                      <div key={label} className={`flex items-center gap-2 text-[12px] font-bold transition-colors ${done ? 'text-emerald-400' : 'text-white/40'}`}>
                        <span className="text-base">{done ? '✓' : '○'}</span>
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-white/60 max-w-[240px]">
                  Building a custom AI agent for {domain}. Takes ~15-30 seconds.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
