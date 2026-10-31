import React, { useState } from 'react';
import { Bug, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface BugReportModalProps {
  appSource?: string;
}

export default function BugReportModal({
  appSource = 'nws-nova-site',
}: BugReportModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [reporterEmail, setReporterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/bug-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appSource,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          title: title.trim(),
          description: description.trim(),
          severity,
          reporterEmail: reporterEmail.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Could not send report');
      }

      setSubmittedId(data.id || 'submitted');
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Could not submit bug report');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setOpen(false);
    setSubmittedId(null);
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Report an Issue"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-semibold text-black shadow-md border border-black/15 hover:border-black/40 hover:bg-white transition-all"
      >
        <Bug className="w-3.5 h-3.5 text-[#D92635]" />
        <span>Report Issue</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white text-black shadow-2xl border border-black/10 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <Bug className="w-5 h-5 text-[#D92635]" />
                <h3 className="text-base font-bold text-black">
                  Report a Technical Issue
                </h3>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="p-1 rounded-lg text-black/60 hover:text-black hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedId ? (
              <div className="p-6 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-black">
                  Issue Logged
                </h4>
                <p className="text-sm text-black/80">
                  Thank you. Your report has been recorded in our engineering queue.
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full rounded-xl bg-black text-white py-2.5 text-sm font-semibold hover:bg-black/90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-medium text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Summary
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief summary of what happened"
                    className="w-full rounded-xl border border-black/20 bg-white px-3.5 py-2 text-sm text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-black mb-1">
                      Severity
                    </label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as any)}
                      className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-black"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black mb-1">
                      Your Email (optional)
                    </label>
                    <input
                      type="email"
                      value={reporterEmail}
                      onChange={(e) => setReporterEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-black/20 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black mb-1">
                    Steps / Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What were you trying to do, and what happened instead?"
                    className="w-full rounded-xl border border-black/20 bg-white px-3.5 py-2 text-sm text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-black/70 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-[#D92635] px-5 py-2 text-sm font-semibold text-white hover:bg-[#D92635]/90 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
