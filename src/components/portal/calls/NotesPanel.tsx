import { GitMerge } from "lucide-react";
import { useState } from "react";

interface NotesPanelProps {
  onMergeClick: () => void;
}

export function NotesPanel({ onMergeClick }: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<"am" | "ai">("am");

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col h-[340px]">
      <div className="flex gap-2 border-b border-slate-800 pb-3 mb-4 shrink-0">
        <button
          onClick={() => setActiveTab("am")}
          className={`flex-1 text-center py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
            activeTab === "am"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          AM Notes
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex-1 text-center py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
            activeTab === "ai"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Aria Auto-Notes
        </button>
      </div>

      <div className="flex-1 flex flex-col relative">
        {activeTab === "am" ? (
          <textarea
            className="w-full flex-1 p-3 text-xs leading-relaxed font-mono resize-none bg-slate-950/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors custom-scrollbar"
            placeholder="Type your notes during the call here..."
          ></textarea>
        ) : (
          <textarea
            className="w-full flex-1 p-3 text-xs leading-relaxed font-mono resize-none bg-slate-950 border border-purple-500/30 rounded-lg text-purple-400 focus:outline-none custom-scrollbar"
            placeholder="Aria's notes will auto-populate as it listens to the conversation..."
            readOnly
          ></textarea>
        )}
      </div>

      <div className="flex gap-3 mt-4 shrink-0">
        <button className="flex-1 py-3 bg-red-950/30 hover:bg-red-900/40 border border-red-900/50 text-red-400 font-semibold rounded-full text-xs transition-colors">
          End Call
        </button>
        <button
          onClick={onMergeClick}
          className="flex-1 bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-full text-xs font-semibold flex justify-center items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]"
        >
          <GitMerge className="w-3.5 h-3.5" /> Compare & Merge
        </button>
      </div>
    </div>
  );
}
