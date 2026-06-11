import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Terminal, Palette, Cpu, CheckCircle, Globe, AlertCircle, RefreshCw } from "lucide-react";

interface HeroProps {
  onBookDemo: () => void;
}

export default function Hero({ onBookDemo }: HeroProps) {
  const [domain, setDomain] = React.useState("");
  const [stage, setStage]   = React.useState<"idle" | "scraping" | "mapping" | "ready">("idle");
  const [logs, setLogs]     = React.useState<string[]>([]);
  const [extractedColors, setExtractedColors] = React.useState<string[]>([]);
  const [inputError, setInputError] = React.useState("");

  const generatePaletteFromDomain = (d: string) => {
    let hash = 0;
    for (let i = 0; i < d.length; i++) hash = d.charCodeAt(i) + ((hash << 5) - hash);
    return Array.from({ length: 4 }, (_, j) => {
      const h = Math.abs(hash + j * 90) % 360;
      const s = 65 + (Math.abs(hash >> (j * 2)) % 20);
      const l = 40 + (Math.abs(hash >> (j * 3)) % 15);
      return `hsl(${h}, ${s}%, ${l}%)`;
    });
  };

  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDomain(val);
    setInputError(val.trim() && !domainRegex.test(val.trim()) ? "Enter a valid domain (e.g. apple.com)" : "");
  };

  const runSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = domain.trim();
    if (!clean) { setInputError("Domain is required"); return; }
    if (!domainRegex.test(clean)) { setInputError("Please enter a valid domain format"); return; }

    setInputError(""); setStage("scraping"); setLogs([]); setExtractedColors([]);

    const logSequence = [
      `Establishing secure handshake with https://${clean}...`,
      "Connection secured. Mapping DNS routing tables...",
      "Parsing semantic DOM structure...",
      "Extracting page headings & brand guidelines...",
      "Indexing core product specifications...",
      "Compiling NWS Brand DNA profile...",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < logSequence.length) {
        setLogs(prev => [...prev, logSequence[idx++]]);
      } else {
        clearInterval(interval);
        setExtractedColors(generatePaletteFromDomain(clean));
        setTimeout(() => {
          setStage("mapping");
          setLogs(prev => [...prev,
            "Analyzing target database schemas...",
            "Synthesizing CRM sync nodes for GHL, Salesforce & HubSpot...",
            "Initializing low-latency voice integration pipelines...",
            "Workspace mapping successfully compiled.",
          ]);
          setTimeout(() => setStage("ready"), 2500);
        }, 1200);
      }
    }, 500);
  };

  const handleReset = () => { setDomain(""); setStage("idle"); setLogs([]); setExtractedColors([]); setInputError(""); };

  return (
    <section className="relative min-h-[calc(100vh-88px)] flex items-center justify-center py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #fffbeb 100%)" }}>

      {/* Rich ambient glows */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)", transform: "translate(30%, 30%)" }}></div>
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)" }}></div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-6 flex flex-col text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start border border-sky-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold text-sky-700 mb-8 shadow-sm">
            <Sparkles size={12} className="text-sky-500 animate-pulse" />
            <span>Novelty Web Solutions · Operations Engine</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-light text-6xl sm:text-7xl md:text-8xl tracking-tight leading-[1.02] text-text-base">
            Put your customer<br />operations on{" "}
            <span
              className="italic font-normal"
              style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              autopilot.
            </span>
          </h1>

          <p className="font-sans font-black uppercase text-xs tracking-[0.25em] text-text-muted mt-6 flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-gradient-to-r from-sky-400 to-cyan-300 inline-block rounded-full"></span>
            Powered by NWS Operations Engine
          </p>

          {/* Description */}
          <p className="mt-7 text-base sm:text-lg text-text-muted leading-relaxed font-medium max-w-lg">
            We build stunning, high-converting websites and deploy custom AI employees that answer voice calls, qualify leads, and synchronize your CRM — around the clock.
          </p>

          {/* Social proof pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            {["24/7 AI Receptionist", "CRM Automation", "Caribbean-Based"].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap gap-4 items-center">
            <button
              onClick={onBookDemo}
              className="text-xs uppercase tracking-[0.18em] font-bold text-white px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)" }}
            >
              Book Strategy Call
            </button>
            <a
              href="#roi"
              className="text-xs uppercase tracking-[0.18em] font-bold border-2 border-slate-200 hover:border-sky-300 hover:text-accent-deep px-8 py-4 rounded-xl text-text-muted transition-all duration-200 hover:bg-sky-50 cursor-pointer"
            >
              Calculate Yield
            </a>
          </div>
        </div>

        {/* ── Right Column — Dark Terminal Workbench ── */}
        <div className="lg:col-span-6 w-full">
          <div className={`w-full rounded-[20px] overflow-hidden shadow-2xl relative transition-all duration-500 ${stage !== "idle" ? "ring-2 ring-sky-400/40" : ""}`} style={{ background: "#0c1a2e" }}>

            {/* Window bar — dark */}
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.25)" }}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/70"></div>
              </div>
              <span className="text-[10px] font-mono tracking-widest font-bold uppercase flex items-center gap-1.5 text-slate-400">
                {stage === "idle"     && <><Terminal size={10} /> nws-compiler.sh</>}
                {stage === "scraping" && <><RefreshCw size={10} className="text-sky-400 animate-spin" /> ingestion_active</>}
                {stage === "mapping"  && <><Cpu size={10} className="text-amber-400 animate-pulse" /> CRM_integration</>}
                {stage === "ready"    && <><CheckCircle size={10} className="text-emerald-400" /> workspace_online</>}
              </span>
              <Globe size={12} className="text-slate-600" />
            </div>

            {/* Body — dark */}
            <div className="p-7 min-h-[370px] flex flex-col justify-between font-mono relative">
              <AnimatePresence mode="wait">

                {/* IDLE */}
                {stage === "idle" && (
                  <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-grow flex flex-col justify-center text-left">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-amber-400">Workspace Ingestion Workbench</h3>
                    <p className="text-[12px] leading-relaxed mb-6 font-medium text-slate-400">
                      Enter your brand domain to simulate the NWS autonomous ingestion pipeline — mapping your{" "}
                      <span className="text-sky-400 font-bold">brand assets, styles, and CRM nodes.</span>
                    </p>
                    <form onSubmit={runSimulation} className="w-full">
                      <div className={`w-full rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center transition-all duration-300 border ${inputError ? "border-red-500/50 bg-red-900/10" : "border-white/10 bg-white/5 focus-within:border-sky-500/50 focus-within:bg-white/8"}`}>
                        <div className="text-slate-500 pl-1.5 hidden sm:block"><Globe size={15} /></div>
                        <input
                          type="text" required value={domain} onChange={handleInputChange}
                          placeholder="e.g. stripe.com, apple.com"
                          className="flex-grow w-full bg-transparent text-sm font-bold border-none focus:outline-none font-mono py-1.5 text-slate-200 placeholder:text-slate-600"
                        />
                        <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-bold bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer shadow border-none">
                          <Play size={10} fill="currentColor" />
                          <span>Run Ingest</span>
                        </button>
                      </div>
                      {inputError && (
                        <div className="mt-2.5 text-[11px] text-red-400 font-bold flex items-center gap-1.5">
                          <AlertCircle size={12} /><span>{inputError}</span>
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}

                {/* RUNNING */}
                {(stage === "scraping" || stage === "mapping") && (
                  <motion.div key="running" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col justify-between h-full w-full text-left">
                    <div className={`absolute inset-x-0 h-[2px] top-0 animate-laser z-20 ${stage === "scraping" ? "bg-gradient-to-r from-transparent via-sky-400 to-transparent" : "bg-gradient-to-r from-transparent via-amber-400 to-transparent"}`}></div>
                    <div className="space-y-2.5 overflow-y-auto max-h-[190px] pr-1.5 text-[11px] leading-relaxed font-medium">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-2 items-start text-slate-400">
                          <span className="text-emerald-400 font-extrabold shrink-0">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-5 mt-5 flex flex-wrap gap-5 justify-between items-center w-full" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      {extractedColors.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                          <span className="text-[9px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-bold">
                            <Palette size={11} className="text-sky-400" /> Ingested Palette
                          </span>
                          <div className="flex gap-2">
                            {extractedColors.map((color, i) => (
                              <div key={i} className="w-6 h-6 rounded-lg shadow-sm ring-1 ring-white/10" style={{ backgroundColor: color }}></div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {stage === "mapping" && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 w-full">
                          <span className="text-[9px] uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-bold">
                            <Cpu size={11} className="text-amber-400" /> System Node Deployments
                          </span>
                          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
                            {["ScraperNode", "VoiceAgent", "CRMHubSync"].map((node, i) => (
                              <div key={node} className="border border-sky-500/20 p-2 rounded-lg text-sky-400 bg-sky-500/10 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>{node}</div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* READY */}
                {stage === "ready" && (
                  <motion.div key="ready" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col justify-center items-center text-center p-3">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
                      <CheckCircle size={28} />
                    </motion.div>
                    <h3 className="text-base text-white mb-1 font-bold tracking-tight">NWS Custom Workspace Generated!</h3>
                    <p className="text-[12px] text-slate-400 max-w-sm leading-relaxed mb-6 font-medium">
                      Successfully mapped pipeline nodes for <span className="font-mono text-sky-400 font-bold">{domain}</span>. System assets compiled.
                    </p>
                    <div className="w-full border rounded-xl p-3 mb-6 text-left text-[10px] font-mono space-y-1.5" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)" }}>
                      <div className="flex justify-between text-slate-400"><span>WORKSPACE NAME:</span><span className="text-white font-bold">{domain.split(".")[0].toUpperCase()}-OS</span></div>
                      <div className="flex justify-between text-slate-400"><span>ACCENT CODE:</span><span className="font-bold" style={{ color: extractedColors[0] }}>{extractedColors[0]}</span></div>
                      <div className="flex justify-between text-slate-400"><span>VOICE LATENCY:</span><span className="text-emerald-400 font-bold">&lt;740ms (EXCELLENT)</span></div>
                      <div className="flex justify-between text-slate-400"><span>INTEGRATIONS:</span><span className="text-white font-bold">CRM / VOIP / SMS</span></div>
                    </div>
                    <button onClick={handleReset} className="text-xs uppercase tracking-[0.18em] font-bold border border-white/10 hover:border-sky-400/50 px-6 py-3 rounded-xl text-slate-400 hover:text-sky-400 transition-all duration-200 cursor-pointer bg-transparent">
                      Reset Workspace
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
