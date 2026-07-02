import { Settings } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PortalSystem() {
  const { hasPortalAccess } = useAuth();
  
  if (!hasPortalAccess('super_admin')) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Settings className="text-sky-500" />
          System Configuration
        </h1>
        <p className="text-slate-400">Global feature flags and environment settings.</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-slate-400 text-sm">System configuration interface goes here.</p>
      </div>
    </div>
  );
}
