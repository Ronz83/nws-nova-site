import { PhoneCall } from "lucide-react";
import { useState } from "react";
import { CallStepChecklist } from "../../components/portal/calls/CallStepChecklist";
import { TranscriptFeed } from "../../components/portal/calls/TranscriptFeed";
import { NotesPanel } from "../../components/portal/calls/NotesPanel";
import { MergeModal } from "../../components/portal/calls/MergeModal";

export default function PortalCallAssistant() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-10 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
          Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Call Assistant</span>
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Collaborate with Aria, the AI Call Companion, to capture discovery notes or track the sequential onboarding status during live calls, then compile the Extendly handover report.
        </p>
      </div>

      {!isCallActive ? (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-3xl w-full mb-10 shadow-lg">
          <h3 className="text-xl font-bold mb-6 tracking-wide text-white">Initialize Call Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Client Prospect</label>
              <select className="w-full p-3.5 text-sm bg-slate-950/50 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-sky-500 transition-colors">
                <option value="" disabled selected>-- Select a project --</option>
                <option value="new">Create New Prospect...</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Type</label>
              <select className="w-full p-3.5 text-sm bg-slate-950/50 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-sky-500 transition-colors">
                <option value="prospecting">Prospecting / Discovery Call</option>
                <option value="onboarding">Extendly Handover / Onboarding Call</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => setIsCallActive(true)}
            className="w-full bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-400 hover:to-purple-400 text-white py-3.5 rounded-full text-sm font-semibold tracking-wide flex justify-center items-center gap-2 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
          >
            <PhoneCall className="w-4 h-4" /> Start Call Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Left Column: Sequential Call Checklist (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
            <CallStepChecklist />
          </div>

          {/* Right Column: AI Call Companion (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TranscriptFeed />
            <NotesPanel onMergeClick={() => setIsMergeModalOpen(true)} />
          </div>
        </div>
      )}

      {/* Merge Modal */}
      <MergeModal isOpen={isMergeModalOpen} onClose={() => setIsMergeModalOpen(false)} />
    </div>
  );
}
