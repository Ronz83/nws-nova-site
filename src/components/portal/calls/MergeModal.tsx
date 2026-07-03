import { GitMerge, Sparkles, X } from "lucide-react";

interface MergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MergeModal({ isOpen, onClose }: MergeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center shrink-0 bg-slate-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">Compare & Merge Notes</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review and combine your notes with Aria's AI notes to generate the handover report.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-6 custom-scrollbar">
          {/* AM Notes Block */}
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Manager Notes</span>
              <button className="text-xs font-semibold text-sky-400 hover:underline">Select Entirely</button>
            </div>
            <textarea
              className="w-full flex-1 p-4 text-xs font-mono leading-relaxed min-h-[420px] bg-slate-950/50 border border-slate-800 rounded-xl text-white resize-none focus:outline-none focus:border-sky-500 transition-colors custom-scrollbar"
              placeholder="Empty notes..."
            ></textarea>
          </div>

          {/* AI Notes Block */}
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Aria Auto-Notes</span>
              <button className="text-xs font-semibold text-purple-400 hover:underline">Select Entirely</button>
            </div>
            <textarea
              className="w-full flex-1 p-4 text-xs font-mono leading-relaxed min-h-[420px] bg-slate-950/80 border border-purple-500/20 rounded-xl text-purple-300 resize-none focus:outline-none custom-scrollbar"
              placeholder="Empty AI notes..."
            ></textarea>
          </div>

          {/* Merged Result Block */}
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Merged Handover Report</span>
              <button className="text-xs font-semibold text-pink-400 hover:text-pink-300 hover:underline flex items-center gap-1 transition-colors">
                <Sparkles className="w-3.5 h-3.5" /> AI-Assisted Merge
              </button>
            </div>
            <textarea
              className="w-full flex-1 p-4 text-xs font-mono leading-relaxed min-h-[420px] bg-slate-950/80 border border-pink-500/20 rounded-xl text-white resize-none focus:outline-none focus:border-pink-500/40 transition-colors custom-scrollbar"
              placeholder="Click AI-Assisted Merge or type to edit the combined handover report..."
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 border-t border-slate-800 bg-slate-900 shrink-0 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-colors"
          >
            Discard Draft
          </button>
          <button className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-full font-medium tracking-wide transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]">
            Confirm Handover Report
          </button>
        </div>
      </div>
    </div>
  );
}
