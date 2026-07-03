import { useState } from "react";
import { Package, Search, Plus, CloudDownload, RefreshCw, MoreVertical, Building2, ExternalLink } from "lucide-react";

interface Snapshot {
  id: string;
  name: string;
  tier: "Growth" | "Pro" | "Elite";
  industry: string;
  locations: number;
  lastUpdated: string;
  status: "Active" | "Draft" | "Syncing";
}

const mockSnapshots: Snapshot[] = [
  { id: "1", name: "NWS Universal Growth", tier: "Growth", industry: "General", locations: 45, lastUpdated: "Today, 10:23 AM", status: "Active" },
  { id: "2", name: "Automotive Pro", tier: "Pro", industry: "Automotive", locations: 12, lastUpdated: "Yesterday", status: "Active" },
  { id: "3", name: "MedSpa Elite", tier: "Elite", industry: "MedSpa", locations: 8, lastUpdated: "2 days ago", status: "Active" },
  { id: "4", name: "Real Estate Standard", tier: "Growth", industry: "Real Estate", locations: 23, lastUpdated: "Last week", status: "Active" },
  { id: "5", name: "Restaurant Pro V2", tier: "Pro", industry: "Restaurant", locations: 0, lastUpdated: "Just now", status: "Draft" },
];

export default function PortalSnapshots() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockSnapshots.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-sky-400" />
            Master Snapshots
          </h2>
          <p className="text-sm text-slate-400 mt-1">Manage, sync, and deploy GoHighLevel agency snapshots globally.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-sm font-bold">
            <RefreshCw className="w-4 h-4" />
            Sync from GHL
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors text-sm font-bold shadow-md">
            <Plus className="w-4 h-4" />
            New Snapshot
          </button>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search snapshots by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <select className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-sky-500 outline-none">
          <option value="all">All Tiers</option>
          <option value="growth">Growth</option>
          <option value="pro">Pro</option>
          <option value="elite">Elite</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(snap => (
          <div key={snap.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-sky-500/50 transition-colors group flex flex-col">
            <div className="p-5 border-b border-slate-800">
              <div className="flex justify-between items-start mb-3">
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                  snap.tier === 'Elite' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
                  snap.tier === 'Pro' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/20' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {snap.tier}
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{snap.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> {snap.industry}
              </p>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="flex justify-between text-sm mb-6">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Active Locations</p>
                  <p className="text-slate-300 font-medium">{snap.locations}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">Last Updated</p>
                  <p className="text-slate-300 font-medium">{snap.lastUpdated}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-950 border border-slate-800 hover:border-sky-500 hover:text-sky-400 text-slate-300 rounded-lg py-2 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <CloudDownload className="w-4 h-4" />
                  Push Update
                </button>
                <button className="flex-1 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg py-2 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View in GHL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
