import React from "react";
import { DollarSign, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface ROICalculatorProps {
  onBookDemo: () => void;
}

export default function ROICalculator({ onBookDemo }: ROICalculatorProps) {
  const [leads, setLeads] = React.useState(500);
  const [closeRate, setCloseRate] = React.useState(5);
  const [dealValue, setDealValue] = React.useState(1000);
  const [missedCalls, setMissedCalls] = React.useState(50);

  // New formulas based on the approved plan
  const capturedRevenue = Math.round(missedCalls * (closeRate / 100) * dealValue);
  const newClosedDeals = dealValue > 0 ? Math.round(capturedRevenue / dealValue) : 0;
  const hoursSaved = Math.round(leads * 0.75);
  const laborSavings = hoursSaved * 40;
  const totalValue = capturedRevenue + laborSavings;

  const leadsPercent = ((leads - 50) / (5000 - 50)) * 100;
  const closePercent = ((closeRate - 1) / (30 - 1)) * 100;
  const dealPercent = ((dealValue - 100) / (10000 - 100)) * 100;
  const callsPercent = ((missedCalls - 10) / (500 - 10)) * 100;

  const sliderStyle = (pct: number) => ({
    background: `linear-gradient(to right, #0369a1 ${pct}%, #e2e8f0 ${pct}%)`
  });

  return (
    <section id="roi" className="py-24 px-6 border-t border-border-base bg-bg-tint relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Operational Yield Model</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Estimate Your NWS Operational Yield.
          </h2>
          <p className="text-sm sm:text-sm text-text-muted mt-3 max-w-md mx-auto leading-relaxed font-medium">
            Adjust the parameters below to see the direct revenue increase and human hours reclaimed by putting your customer pipeline on autopilot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-stretch font-sans">

          {/* Sliders */}
          <div className="lg:col-span-6 border-2 border-slate-100 bg-white rounded-[24px] p-8 md:p-9 flex flex-col justify-between gap-8 shadow-sm">
            {[
              { label: "Monthly Inbound Leads", value: leads, display: leads.toLocaleString(), min: 50, max: 5000, step: 50, pct: leadsPercent, set: setLeads },
              { label: "Average Missed Calls/Mo", value: missedCalls, display: missedCalls.toLocaleString(), min: 10, max: 500, step: 10, pct: callsPercent, set: setMissedCalls },
              { label: "Lead-to-Close Rate", value: closeRate, display: `${closeRate}%`, min: 1, max: 30, step: 0.5, pct: closePercent, set: setCloseRate },
              { label: "Average Deal Value", value: dealValue, display: `$${dealValue.toLocaleString()}`, min: 100, max: 10000, step: 100, pct: dealPercent, set: setDealValue },
            ].map(sl => (
              <div key={sl.label} className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="uppercase tracking-wider text-text-muted">{sl.label}</span>
                  <span className="font-mono text-base text-sky-700 px-3 py-1.5 rounded-xl border border-sky-100 bg-sky-50 shadow-inner font-black">{sl.display}</span>
                </div>
                <input type="range" min={sl.min} max={sl.max} step={sl.step} value={sl.value}
                  onChange={e => sl.set(Number(e.target.value))}
                  className="cursor-pointer" style={sliderStyle(sl.pct)} />
              </div>
            ))}
            <div className="border-t border-slate-100 pt-5 text-sm text-text-muted/50 font-mono font-bold text-left leading-relaxed">
              *Calculations are modeling estimates based on average client results.
            </div>
          </div>

          {/* Metric Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
            <div className="border-2 border-slate-100 bg-white rounded-[24px] p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 blur-2xl rounded-full pointer-events-none"></div>
              <div className="p-3 border border-sky-100 rounded-xl w-fit bg-sky-50 mb-5 shadow-sm">
                <DollarSign size={16} className="text-sky-600" />
              </div>
              <div>
                <span className="text-sm uppercase tracking-widest text-text-muted font-bold">Captured Revenue</span>
                <h3 className="text-3xl font-black tracking-tight mt-1 font-mono text-text-base">${capturedRevenue.toLocaleString()}</h3>
                <p className="text-sm text-text-muted font-medium mt-1.5">Derived from {newClosedDeals} new closed deals</p>
              </div>
            </div>

            <div className="border-2 border-slate-100 bg-white rounded-[24px] p-6 flex flex-col justify-between text-left relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 blur-2xl rounded-full pointer-events-none"></div>
              <div className="p-3 border border-amber-100 rounded-xl w-fit bg-amber-50 mb-5 shadow-sm">
                <Clock size={16} className="text-amber-600" />
              </div>
              <div>
                <span className="text-sm uppercase tracking-widest text-text-muted font-bold">Saved Labor Hours</span>
                <h3 className="text-3xl font-black tracking-tight mt-1 font-mono text-text-base">{hoursSaved.toLocaleString()}h</h3>
                <p className="text-sm text-text-muted font-medium mt-1.5">At ${laborSavings.toLocaleString()} in operational value</p>
              </div>
            </div>

            {/* Total */}
            <div className="sm:col-span-2 bg-sunrise-gradient rounded-[24px] p-8 flex flex-col justify-between text-left relative overflow-hidden shadow-xl text-white">
              <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-6 w-full">
                <div className="p-3 bg-white/15 border border-white/20 rounded-xl w-fit text-white shadow-sm">
                  <CheckCircle size={16} />
                </div>
                <span className="text-sm uppercase tracking-widest text-white border border-white/30 bg-white/10 px-3 py-1 rounded-full font-mono font-bold shadow-sm">
                  Total Operational Value
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                <div className="flex-grow">
                  <span className="text-sm uppercase tracking-widest text-sky-100 font-bold">Combined Monthly Value</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mt-0.5 font-mono text-white">${totalValue.toLocaleString()}</h3>
                  <p className="text-sm text-sky-100 mt-2 font-medium leading-relaxed">Captured Revenue + operational hours saved, combined.</p>
                </div>
                <button
                  onClick={onBookDemo}
                  className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-white hover:bg-slate-50 text-sky-700 px-6 py-4 rounded-xl transition-all duration-200 shadow-md cursor-pointer border-none"
                >
                  <span>Apply Model</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
