import { Database } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PortalGHLControl() {
  const { hasPortalAccess } = useAuth();
  
  if (!hasPortalAccess('admin')) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Database className="text-sky-500" />
          GHL Master Control Hub
        </h1>
        <p className="text-slate-400">Manage OAuth provisioning and GHL integrations.</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-slate-400 text-sm">GHL App Management interface goes here.</p>
      </div>
    </div>
  );
}
