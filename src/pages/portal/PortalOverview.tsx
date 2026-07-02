import { LayoutDashboard } from "lucide-react";

export default function PortalOverview() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <LayoutDashboard className="text-sky-500" />
          Portal Overview
        </h1>
        <p className="text-slate-400">Welcome to the NWS Internal Master Control Portal.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">System Status</h3>
          <p className="text-slate-400 text-sm">All systems operational. Dokploy clusters are routing traffic normally.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Pending Fulfillment</h3>
          <p className="text-slate-400 text-sm">0 website requests pending review.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Active Sessions</h3>
          <p className="text-slate-400 text-sm">2 staff members currently online.</p>
        </div>
      </div>
    </div>
  );
}
