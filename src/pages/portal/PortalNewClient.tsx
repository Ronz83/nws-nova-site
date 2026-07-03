import { useState } from "react";
import { UserPlus, Zap, LayoutDashboard, CheckCircle2, AlertCircle, LoaderCircle, ExternalLink } from "lucide-react";

export default function PortalNewClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationId, setLocationId] = useState("");

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate provisioning process
    setTimeout(() => {
      setLocationId("LOC_abc123" + Math.floor(Math.random() * 1000));
      setStatus("success");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">New Client Provisioning</h1>
        </div>
        <p className="text-slate-400 text-sm ml-13">Fill out the form below to automatically create a GHL sub-account and apply the correct snapshot.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6 shadow-xl">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Client Details</h3>

        <form onSubmit={handleProvision} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Name *</label>
              <input required type="text" placeholder="John Smith" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name *</label>
              <input required type="text" placeholder="Smith Dental Clinic" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email *</label>
              <input required type="email" placeholder="john@smithdental.com" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
              <input type="tel" placeholder="+1 (246) 000-0000" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry / Niche *</label>
              <select required className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                <option value="general">General / Small Business</option>
                <option value="dental">Dental</option>
                <option value="real_estate">Real Estate</option>
                <option value="home_services">Home Services</option>
                <option value="hospitality">Hospitality</option>
                <option value="veterinary">Veterinary</option>
                <option value="death_care">Death Care</option>
                <option value="automotive">Automotive</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Website</label>
              <input type="url" placeholder="https://smithdental.com" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</label>
              <input type="text" placeholder="Bridgetown, Barbados" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>

          {status === "loading" && (
            <div className="bg-slate-950/50 border border-purple-500/20 rounded-xl p-5 flex items-center gap-4">
              <LoaderCircle className="w-6 h-6 text-purple-400 animate-spin shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">Creating GHL sub-account...</p>
                <p className="text-xs text-slate-400 mt-0.5">This usually takes 5–15 seconds.</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="bg-slate-950/50 border border-purple-500/30 rounded-xl p-5">
              <div className="flex items-center gap-4 mb-3">
                <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
                <p className="text-sm font-semibold text-white">Sub-account created successfully!</p>
              </div>
              <div className="bg-black/20 rounded-xl p-4 space-y-2 text-xs font-mono">
                <p><span className="text-slate-500">GHL Location ID:</span> <span className="text-purple-400 font-bold ml-2">{locationId}</span></p>
                <p><span className="text-slate-500">Job ID:</span> <span className="text-slate-300 ml-2">job_{Math.random().toString(36).substr(2, 9)}</span></p>
              </div>
              <a href="https://app.gohighlevel.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Open in GoHighLevel
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="bg-slate-950/50 border border-red-500/30 rounded-xl p-5">
              <div className="flex items-center gap-4 mb-2">
                <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />
                <p className="text-sm font-semibold text-white">Provisioning failed</p>
              </div>
              <p className="text-xs text-slate-400 font-mono bg-black/20 p-3 rounded-lg">Error: API timeout or invalid credentials.</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-4 rounded-xl text-sm font-bold tracking-wide flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            <Zap className="w-4 h-4" />
            {status === "loading" ? "Provisioning..." : "Provision GHL Account"}
          </button>
        </form>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Admin Provisioning Dashboard</p>
          <p className="text-xs text-slate-400 mt-1">Monitor all provisioning jobs, view errors, and retry failed accounts.</p>
        </div>
        <a href="https://businessesos.com/dashboard" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors border border-slate-700">
          <LayoutDashboard className="w-3.5 h-3.5" /> Open Dashboard
        </a>
      </div>
    </div>
  );
}
