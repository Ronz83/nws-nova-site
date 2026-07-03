import { Globe } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PortalCaricom() {
  const { hasPortalAccess } = useAuth();
  
  if (!hasPortalAccess('super_admin')) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Globe className="text-sky-500" />
          Caricom Business Admin
        </h1>
        <p className="text-slate-400">Super admin dashboard for managing the Caricom Business product.</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <p className="text-slate-400 text-sm">Product management interface will go here.</p>
      </div>
    </div>
  );
}
