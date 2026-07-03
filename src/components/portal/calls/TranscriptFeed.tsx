import { useState, useEffect } from "react";


export function TranscriptFeed() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([
    "[Aria is listening. Start speaking or click Simulate Transcript to begin dialogue stream...]"
  ]);

  useEffect(() => {
    if (!isSimulating) return;
    
    const interval = setInterval(() => {
      setTranscript(prev => [
        ...prev,
        "Simulated transcript chunk received: " + new Date().toLocaleTimeString()
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col h-[280px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-bold text-white uppercase tracking-widest">
            Live Voice Feed (Aria Companion)
          </span>
        </div>
        <button 
          onClick={() => setIsSimulating(!isSimulating)}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 hover:underline transition-colors"
        >
          {isSimulating ? "Stop Simulation" : "Simulate Transcript"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs font-mono scroll-smooth custom-scrollbar">
        {transcript.map((line, idx) => (
          <p key={idx} className={idx === 0 ? "text-slate-500 italic" : "text-slate-300"}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
