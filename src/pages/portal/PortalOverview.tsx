import { LayoutDashboard, Users, Activity, Kanban, Wrench, GraduationCap, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function PortalOverview() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="text-sky-500 w-5 h-5" />
          </div>
          NWS Master Control
        </h1>
        <p className="text-slate-400 font-medium">Internal command center and operations hub.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">System Status</h3>
            <p className="text-white font-medium">All systems operational</p>
          </div>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-sky-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Active Personnel</h3>
            <p className="text-white font-medium">Online & Authenticated</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/portal/pipeline" className="group bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 transition-all">
            <Kanban className="w-6 h-6 text-sky-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-1">Client Pipeline</h3>
            <p className="text-xs text-slate-500">Manage client onboarding stages</p>
          </Link>
          
          <Link to="/portal/tools" className="group bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 transition-all">
            <Wrench className="w-6 h-6 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-1">Active Tools</h3>
            <p className="text-xs text-slate-500">Run internal automation scripts</p>
          </Link>
          
          <Link to="/portal/academy" className="group bg-slate-900 border border-slate-800 hover:border-pink-500/50 rounded-2xl p-5 transition-all">
            <GraduationCap className="w-6 h-6 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-1">Sales Academy</h3>
            <p className="text-xs text-slate-500">Access SOPs and training materials</p>
          </Link>

          <Link to="/portal/call-assistant" className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all">
            <PhoneCall className="w-6 h-6 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold mb-1">Call Assistant</h3>
            <p className="text-xs text-slate-500">Live AI co-pilot for sales calls</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
