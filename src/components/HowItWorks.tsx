import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Settings, Unlock, Check } from "lucide-react";

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
      id: 1, title: "Create Your Free Account", subtitle: "Step 01 / Sign Up",
      description: "Sign up in 60 seconds. No credit card required. Your business account is ready instantly.",
      icon: <UserPlus size={18} />,
    },
    {
      id: 2, title: "Your System Is Pre-Built", subtitle: "Step 02 / Auto-Provision",
      description: "We deploy a complete business operating system into your account the moment you sign up. Fully configured, ready to use.",
      icon: <Settings size={18} />,
    },
    {
      id: 3, title: "Unlock What You Need", subtitle: "Step 03 / Scale Up",
      description: "Start with the free essentials. Upgrade individual features as your business grows — only pay for what you use.",
      icon: <Unlock size={18} />,
    },
  ];

  return (
    <section id="process" className="py-24 px-6 border-t border-border-base bg-bg-tint relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">How It Works</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            From zero to a fully operating business system in three simple steps.
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
                    <div className={`z-10 w-10 h-10 rounded-full shrink-0 flex items-center justify-center border-2 transition-all duration-300 ${isActive ? "border-sky-500 bg-sky-500 text-white shadow" : activeStep > step.id ? "border-sky-300 bg-white text-sky-500" : "border-slate-200 bg-white text-sky-600"}`}>
                      {activeStep > step.id ? <Check size={14} strokeWidth={3} /> : step.icon}
                    </div>
                    <div className="flex-1 text-left pt-0.5 font-sans">
                      <span className={`text-sm uppercase tracking-[0.2em] font-bold transition-colors ${isActive ? "text-sky-600" : "text-text-muted/50"}`}>{step.subtitle}</span>
                      <h3 className={`text-xl tracking-tight mt-0.5 font-black transition-colors ${isActive ? "text-text-base" : "text-text-muted"}`}>{step.title}</h3>
                      <p className={`text-sm leading-relaxed mt-2.5 font-medium transition-all ${isActive ? "text-text-muted block opacity-100" : "h-0 overflow-hidden opacity-0"}`}>{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Preview Viewport */}
          <div className="lg:col-span-7 w-full h-[400px] border-2 border-slate-100 bg-white rounded-[24px] relative overflow-hidden flex flex-col shadow-lg">
            <div className="px-5 py-4 border-b border-border-base flex items-center justify-between bg-slate-50">
              <span className="text-sm font-mono tracking-widest text-text-base font-bold uppercase">{steps[activeStep - 1].subtitle}</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
            </div>
            <div className="flex-grow p-6 flex items-center justify-center relative overflow-hidden bg-slate-50/30">
              <AnimatePresence mode="wait">

                {/* Step 1: Sign Up */}
                {activeStep === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                    className="w-full max-w-sm flex flex-col border border-slate-100 bg-white rounded-3xl font-sans shadow-xl shadow-sky-900/5 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-amber-400"></div>
                    <div className="w-14 h-14 bg-sky-50 border border-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm transform rotate-3">
                      <UserPlus size={24} className="-rotate-3" />
                    </div>
                    <h4 className="text-xl font-black text-text-base mb-1.5">Claim Your Account</h4>
                    <p className="text-sm text-text-muted mb-6 px-4">Create your workspace in seconds. No credit card required.</p>
                    <div className="space-y-3 text-left">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-sky-700 uppercase tracking-wider pl-1">Business Name</span>
                        <div className="h-10 bg-slate-50 rounded-xl w-full border border-slate-200 flex items-center px-3 text-sm text-sky-600 font-medium">Acme Corp</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-sky-700 uppercase tracking-wider pl-1">Work Email</span>
                        <div className="h-10 bg-white rounded-xl w-full border border-sky-300 ring-2 ring-sky-100 flex items-center px-3 text-sm text-text-base font-medium">
                          founder@acme.com
                          <div className="ml-auto w-0.5 h-3.5 bg-sky-500 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="h-11 bg-sunrise-gradient hover:opacity-90 rounded-xl w-full flex items-center justify-center text-white text-sm font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer">
                          Create Free Account
                        </div>
                      </div>
                      <div className="text-center mt-3">
                        <span className="text-[8px] text-sky-600 uppercase tracking-widest font-bold">🔒 256-Bit SSL Secured</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Auto-Provision */}
                {activeStep === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    className="w-full h-full flex flex-col border border-slate-200 bg-white rounded-2xl overflow-hidden font-mono shadow-sm">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-sm text-text-muted font-bold flex justify-between items-center">
                      <span>system_provisioning</span>
                      <span className="text-emerald-600 animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Active
                      </span>
                    </div>
                    <div className="p-4 flex-grow text-sm text-text-muted font-medium space-y-2 overflow-y-auto leading-relaxed text-left">
                      <div className="text-sky-600">&gt; Authenticating new sub-account... OK</div>
                      <div>&gt; Deploying NWS Starter Snapshot...</div>
                      <div className="flex flex-col gap-1 my-2 pl-4 border-l-2 border-slate-200">
                        <div className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> CRM Pipelines Configured</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Lead Capture Forms Built</div>
                        <div className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Calendar Booking Live</div>
                      </div>
                      <div>&gt; Syncing email reputation sequences...</div>
                      <div className="text-text-base font-bold mt-2">&gt; Workspace Ready. System fully operational.</div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Scale Up */}
                {activeStep === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                    className="w-full max-w-sm flex flex-col gap-3 font-sans text-left">
                    
                    {/* Usage Progress */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-text-base">Contacts Usage</span>
                        <span className="text-sm font-mono text-amber-600 font-bold">498 / 500</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[99%] h-full bg-amber-400"></div>
                      </div>
                      <p className="text-sm text-text-muted mt-3">You are approaching your monthly limit.</p>
                    </div>

                    {/* Upgrade Prompt */}
                    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 shadow-sm mt-2 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-sky-200 blur-3xl rounded-full opacity-50 pointer-events-none"></div>
                      <div className="flex items-start gap-3 relative z-10">
                        <div className="p-2 bg-sky-500 text-white rounded-xl shadow-sm">
                          <Unlock size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-text-base">Upgrade to Growth</h4>
                          <p className="text-sm text-text-muted leading-relaxed mt-1 mb-3">
                            Unlock 2,500 contacts, AI Voice Agents, and full automation workflows.
                          </p>
                          <button className="text-sm font-bold uppercase tracking-wider bg-white border border-slate-200 px-4 py-2 rounded-lg text-sky-700 shadow-sm hover:border-sky-300">
                            View Plans
                          </button>
                        </div>
                      </div>
                    </div>
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
