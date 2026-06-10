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
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-6 overflow-hidden bg-white">

      {/* Bright ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-100 blur-[120px] pointer-events-none opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-50 blur-[140px] pointer-events-none opacity-80"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* ── Left Column ── */}
        <div className="lg:col-span-6 flex flex-col text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start border border-sky-200 bg-sky-50 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-sky-700 mb-6 shadow-sm">
            <Sparkles size={11} className="text-sky-500 animate-pulse" />
            <span>Novelty Web Solutions · Operations Engine</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.04] text-text-base">
            Put your customer operations on{" "}
            <span className="italic font-normal text-accent-primary">autopilot.</span>
          </h1>
          <p className="font-sans font-black uppercase text-[10px] sm:text-xs tracking-[0.25em] text-text-muted mt-5 flex items-center gap-2.5">
            <span className="h-[1.5px] w-6 bg-sky-300 inline-block"></span>
            Powered by NWS Operations Engine
          </p>

          {/* Description */}
          <p className="mt-6 text-sm sm:text-base text-text-muted leading-relaxed font-medium max-w-xl">
            We build stunning, high-converting websites and deploy custom AI employees that answer voice calls, qualify leads, and synchronize your CRM — around the clock.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={onBookDemo}
              className="text-xs uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none"
            >
              Book Strategy Call
            </button>
            <a
              href="#roi"
              className="text-xs uppercase tracking-[0.18em] font-bold border-2 border-border-base hover:border-sky-300 hover:text-accent-deep px-7 py-4 rounded-xl text-text-muted transition-all duration-200 hover:bg-sky-50 cursor-pointer"
            >
              Calculate Yield
            </a>
          </div>
        </div>

        {/* ── Right Column — Terminal Workbench ── */}
        <div className="lg:col-span-6 w-full">
          <div className={`w-full rounded-[24px] border-2 bg-white shadow-xl relative overflow-hidden transition-all duration-500 ${stage !== "idle" ? "border-sky-300" : "border-border-base"}`}>

            {/* Window bar */}
            <div className="px-5 py-4 border-b border-border-base flex items-center justify-between bg-slate-50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-text-muted font-bold uppercase flex items-center gap-1.5">
                {stage === "idle"     && <><Terminal size={11} /> nws-compiler.sh</>}
                {stage === "scraping" && <><RefreshCw size={11} className="text-sky-500 animate-spin" /> ingestion_active</>}
                {stage === "mapping"  && <><Cpu size={11} className="text-amber-500 animate-pulse" /> CRM_integration</>}
                {stage === "ready"    && <><CheckCircle size={11} className="text-emerald-500" /> workspace_online</>}
              </span>
              <Globe size={13} className="text-slate-300" />
            </div>

            {/* Body */}
            <div className="p-7 min-h-[370px] flex flex-col justify-between font-mono relative bg-slate-50/30">
              <AnimatePresence mode="wait">

                {/* IDLE */}
                {stage === "idle" && (
                  <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex-grow flex flex-col justify-center text-left">
                    <h3 className="text-xs text-text-base mb-1.5 font-bold uppercase tracking-widest">Workspace Ingestion Workbench</h3>
                    <p className="text-[11px] text-text-muted leading-relaxed mb-6 font-medium">
                      Enter your brand domain to simulate the NWS autonomous ingestion pipeline — mapping your brand assets, styles, and CRM nodes.
                    </p>
                    <form onSubmit={runSimulation} className="w-full">
                      <div className={`w-full bg-white border-2 rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center transition-all duration-300 shadow-sm ${inputError ? "border-red-400" : "border-border-base focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100"}`}>
                        <div className="text-slate-300 pl-1.5 hidden sm:block"><Globe size={16} /></div>
                        <input
                          type="text" required value={domain} onChange={handleInputChange}
                          placeholder="e.g. stripe.com, apple.com"
                          className="flex-grow w-full bg-transparent text-sm font-bold text-text-base border-none focus:outline-none placeholder:text-slate-300 font-mono py-1.5"
                        />
                        <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer shadow border-none">
                          <Play size={10} fill="currentColor" />
                          <span>Run Ingest</span>
                        </button>
                      </div>
                      {inputError && (
                        <div className="mt-2.5 text-[10px] text-red-500 font-bold flex items-center gap-1.5">
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
                    <div className="space-y-2.5 overflow-y-auto max-h-[190px] pr-1.5 text-[11px] text-text-muted leading-relaxed font-medium">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-sky-500 font-extrabold">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border-base pt-5 mt-5 flex flex-wrap gap-5 justify-between items-center w-full">
                      {extractedColors.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                          <span className="text-[9px] uppercase tracking-widest text-text-base flex items-center gap-1.5 font-bold">
                            <Palette size={11} className="text-sky-500" /> Ingested Palette
                          </span>
                          <div className="flex gap-2">
                            {extractedColors.map((color, i) => (
                              <div key={i} className="w-6 h-6 rounded-lg border border-border-base shadow-sm" style={{ backgroundColor: color }}></div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      {stage === "mapping" && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 w-full">
                          <span className="text-[9px] uppercase tracking-widest text-text-base flex items-center gap-1.5 font-bold">
                            <Cpu size={11} className="text-amber-500" /> System Node Deployments
                          </span>
                          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
                            {["ScraperNode", "VoiceAgent", "CRMHubSync"].map((node, i) => (
                              <div key={node} className="border border-sky-100 p-2 bg-white rounded-lg text-sky-700 shadow-sm animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>{node}</div>
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
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 mb-4 shadow-sm">
                      <CheckCircle size={28} />
                    </motion.div>
                    <h3 className="text-base text-text-base mb-1 font-bold tracking-tight">NWS Custom Workspace Generated!</h3>
                    <p className="text-[11px] text-text-muted max-w-sm leading-relaxed mb-6 font-medium">
                      Successfully mapped pipeline nodes for <span className="font-mono text-text-base font-bold">{domain}</span>. System assets compiled.
                    </p>
                    <div className="w-full border border-border-base rounded-xl bg-slate-50 p-3 mb-6 text-left text-[10px] font-mono text-text-muted space-y-1.5">
                      <div className="flex justify-between"><span>WORKSPACE NAME:</span><span className="text-text-base font-bold">{domain.split(".")[0].toUpperCase()}-OS</span></div>
                      <div className="flex justify-between"><span>ACCENT CODE:</span><span className="font-bold" style={{ color: extractedColors[0] }}>{extractedColors[0]}</span></div>
                      <div className="flex justify-between"><span>VOICE LATENCY:</span><span className="text-emerald-600 font-bold">&lt;740ms (EXCELLENT)</span></div>
                      <div className="flex justify-between"><span>INTEGRATIONS:</span><span className="text-text-base font-bold">CRM / VOIP / SMS</span></div>
                    </div>
                    <button onClick={handleReset} className="text-xs uppercase tracking-[0.18em] font-bold border-2 border-border-base hover:border-sky-300 px-6 py-3 rounded-xl text-text-muted hover:text-accent-deep transition-all duration-200 cursor-pointer">
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
