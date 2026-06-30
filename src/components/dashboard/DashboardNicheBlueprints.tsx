import { useState } from 'react';
import { Sparkles, Loader2, ChevronRight, Check, X, Copy, RotateCcw, BookOpen, ArrowLeft } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface MarketingCopy {
  headline: string;
  subheadline: string;
  growthDescription: string;
  proDescription: string;
  eliteDescription: string;
  painPoints: string[];
}

interface BlueprintResult {
  niche: string;
  growth: string[];
  pro: string[];
  elite: string[];
  marketingCopy: MarketingCopy;
}

// ─── Feature metadata ─────────────────────────────────────────────────────────

const FEATURE_LABELS: Record<string, string> = {
  pipeline_management: 'Pipeline Management',
  contact_crm: 'Contact CRM',
  advanced_analytics: 'Advanced Analytics',
  review_automation: 'Review Automation',
  social_scheduler: 'Social Scheduler',
  email_campaigns: 'Email Campaigns',
  universal_chat_ai: 'Universal Chat AI',
  pro_chat_ai: 'Pro Chat AI',
  voice_ai_agent: 'Voice AI Agent',
  router_agent: 'Router Agent',
  ai_knowledge_base: 'AI Knowledge Base',
  lead_capture_workflow: 'Lead Capture Workflow',
  followup_workflow: 'Follow-up Workflow',
  booking_confirmation: 'Booking Confirmation',
  upgrade_nudge: 'Upgrade Nudge',
  onboarding_videos: 'Onboarding Videos',
  advanced_playbooks: 'Advanced Playbooks',
  holiday_promo_banner: 'Holiday Promo Banner',
  bogo_offer_widget: 'BOGO Offer Widget',
  seasonal_landing_page: 'Seasonal Landing Page',
  referral_program: 'Referral Program',
  flash_sale_timer: 'Flash Sale Timer',
  vibe_coder_access: 'Vibe Coder Access',
  white_label_branding: 'White Label Branding',
  api_access: 'API Access',
};

const FEATURE_CATEGORIES: { label: string; features: string[] }[] = [
  { label: 'Operations', features: ['pipeline_management', 'contact_crm', 'advanced_analytics'] },
  { label: 'Growth', features: ['review_automation', 'social_scheduler', 'email_campaigns'] },
  { label: 'AI Studio', features: ['universal_chat_ai', 'pro_chat_ai', 'voice_ai_agent', 'router_agent', 'ai_knowledge_base'] },
  { label: 'Automations', features: ['lead_capture_workflow', 'followup_workflow', 'booking_confirmation', 'upgrade_nudge'] },
  { label: 'Training', features: ['onboarding_videos', 'advanced_playbooks'] },
  { label: 'Promotions', features: ['holiday_promo_banner', 'bogo_offer_widget', 'seasonal_landing_page', 'referral_program', 'flash_sale_timer'] },
  { label: 'Premium', features: ['vibe_coder_access', 'white_label_branding', 'api_access'] },
];

const TIER_COLORS: Record<string, { badge: string; col: string; dot: string }> = {
  growth: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', col: 'bg-emerald-50', dot: 'bg-emerald-500' },
  pro: { badge: 'bg-sky-50 text-sky-700 border-sky-200', col: 'bg-sky-50', dot: 'bg-sky-500' },
  elite: { badge: 'bg-violet-50 text-violet-700 border-violet-200', col: 'bg-violet-50', dot: 'bg-violet-500' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TierCell({ tier, featureKey, result }: { tier: 'growth' | 'pro' | 'elite'; featureKey: string; result: BlueprintResult }) {
  const isOn = result[tier].includes(featureKey);
  return (
    <td className={`px-4 py-3 text-center ${TIER_COLORS[tier].col}`}>
      {isOn
        ? <Check className="w-4 h-4 text-emerald-600 mx-auto" />
        : <X className="w-4 h-4 text-slate-300 mx-auto" />}
    </td>
  );
}

function MatrixView({ result, onBack }: { result: BlueprintResult; onBack: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyMarkdown = () => {
    const lines: string[] = [
      `# ${result.niche} Blueprint`,
      '',
      `**Headline:** ${result.marketingCopy.headline}`,
      `**Subheadline:** ${result.marketingCopy.subheadline}`,
      '',
      '## Pain Points',
      ...(result.marketingCopy.painPoints || []).map(p => `- ${p}`),
      '',
      '## Plan Descriptions',
      `**Growth:** ${result.marketingCopy.growthDescription}`,
      `**Pro:** ${result.marketingCopy.proDescription}`,
      `**Elite:** ${result.marketingCopy.eliteDescription}`,
      '',
      '## Feature Matrix',
      '| Feature | Growth | Pro | Elite |',
      '|---|:---:|:---:|:---:|',
      ...FEATURE_CATEGORIES.flatMap(cat => [
        `| **${cat.label}** | | | |`,
        ...cat.features.map(f =>
          `| ${FEATURE_LABELS[f] || f} | ${result.growth.includes(f) ? '✅' : '❌'} | ${result.pro.includes(f) ? '✅' : '❌'} | ${result.elite.includes(f) ? '✅' : '❌'} |`
        ),
      ]),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900">{result.niche} Blueprint</h2>
          <p className="text-sm text-slate-500">{result.marketingCopy.headline}</p>
        </div>
        <button
          onClick={copyMarkdown}
          className="flex items-center gap-2 border-2 border-slate-200 bg-white text-slate-600 rounded-xl px-4 py-2 text-[12px] font-bold uppercase tracking-widest hover:border-slate-400 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>

      {/* Marketing Copy Card */}
      <div className="bg-white/95 border-2 border-slate-100 rounded-[24px] p-6 shadow-sm space-y-4">
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Marketing Assets</p>
        <h3 className="text-2xl font-black text-slate-900">{result.marketingCopy.headline}</h3>
        <p className="text-slate-600 text-base">{result.marketingCopy.subheadline}</p>
        {result.marketingCopy.painPoints?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {result.marketingCopy.painPoints.map((p, i) => (
              <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-xl p-3">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">{i + 1}</div>
                <p className="text-sm text-slate-700 font-medium">{p}</p>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {(['growth', 'pro', 'elite'] as const).map(tier => (
            <div key={tier} className={`rounded-xl p-4 border-2 ${TIER_COLORS[tier].badge}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${TIER_COLORS[tier].dot}`} />
                <p className="text-[11px] font-bold uppercase tracking-widest capitalize">{tier}</p>
              </div>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {result.marketingCopy[`${tier}Description` as keyof MarketingCopy] as string}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Matrix Table */}
      <div className="bg-white/95 border-2 border-slate-100 rounded-[24px] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-100">
              <th className="px-6 py-4 text-left text-[12px] font-bold text-slate-500 uppercase tracking-widest w-1/2">Feature</th>
              {(['growth', 'pro', 'elite'] as const).map(tier => (
                <th key={tier} className={`px-4 py-4 text-center text-[12px] font-bold uppercase tracking-widest ${TIER_COLORS[tier].badge.split(' ').find(c => c.startsWith('text-'))}`}>
                  {tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_CATEGORIES.map(cat => (
              <>
                <tr key={cat.label} className="bg-slate-50 border-t border-slate-100">
                  <td colSpan={4} className="px-6 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{cat.label}</td>
                </tr>
                {cat.features.map(f => (
                  <tr key={f} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-slate-700">{FEATURE_LABELS[f] || f}</td>
                    <TierCell tier="growth" featureKey={f} result={result} />
                    <TierCell tier="pro" featureKey={f} result={result} />
                    <TierCell tier="elite" featureKey={f} result={result} />
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DashboardNicheBlueprints() {
  const [niche, setNiche] = useState('');
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<BlueprintResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'form' | 'matrix'>('form');

  const NICHE_SUGGESTIONS = [
    'Automotive Dealership', 'MedSpa', 'Law Firm', 'Real Estate Agency',
    'Restaurant', 'Dental Practice', 'Gym & Fitness', 'HVAC Company',
    'Beauty Salon', 'Home Services',
  ];

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/ai/niche-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche.trim(), notes: notes.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate blueprint');
      }

      setResult(data);
      setView('matrix');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setView('form');
    setNiche('');
    setNotes('');
    setError(null);
  };

  if (view === 'matrix' && result) {
    return (
      <div className="p-1">
        <MatrixView result={result} onBack={() => setView('form')} />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="mb-10 mt-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 font-black tracking-tight">Niche Blueprint Generator</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl">
          Enter a business niche and our AI will map the optimal feature stack for each plan tier — plus generate tailored marketing copy.
        </p>
      </header>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Input Panel */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm p-6 md:p-8 space-y-6">
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Target Niche</p>

            {/* Niche Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Business Type / Industry</label>
              <input
                type="text"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !isGenerating && handleGenerate()}
                placeholder="e.g. Automotive Dealership, MedSpa, Law Firm..."
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-sky-300 focus:ring-4 focus:ring-sky-50 transition-all outline-none text-base"
              />
            </div>

            {/* Quick Suggestions */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {NICHE_SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setNiche(s)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-bold border-2 transition-all ${
                      niche === s
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Additional Context <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific pain points, local market context, or features to prioritize for this niche..."
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-sky-300 focus:ring-4 focus:ring-sky-50 transition-all outline-none resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={!niche.trim() || isGenerating}
                className="flex items-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg"
              >
                {isGenerating
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  : <><Sparkles className="w-4 h-4" /> Generate Blueprint</>}
              </button>
              {result && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 border-2 border-slate-200 bg-white text-slate-600 rounded-xl py-3 px-5 text-[12px] font-bold uppercase tracking-widest hover:border-slate-400 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white/95 border-2 border-slate-100 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">How It Works</p>
            </div>
            <ol className="space-y-4">
              {[
                { n: '1', title: 'Enter a Niche', desc: 'Type a business type or select from our quick suggestions.' },
                { n: '2', title: 'AI Maps the Stack', desc: 'Gemini AI selects the right features for Growth, Pro, and Elite tiers based on industry needs.' },
                { n: '3', title: 'Review the Blueprint', desc: 'See a full feature matrix and tailored marketing copy ready to use.' },
                { n: '4', title: 'Copy & Deploy', desc: 'Copy the Markdown asset for your team, then build the Snapshot in the Snapshot Manager.' },
              ].map(step => (
                <li key={step.n} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] text-white flex items-center justify-center shrink-0 text-[11px] font-bold shadow-sm">
                    {step.n}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{step.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-100 rounded-[24px] p-5">
            <div className="flex items-center gap-2 mb-2">
              <ChevronRight className="w-4 h-4 text-violet-500" />
              <p className="text-[11px] font-bold text-violet-600 uppercase tracking-widest">Next Step</p>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              After generating a blueprint, take the feature list to <strong>Snapshot Manager</strong> to build the GHL Snapshot and push it to client accounts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
