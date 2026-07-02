import { Outlet } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { useAuth } from "../../contexts/AuthContext";
import { Shield } from "lucide-react";

export function PortalLayout() {
  const { user, isLoading, isStaff } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isStaff()) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900 relative">
        <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-slate-100 max-w-md w-full text-center z-10">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-6">You must be a staff member to access the Master Control Portal.</p>
          <a href="https://noveltywebsolutions.com" className="w-full inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm">
            Return to Main Site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 font-sans text-slate-200 overflow-hidden flex h-screen antialiased">
      <PortalSidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-72 min-h-screen relative w-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center px-8 z-10">
          <h1 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Master Control Portal</h1>
        </header>
        <main className="flex-1 overflow-y-auto pt-6 pb-24 px-4 md:px-8 w-full custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
