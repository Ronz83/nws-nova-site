import { useState } from "react";
import { Lightbulb, Search, Plus, Filter, Play, CheckCircle2, CloudLightning } from "lucide-react";

interface Blueprint {
  id: string;
  name: string;
  industry: string;
  type: "Website" | "Funnel" | "App";
  description: string;
  activeDeployments: number;
  status: "Ready" | "In Development";
}

const mockBlueprints: Blueprint[] = [
  { id: "1", name: "Luxe MedSpa Clinic", industry: "MedSpa", type: "Website", description: "High-end medical spa website with built-in booking and before/after gallery.", activeDeployments: 14, status: "Ready" },
  { id: "2", name: "Auto Dealership Pro", industry: "Automotive", type: "Website", description: "Dynamic inventory showcase, test drive booking, and finance application forms.", activeDeployments: 9, status: "Ready" },
  { id: "3", name: "HVAC Lead Gen Funnel", industry: "Home Services", type: "Funnel", description: "High-converting single page funnel for emergency HVAC repairs.", activeDeployments: 22, status: "Ready" },
  { id: "4", name: "Premium Real Estate", industry: "Real Estate", type: "Website", description: "Property listings integration, agent profiles, and virtual tour support.", activeDeployments: 7, status: "Ready" },
  { id: "5", name: "Restaurant Ordering App", industry: "Restaurant", type: "App", description: "PWA for online food ordering, reservations, and loyalty program.", activeDeployments: 0, status: "In Development" },
  { id: "6", name: "Law Firm Authority", industry: "Legal", type: "Website", description: "Professional legal practice site with practice areas and consultation booking.", activeDeployments: 4, status: "Ready" },
];

export default function PortalNicheBlueprints() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockBlueprints.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Niche Blueprints
          </h2>
          <p className="text-sm text-slate-400 mt-1">Master repository of pre-built industry templates and architectures.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-sm font-bold">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg transition-colors text-sm font-bold shadow-md">
            <Plus className="w-4 h-4" />
            New Blueprint
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text"
          placeholder="Search blueprints by name or industry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(blueprint => (
          <div key={blueprint.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-colors group flex flex-col relative">
            
            {/* Status indicator */}
            <div className="absolute top-4 right-4">
              {blueprint.status === 'Ready' ? (
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                  <CloudLightning className="w-3 h-3" /> In Dev
                </div>
              )}
            </div>

            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${
                  blueprint.type === 'Website' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                  blueprint.type === 'Funnel' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                  'bg-pink-500/10 text-pink-400 border-pink-500/20'
                }`}>
                  {blueprint.type}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold uppercase tracking-widest">
                  {blueprint.industry}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 pr-16">{blueprint.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{blueprint.description}</p>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-end bg-slate-950/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Deployments</span>
                <span className="text-sm font-bold text-slate-300">{blueprint.activeDeployments}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-900 border border-slate-700 hover:border-yellow-500 hover:text-yellow-400 text-slate-300 rounded-lg py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Deploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
