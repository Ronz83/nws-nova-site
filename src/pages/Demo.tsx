import { useParams, Link } from "react-router-dom";
import { Cpu, ArrowLeft } from "lucide-react";

export default function Demo() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-[calc(100vh-88px)] bg-bg-base text-text-base flex items-center justify-center py-20 px-6 relative overflow-hidden transition-colors duration-400">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-glow blur-[140px] pointer-events-none opacity-40"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 text-center font-sans">
        
        {/* Terminal Sandbox box */}
        <div className="border-2 border-border-base bg-card-bg rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-glow blur-2xl rounded-full pointer-events-none"></div>
          
          {/* Top Window Dots */}
          <div className="flex gap-1.5 justify-center mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shadow-inner"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shadow-inner"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shadow-inner"></div>
          </div>

          {/* Icon */}
          <div className="p-4 border border-sky-100 rounded-2xl w-fit bg-sky-50 mb-6 mx-auto shadow-sm animate-pulse">
            <Cpu size={28} className="text-sky-600" />
          </div>

          <span className="text-sm uppercase tracking-[0.25em] text-sky-600 font-mono font-bold">Custom Sandbox Compile</span>
          
          <h2 className="text-2xl font-black text-text-base mt-2 mb-4">
            Personalized Demo Workspace.
          </h2>

          <p className="text-sm text-text-muted leading-relaxed mb-6 font-semibold">
            Custom workspace preview for <span className="font-mono text-text-base font-bold bg-slate-100 px-2 py-0.5 rounded">{slug}</span> is currently in generation. Our solutions team is training the custom LLM nodes on the target domain.
          </p>

          <div className="border border-border-base rounded-xl bg-slate-50 p-4 mb-8 text-left text-sm font-mono text-text-muted space-y-1.5">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-sky-600 font-bold border-b border-border-base pb-1.5 mb-1.5">
              <span>Compiler Node Status</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping"></span> MAPPING_DOM
              </span>
            </div>
            <div className="flex justify-between">
              <span>TARGET SLUG:</span>
              <span className="text-text-base font-bold">{slug?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>WORKSPACE MODE:</span>
              <span className="text-text-base font-bold">ISOLATED_SANDBOX</span>
            </div>
            <div className="flex justify-between">
              <span>COMPILING NODES:</span>
              <span className="text-text-base font-bold">VOICE / WEB_CHAT</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-sm uppercase tracking-[0.15em] font-bold bg-accent-deep hover:bg-sky-800 text-white py-3.5 rounded-xl transition-all duration-300 w-full shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft size={12} />
              <span>Back to Overview</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
