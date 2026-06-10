import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MessageSquare, Briefcase, Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState(1);

  const steps: Step[] = [
    {
      id: 1, title: "Discovery & Ingestion", subtitle: "Step 01 / Brand Mapping",
      description: "Enter your domain. NWS dissects your existing website structure, copy, brand guidelines, and product catalogs to establish a semantic knowledge base.",
      icon: <Globe size={18} />,
    },
    {
      id: 2, title: "Design & Tuning", subtitle: "Step 02 / Bespoke Customization",
      description: "We design a custom mobile-first website layout and tune conversational voice receptionists with pre-defined business rules, vocabulary, and call routing.",
      icon: <MessageSquare size={18} />,
    },
    {
      id: 3, title: "CRM Sync & Launch", subtitle: "Step 03 / Operations Launch",
      description: "We connect lead capture loops, link automated follow-up drips, and sync calendar mappings natively into HubSpot, Salesforce, or GHL before going live.",
      icon: <Briefcase size={18} />,
    },
  ];

  return (
    <section id="process" className="py-24 px-6 border-t border-border-base bg-bg-tint relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Our Process</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Automating customer loops from first click to close.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">

          {/* Left: Stepper */}
          <div className="lg:col-span-5 flex flex-col gap-3 relative">
            {steps.map((step, index) => {
              const isActive = activeStep === step.id;
              return (
                <div key={step.id} className="relative">
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[36px] top-[64px] bottom-[-20px] w-[2px] bg-slate-200">
                      <motion.div
                        className="h-full w-full bg-sky-400 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: activeStep > step.id ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                  {/* Tab Card */}
                  <div
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex gap-5 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${isActive ? "border-sky-200 bg-white shadow-md" : "border-transparent bg-transparent hover:bg-white/60 hover:border-slate-200/60"}`}
                  >
                    <div className={`z-10 w-10 h-10 rounded-full shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${isActive ? "border-sky-500 bg-sky-500 text-white shadow" : activeStep > step.id ? "border-sky-300 bg-white text-sky-500" : "border-slate-200 bg-white text-slate-400"}`}>
                      {activeStep > step.id ? <Check size={14} strokeWidth={3} /> : step.icon}
                    </div>
                    <div className="flex-1 text-left pt-0.5 font-sans">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${isActive ? "text-sky-600" : "text-text-muted/50"}`}>{step.subtitle}</span>
                      <h3 className={`text-xl tracking-tight mt-0.5 font-black transition-colors ${isActive ? "text-text-base" : "text-text-muted"}`}>{step.title}</h3>
                      <p className={`text-xs leading-relaxed mt-2.5 font-medium transition-all ${isActive ? "text-text-muted block opacity-100" : "h-0 overflow-hidden opacity-0"}`}>{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Preview Viewport */}
          <div className="lg:col-span-7 w-full h-[400px] border-2 border-slate-100 bg-white rounded-[24px] relative overflow-hidden flex flex-col shadow-lg">
            <div className="px-5 py-4 border-b border-border-base flex items-center justify-between bg-slate-50">
              <span className="text-[10px] font-mono tracking-widest text-text-base font-bold uppercase">{steps[activeStep - 1].subtitle}</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="flex-grow p-6 flex items-center justify-center relative overflow-hidden bg-slate-50/30">
              <AnimatePresence mode="wait">

                {/* Step 1: Ingestion */}
                {activeStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                    className="w-full h-full flex flex-col border border-slate-200 bg-white rounded-2xl overflow-hidden font-mono shadow-sm">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-[10px] text-text-muted font-bold flex justify-between items-center">
                      <span>crawling: client_domain.com</span>
                      <span className="text-emerald-600 animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Ingest
                      </span>
                    </div>
                    <div className="p-4 flex-grow text-[10px] text-text-muted font-medium space-y-2 overflow-y-auto leading-relaxed text-left">
                      <div className="text-sky-600">&gt; Handshake OK. Scanning DOM structure...</div>
                      <div>&gt; Found primary header: &quot;Performance Meets Security&quot;</div>
                      <div className="flex items-center gap-3 border border-slate-100 p-2.5 rounded-xl bg-white font-sans shadow-sm my-1">
                        <div className="w-4 h-4 bg-sky-400 rounded shadow-sm"></div>
                        <div className="flex flex-col text-[9px]">
                          <span className="text-text-muted font-normal leading-none mb-0.5">Primary Branding Accent</span>
                          <span className="text-text-base font-bold">Ocean Blue (#0ea5e9)</span>
                        </div>
                      </div>
                      <div>&gt; Mapping FAQ node database vectors... SUCCESS</div>
                      <div className="text-text-base">&gt; Compiled brand schema: Workspace config generated</div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Chat */}
                {activeStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    className="w-full max-w-sm flex flex-col gap-3 font-sans text-left">
                    <div className="self-end max-w-[80%] border border-slate-200 bg-slate-100 px-4 py-2.5 rounded-2xl rounded-tr-none text-xs font-medium text-text-base shadow-sm">
                      Does the system support custom CRM fields?
                    </div>
                    <div className="self-start max-w-[85%] bg-sky-500 text-white px-4 py-3 rounded-2xl rounded-tl-none text-xs leading-relaxed font-bold relative shadow-md">
                      <div className="absolute -top-5 left-0 text-[8px] uppercase tracking-widest text-sky-600 font-bold">NWS Agent</div>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        Yes. NWS maps custom schemas automatically. We sync custom attributes directly to Salesforce and HubSpot. Let&apos;s book a consultation. Is tomorrow at 2 PM EST open?
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Pipeline */}
                {activeStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                    className="w-full h-full grid grid-cols-3 gap-3 font-sans text-left">
                    {[
                      { label: "Captured Leads", items: [{ name: "Ronald P.", sub: "apple.com" }], color: "bg-sky-50 border-sky-100 text-sky-700" },
                      { label: "Qualified",       items: [{ name: "Sarah M.",  sub: "stripe.com" }], color: "bg-amber-50 border-amber-100 text-amber-700" },
                      { label: "Deal Closed",     items: [{ name: "James L.",  sub: "nike.com"   }], color: "bg-emerald-50 border-emerald-100 text-emerald-700", ping: true },
                    ].map(col => (
                      <div key={col.label} className={`border ${col.color} rounded-2xl p-3 flex flex-col gap-2 shadow-inner`}>
                        <span className="text-[9px] uppercase tracking-wider font-bold mb-1 pb-1.5 border-b border-current/20">{col.label}</span>
                        {col.items.map(item => (
                          <motion.div key={item.name}
                            initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className="bg-white p-2.5 rounded-xl text-[10px] font-bold shadow-sm relative">
                            <div className="text-text-base">{item.name}</div>
                            <div className="text-[8px] text-text-muted font-normal mt-0.5">{item.sub}</div>
                            {col.ping && <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>}
                          </motion.div>
                        ))}
                      </div>
                    ))}
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
