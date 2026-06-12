import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, AlertTriangle, Clock } from 'lucide-react';
import WorkbenchResults from '../components/workbench/WorkbenchResults';

const HASH_TAB_MAP: Record<string, number> = {
  '#demo':      3,
  '#checklist': 4,
};

type LoadState = 'loading' | 'loaded' | 'expired' | 'error';

export default function ResultsPage() {
  const { id }       = useParams<{ id: string }>();
  const navigate     = useNavigate();
  const { hash }     = useLocation();
  const initialTab   = HASH_TAB_MAP[hash] ?? 0;
  const [state, setState]         = useState<LoadState>('loading');
  const [data, setData]           = useState<any>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setState('error'); return; }

    fetch(`/api/results/${id}`)
      .then(async res => {
        if (res.status === 410) { setState('expired'); return; }
        if (!res.ok)            { setState('error');   return; }
        const json = await res.json();
        setData(json);
        setExpiresAt(json.expiresAt ?? null);
        setState('loaded');
      })
      .catch(() => setState('error'));
  }, [id]);

  // ── Loading ──────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0c1a2e' }}>
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative w-20 h-20">
            {[0, 1, 2].map(i => (
              <div key={i} className="absolute inset-0 rounded-full border border-sky-500/25 animate-ping"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: '1.8s' }} />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe size={28} className="text-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <div>
            <p className="text-white font-black text-lg">Loading your report…</p>
            <p className="text-slate-500 text-sm mt-1">Just a moment</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Expired ──────────────────────────────────────────────────────
  if (state === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0c1a2e' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Clock size={24} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl mb-2">This report has expired</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Business intelligence reports are available for 30 days after generation.
              Run a new scan to get an updated report for your business.
            </p>
          </div>
          <button
            onClick={() => navigate('/#workbench')}
            className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-sm transition-all cursor-pointer border-none"
          >
            Run a New Scan →
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────
  if (state === 'error' || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0c1a2e' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-md text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto">
            <AlertTriangle size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-white font-black text-xl mb-2">Report not found</h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              This link may be invalid or the report may have been removed.
              Run a fresh scan to generate a new report.
            </p>
          </div>
          <button
            onClick={() => navigate('/#workbench')}
            className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-sm transition-all cursor-pointer border-none"
          >
            Get a Free Report →
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Loaded — render full results ─────────────────────────────────
  const resultUrl = `${window.location.origin}/results/${id}`;

  return (
    <div>
      {/* Expiry notice */}
      {expiresAt && (
        <div className="border-b border-amber-500/20 bg-amber-500/5 px-6 py-2.5 text-center">
          <p className="text-amber-400 text-xs font-bold">
            ⏱ This report is available until {new Date(expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}

      <WorkbenchResults
        data={data}
        form={data.form ?? {}}
        onRestart={() => navigate('/#workbench')}
        resultUrl={resultUrl}
        initialTab={initialTab}
      />
    </div>
  );
}
