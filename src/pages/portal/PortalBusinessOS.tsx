import { Building2, ExternalLink } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PortalBusinessOS() {
  const { hasPortalAccess } = useAuth();
  
  if (!hasPortalAccess('super_admin')) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="h-full flex flex-col p-6 w-full">
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Building2 className="text-sky-500" />
            Business OS Super Admin
          </h1>
          <p className="text-slate-400">Master control for all Business OS tenants and global settings.</p>
        </div>
        <a 
          href="https://businessesos.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white hover:border-sky-500 transition-colors text-sm font-bold"
        >
          View Live Product <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
        <iframe 
          src="https://businessesos.com/portal/login" 
          className="w-full h-full border-none absolute inset-0"
          title="Business OS Super Admin"
        />
        {/* We point this to the business os portal login or wherever the super admin route is. For now just root or /portal */}
      </div>
    </div>
  );
}
