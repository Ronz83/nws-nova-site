import { Outlet, Navigate } from "react-router-dom";
import { PortalSidebar } from "./PortalSidebar";
import { useAuth } from "../../contexts/AuthContext";
import { PortalBrainProvider } from "../../context/PortalBrainContext";
import PortalBrain from "./PortalBrain";

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
    return <Navigate to="/portal/login" replace />;
  }

  return (
    <PortalBrainProvider>
      <div className="bg-slate-900 font-sans text-slate-200 overflow-hidden flex h-screen antialiased">
        <PortalSidebar />
        <PortalBrain />
      <div className="flex-1 flex flex-col ml-0 md:ml-72 min-h-screen relative w-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl flex items-center px-8 z-10">
          <h1 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Master Control Portal</h1>
        </header>
        <main className="flex-1 overflow-y-auto pt-6 pb-24 px-4 md:px-8 w-full custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
    </PortalBrainProvider>
  );
}
