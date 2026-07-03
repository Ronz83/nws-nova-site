import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const CALL_STEPS = [
  { id: 1, title: "Discovery Phase", category: "Onboarding" },
  { id: 2, title: "Tech Requirements", category: "Onboarding" },
  { id: 3, title: "Asset Handover", category: "Onboarding" },
];

export function CallStepChecklist() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Step Navigation Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
        {CALL_STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              currentStep === idx
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            Step {step.id}: {step.title}
          </button>
        ))}
      </div>

      {/* Tab Content Panel */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">
              Step {currentStep + 1} of {CALL_STEPS.length}
            </span>
            <h3 className="text-2xl font-extrabold text-white tracking-wide mt-1">
              {CALL_STEPS[currentStep].title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {CALL_STEPS[currentStep].category}
            </span>
          </div>
        </div>

        {/* Checklist area */}
        <div className="flex-1 space-y-4">
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900" />
            <div>
              <p className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">Verify primary business goals</p>
              <p className="text-xs text-slate-400 mt-0.5">Ensure we understand their main revenue drivers.</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900" />
            <div>
              <p className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">Confirm target audience</p>
              <p className="text-xs text-slate-400 mt-0.5">Discuss demographics and ideal customer profile.</p>
            </div>
          </label>
        </div>

        {/* Next/Prev Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(CALL_STEPS.length - 1, currentStep + 1))}
            disabled={currentStep === CALL_STEPS.length - 1}
            className="px-6 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
