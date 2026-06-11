import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, RefreshCw, Star, Clock, Download, Mic, RotateCcw, CheckCircle, AlertTriangle, XCircle, ArrowRight, Phone } from 'lucide-react';
import { VoiceCallOverlay } from '../nova/VoiceCallOverlay';

interface Props {
  data: any;
  form: any;
  onRestart: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  target: <Target size={18} />,
  zap: <Zap size={18} />,
  repeat: <RefreshCw size={18} />,
  star: <Star size={18} />,
  clock: <Clock size={18} />,
};

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', bg: 'bg-red-500/15', border: 'border-red-400/30', text: 'text-red-400', dot: 'bg-red-400', icon: <XCircle size={13} className="text-red-400" /> },
  warning:  { label: 'Needs Work', bg: 'bg-amber-500/15', border: 'border-amber-400/30', text: 'text-amber-400', dot: 'bg-amber-400', icon: <AlertTriangle size={13} className="text-amber-400" /> },
  good:     { label: 'Good', bg: 'bg-emerald-500/15', border: 'border-emerald-400/30', text: 'text-emerald-400', dot: 'bg-emerald-400', icon: <CheckCircle size={13} className="text-emerald-400" /> },
};

const TABS = ['📊 Score', '🎯 Gap Analysis', '🤖 Your Nova', '🎁 Free Assets'];

function AnimatedScore({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= score) { setDisplayed(score); clearInterval(timer); }
      else setDisplayed(current);
    }, 20);
    return () => clearInterval(timer);
  }, [score]);

  const grade = score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : score >= 35 ? 'D' : 'F';
  const gradeColor = score >= 65 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400';
  const ringColor = score >= 65 ? '#34d399' : score >= 40 ? '#fbbf24' : '#f87171';

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <motion.circle
            cx="70" cy="70" r="60" fill="none"
            stroke={ringColor} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 60}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - score / 100) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black tabular-nums ${gradeColor}`}>{displayed}</span>
          <span className="text-slate-500 text-xs font-bold">/ 100</span>
        </div>
      </div>
      <div>
        <div className="text-center">
          <span className={`text-6xl font-black ${gradeColor}`}>{grade}</span>
          <p className="text-slate-400 text-xs mt-1 font-medium">Digital Operations Grade</p>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ score, color = '#0ea5e9' }: { score: number; color?: string }) {
  return (
    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
    </div>
  );
}

export default function WorkbenchResults({ data, form, onRestart }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [showVoice, setShowVoice] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const { assessment, agent, businessName, firstName } = data;

  const handleDownloadReport = () => {
    const reportWindow = window.open('', '_blank');
    if (!reportWindow) return;

    const criticals = assessment.categories.filter((c: any) => c.severity === 'critical');
    const warnings = assessment.categories.filter((c: any) => c.severity === 'warning');

    reportWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Business Intelligence Report — ${businessName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; color: #0c1a2e; background: #fff; }
  .page { max-width: 800px; margin: 0 auto; padding: 40px; }
  .header { background: linear-gradient(135deg, #0c1a2e 0%, #0369a1 100%); color: white; padding: 40px; margin: -40px -40px 40px; border-radius: 0 0 24px 24px; }
  .header h1 { font-size: 28px; font-weight: 900; }
  .header p { color: rgba(255,255,255,0.7); margin-top: 6px; font-size: 14px; }
  .badge { display: inline-block; padding: 4px 14px; border-radius: 99px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
  .score-box { display: flex; align-items: center; gap: 24px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 32px; }
  .score-num { font-size: 64px; font-weight: 900; line-height: 1; }
  .score-grade { font-size: 80px; font-weight: 900; line-height: 1; }
  .red { color: #ef4444; } .amber { color: #f59e0b; } .green { color: #10b981; }
  .section-title { font-size: 18px; font-weight: 900; margin-bottom: 16px; border-left: 4px solid #0ea5e9; padding-left: 12px; }
  .category { border: 2px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
  .category.critical { border-color: #fca5a5; background: #fff5f5; }
  .category.warning { border-color: #fcd34d; background: #fffbeb; }
  .category.good { border-color: #6ee7b7; background: #f0fdf4; }
  .cat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .cat-title { font-weight: 900; font-size: 15px; }
  .cat-score { font-weight: 900; font-size: 20px; }
  .bar { height: 6px; background: #e2e8f0; border-radius: 99px; margin: 8px 0 16px; }
  .bar-fill { height: 100%; border-radius: 99px; }
  .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #475569; margin-bottom: 4px; }
  .text { font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 12px; }
  .bold { font-weight: 700; color: #0c1a2e; }
  .steps { padding-left: 20px; }
  .steps li { font-size: 12px; color: #475569; margin-bottom: 4px; }
  .quick-win { background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 12px; padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: start; gap: 16px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 11px; }
  .cta { background: linear-gradient(135deg, #0369a1, #0ea5e9); color: white; padding: 24px; border-radius: 16px; text-align: center; margin-top: 32px; }
  .cta h3 { font-size: 20px; font-weight: 900; }
  .cta p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; }
  @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.5);margin-bottom:6px">Novelty Web Solutions · Business Intelligence</div>
    <h1>Digital Operations Report</h1>
    <p>${businessName} · Prepared for ${firstName} · ${new Date().toLocaleDateString('en-US', { year:'numeric',month:'long',day:'numeric' })}</p>
  </div>

  <div class="score-box">
    <div>
      <div class="score-num ${assessment.overallScore >= 65 ? 'green' : assessment.overallScore >= 40 ? 'amber' : 'red'}">${assessment.overallScore}</div>
      <div style="font-size:12px;font-weight:700;color:#475569;margin-top:4px">Overall Score / 100</div>
    </div>
    <div style="width:1px;height:80px;background:#e2e8f0"></div>
    <div>
      <div class="score-grade ${assessment.overallScore >= 65 ? 'green' : assessment.overallScore >= 40 ? 'amber' : 'red'}">${assessment.grade}</div>
      <div style="font-size:12px;font-weight:700;color:#475569;margin-top:4px">Grade</div>
    </div>
    <div style="flex:1">
      <div style="font-weight:900;font-size:15px;color:#0c1a2e;margin-bottom:6px">${assessment.headline}</div>
      <div style="font-size:13px;color:#ef4444;font-weight:700">Est. monthly leak: ${assessment.estimatedMonthlyLeakage}</div>
    </div>
  </div>

  <div class="section-title">Gap Analysis — 5 Critical Areas</div>
  ${assessment.categories.map((cat: any) => `
  <div class="category ${cat.severity}">
    <div class="cat-header">
      <div class="cat-title">${cat.name}</div>
      <div class="cat-score ${cat.score >= 65 ? 'green' : cat.score >= 40 ? 'amber' : 'red'}">${cat.score}/100</div>
    </div>
    <div class="bar"><div class="bar-fill" style="width:${cat.score}%;background:${cat.score >= 65 ? '#10b981' : cat.score >= 40 ? '#f59e0b' : '#ef4444'}"></div></div>
    <div class="label">The Problem</div>
    <div class="text">${cat.problem}</div>
    <div class="label">Business Impact</div>
    <div class="text bold">${cat.impact}</div>
    <div class="label" style="color:#0369a1">NWS Solution</div>
    <div class="text" style="color:#0369a1;font-weight:600">${cat.nwsSolution}</div>
    <div class="label">DIY Alternative (Manual)</div>
    <ol class="steps">${cat.manualSteps.map((s: string) => `<li>${s}</li>`).join('')}</ol>
    <div style="display:flex;gap:24px;margin-top:10px">
      <div><span class="label">Manual Time</span><div style="font-size:12px;font-weight:700;color:#0c1a2e">${cat.manualTimeEstimate}</div></div>
      <div><span class="label">Manual Cost</span><div style="font-size:12px;font-weight:700;color:#0c1a2e">${cat.manualCostEstimate}</div></div>
      <div><span class="label">NWS Product</span><div style="font-size:12px;font-weight:700;color:#0369a1">${cat.nwsProduct}</div></div>
    </div>
  </div>`).join('')}

  <div class="section-title" style="margin-top:32px">72-Hour Quick Wins (Start Today)</div>
  ${assessment.quickWins.map((win: any) => `
  <div class="quick-win">
    <div>
      <div style="font-weight:700;font-size:13px;color:#0c1a2e">${win.title}</div>
      <div style="font-size:12px;color:#475569;margin-top:3px">${win.impact}</div>
    </div>
    <div style="font-size:11px;font-weight:700;color:#0369a1;white-space:nowrap">${win.timeToImplement}</div>
  </div>`).join('')}

  <div class="cta">
    <h3>Ready to fix all of this automatically?</h3>
    <p>NWS installs in 5 business days. Book a free strategy call with Ronald to see exactly how much revenue we can recover for ${businessName}.</p>
    <div style="margin-top:16px;font-weight:700;font-size:13px">noveltywebsolutions.com · Barbados, West Indies</div>
  </div>

  <div class="footer">
    © ${new Date().getFullYear()} Novelty Web Solutions · This report was generated using the NWS Business Intelligence Engine.
    All estimates are based on industry benchmarks and the information provided.
  </div>
</div>
</body>
</html>`);
    reportWindow.document.close();
    setTimeout(() => reportWindow.print(), 500);
  };

  const scoreColor = (s: number) => s >= 65 ? '#34d399' : s >= 40 ? '#fbbf24' : '#f87171';

  return (
    <div className="w-full rounded-[20px] overflow-hidden shadow-2xl" style={{ background: '#0c1a2e' }}>
      {/* Header */}
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.25)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-emerald-400">Report Ready</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 hidden sm:block">{businessName}</span>
        <button onClick={onRestart} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer bg-transparent border-none transition-colors">
          <RotateCcw size={10} /> New Analysis
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`flex-1 min-w-fit px-4 py-3 text-[11px] font-bold transition-all cursor-pointer border-none whitespace-nowrap ${activeTab === i ? 'text-white border-b-2 border-sky-400' : 'text-slate-500 hover:text-slate-300'}`}
            style={{ background: 'transparent', borderBottomColor: activeTab === i ? '#38bdf8' : 'transparent' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 min-h-[340px]">
        <AnimatePresence mode="wait">

          {/* TAB 0 — Score */}
          {activeTab === 0 && (
            <motion.div key="t0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AnimatedScore score={assessment.overallScore} />
              <div className="border-t pt-4 mt-2 space-y-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="text-sm font-bold text-white text-center">{assessment.headline}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-400 font-black text-lg">{assessment.estimatedMonthlyLeakage}</span>
                  <span className="text-slate-500 text-xs">estimated monthly revenue leakage</span>
                </div>
                {assessment.categories.map((cat: any) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="text-slate-500 text-[10px] w-36 shrink-0 truncate">{cat.name}</span>
                    <ScoreBar score={cat.score} color={scoreColor(cat.score)} />
                    <span className="text-[11px] font-bold w-8 text-right shrink-0" style={{ color: scoreColor(cat.score) }}>{cat.score}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab(1)}
                className="w-full mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold bg-sky-500 hover:bg-sky-400 text-white py-3 rounded-xl cursor-pointer border-none transition-all">
                See Full Gap Analysis <ArrowRight size={12} />
              </button>
            </motion.div>
          )}

          {/* TAB 1 — Gap Analysis */}
          {activeTab === 1 && (
            <motion.div key="t1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {assessment.categories.map((cat: any, i: number) => {
                const sev = SEVERITY_CONFIG[cat.severity as keyof typeof SEVERITY_CONFIG];
                const isOpen = expandedCategory === i;
                return (
                  <div key={cat.name} className={`border rounded-xl overflow-hidden transition-all ${sev.border} ${sev.bg}`}>
                    <button onClick={() => setExpandedCategory(isOpen ? null : i)}
                      className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer bg-transparent border-none text-left">
                      <span className={sev.text}>{ICON_MAP[cat.icon] || <Target size={18} />}</span>
                      <span className="flex-1 text-sm font-bold text-white">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        {sev.icon}
                        <span className={`text-xs font-bold ${sev.text}`}>{cat.score}/100</span>
                        <span className="text-slate-600">{isOpen ? '▲' : '▼'}</span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                          <div className="pt-3">
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">The Problem</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{cat.problem}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Impact</p>
                            <p className="text-xs text-amber-300 font-medium leading-relaxed">{cat.impact}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">NWS Solution</p>
                            <p className="text-xs text-sky-400 font-medium leading-relaxed">{cat.nwsSolution}</p>
                            <span className="inline-block mt-1 text-[9px] px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30">{cat.nwsProduct}</span>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">DIY Steps (Manual Alternative)</p>
                            <ol className="space-y-1.5 list-decimal list-inside">
                              {cat.manualSteps.map((step: string, j: number) => (
                                <li key={j} className="text-[11px] text-slate-400">{step}</li>
                              ))}
                            </ol>
                            <div className="flex gap-4 mt-3 text-[10px] text-slate-500">
                              <span>⏱ {cat.manualTimeEstimate}</span>
                              <span>💰 {cat.manualCostEstimate}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2 — Your Nova */}
          {activeTab === 2 && (
            <motion.div key="t2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400/40 flex items-center justify-center">
                  <Mic size={28} className="text-sky-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg">Nova is trained on {businessName}</h3>
                  <p className="text-slate-400 text-sm mt-1">Your custom AI receptionist is live and ready to answer calls</p>
                </div>
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Nova's Opening Greeting</p>
                  <p className="text-sm text-sky-300 italic leading-relaxed">"{assessment.agentGreeting}"</p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full text-center">
                  {[
                    { label: 'Voice', value: '11Labs Sarah' },
                    { label: 'Latency', value: '<740ms' },
                    { label: 'Availability', value: '24/7' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                      <div className="text-white font-black text-sm">{stat.value}</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => agent?.assistantId ? setShowVoice(true) : alert('Agent initializing — try again in 30 seconds')}
                className="w-full flex items-center justify-center gap-3 text-sm font-black text-white py-4 rounded-xl cursor-pointer border-none transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)' }}>
                <Phone size={16} />
                Talk to Your Custom Nova Demo
              </button>
              <p className="text-[10px] text-slate-600 text-center">
                This is a real AI call — Nova knows {businessName}'s services, tone, and goals.
              </p>
            </motion.div>
          )}

          {/* TAB 3 — Free Assets */}
          {activeTab === 3 && (
            <motion.div key="t3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-white font-black text-base">Your Free Assets Are Unlocked 🎁</h3>
                <p className="text-slate-400 text-xs mt-1">Everything below is yours — no catch, no credit card.</p>
              </div>

              {[
                {
                  emoji: '📊',
                  title: 'Full Business Intelligence Report',
                  desc: `Complete gap analysis for ${businessName} with scores, problems, NWS solutions, manual DIY steps, and cost comparisons.`,
                  cta: 'Download PDF Report',
                  action: handleDownloadReport,
                  badge: 'Most Valuable',
                  badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                },
                {
                  emoji: '🎯',
                  title: '72-Hour Quick Win Checklist',
                  desc: `3 things ${firstName} can do this week to immediately improve ${businessName}'s digital operations — no tools required.`,
                  cta: 'Download Checklist',
                  action: () => {
                    const wins = assessment.quickWins;
                    const text = `72-HOUR QUICK WIN CHECKLIST — ${businessName}\nGenerated by NWS Business Intelligence Engine\n\n${wins.map((w: any, i: number) => `${i+1}. ${w.title}\n   Time: ${w.timeToImplement}\n   Impact: ${w.impact}`).join('\n\n')}\n\n---\nFor a complete solution: noveltywebsolutions.com`;
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `${businessName}-quick-wins.txt`; a.click();
                    URL.revokeObjectURL(url);
                  },
                  badge: 'Start Today',
                  badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                },
                {
                  emoji: '🤖',
                  title: 'Custom AI Receptionist Script',
                  desc: `Nova's full system prompt and conversation guide — customized for ${businessName} and the ${form.industry} industry.`,
                  cta: 'Download AI Script',
                  action: () => {
                    const text = `CUSTOM AI RECEPTIONIST SCRIPT — ${businessName}\nIndustry: ${form.industry}\nGenerated by NWS Business Intelligence Engine\n\n${assessment.agentSystemPrompt}\n\nGREETING:\n"${assessment.agentGreeting}"\n\n---\nTo deploy this as a live 24/7 AI employee: noveltywebsolutions.com`;
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `${businessName}-ai-script.txt`; a.click();
                    URL.revokeObjectURL(url);
                  },
                  badge: 'Exclusive',
                  badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
                },
              ].map(asset => (
                <div key={asset.title} className="border border-white/10 bg-white/5 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{asset.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-white font-bold text-sm">{asset.title}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${asset.badgeColor}`}>{asset.badge}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{asset.desc}</p>
                      <button onClick={asset.action}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-sky-400 hover:text-sky-300 cursor-pointer bg-transparent border-none transition-colors p-0">
                        <Download size={12} /> {asset.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border border-sky-500/30 bg-sky-500/10 rounded-2xl p-4 mt-2">
                <p className="text-sky-400 text-xs font-bold mb-1">Ready to fix everything automatically?</p>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                  Book a free 30-minute strategy call. Ronald will review your report live and show you exactly how quickly we can close every gap.
                </p>
                <a href="https://calendly.com/noveltywebsolutions/strategy" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white py-2.5 px-5 rounded-xl cursor-pointer border-none transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                  Book Free Strategy Call <ArrowRight size={11} />
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Voice overlay — uses pre-provisioned agent from workbench analysis */}
      {showVoice && (
        <VoiceCallOverlay
          demoId="nws-workbench"
          businessName={businessName}
          primaryColor="#0369a1"
          apiBase=""
          assistantId={agent?.assistantId}
          publicKey={agent?.publicKey}
          onClose={() => setShowVoice(false)}
        />
      )}
    </div>
  );
}
