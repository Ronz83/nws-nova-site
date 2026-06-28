import { Outlet, Navigate, useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopNav } from "./DashboardTopNav";
import { useAuth } from "../../contexts/AuthContext";
import { Shield } from "lucide-react";

export function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f0f9ff] bg-dot-grid relative">
        <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-slate-100 max-w-md w-full text-center z-10">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-6">You must be logged in to access the Business OS Dashboard.</p>
          <div className="flex flex-col gap-3">
            <a 
              href="/dashboard?role=agency_admin"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
            >
              Demo: Login as Agency Admin
            </a>
            <a 
              href="/dashboard?role=location_user"
              className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
            >
              Demo: Login as Location User
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Permission Checks based on current route
  const path = location.pathname;
  const p = user.permissions;
  
  if (path.includes('/operations') && !p.operations) return <Navigate to="/dashboard" replace />;
  if (path.includes('/growth') && !p.growth) return <Navigate to="/dashboard" replace />;
  if (path.includes('/automations') && !p.automations) return <Navigate to="/dashboard" replace />;
  if (path.includes('/ai-studio') && !p.aiStudio) return <Navigate to="/dashboard" replace />;
  if (path.includes('/settings') && !p.settings) return <Navigate to="/dashboard" replace />;

  return (
    <div className="bg-[#f0f9ff] bg-dot-grid font-sans text-slate-900 overflow-hidden flex h-screen antialiased">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col ml-0 md:ml-72 min-h-screen relative w-full overflow-hidden">
        <DashboardTopNav />
        
        {/* Main Content Canvas - The Outlet renders child routes like DashboardOverview */}
        <main className="flex-1 overflow-y-auto pt-24 pb-24 px-4 md:px-12 w-full max-w-[1280px] mx-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
