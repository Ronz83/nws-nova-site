import { useState } from "react";
import { Building2, ExternalLink, ShieldCheck, Briefcase } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PortalBusinessOS() {
  const { hasPortalAccess } = useAuth();
  const [activeView, setActiveView] = useState<'workspace' | 'super_admin'>('workspace');
  
  if (!hasPortalAccess('super_admin')) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="h-full flex flex-col p-6 w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Building2 className="text-sky-500" />
            Business OS
          </h1>
          <p className="text-slate-400 text-sm">
            {activeView === 'super_admin' 
              ? "Master control for all Business OS tenants and global settings."
              : "NWS Internal Workspace for managing agency operations."}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveView('workspace')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
                activeView === 'workspace' 
                  ? 'bg-sky-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              NWS Workspace
            </button>
            <button
              onClick={() => setActiveView('super_admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
                activeView === 'super_admin' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Super Admin
            </button>
          </div>

          <a 
            href="https://businessesos.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-sm font-bold h-[42px]"
          >
            Live Site <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
        {activeView === 'super_admin' ? (
          <iframe 
            src="https://businessesos.com/portal/login" 
            className="w-full h-full border-none absolute inset-0"
            title="Business OS Super Admin"
          />
        ) : (
          <iframe 
            src="https://os.noveltywebsolutions.com/dashboard" 
            className="w-full h-full border-none absolute inset-0"
            title="Business OS Workspace"
          />
        )}
      </div>
    </div>
  );
}
