import { Building2, ArrowUpCircle, HelpCircle, User, LogOut, LayoutDashboard, Settings2, BrainCircuit, TrendingUp, Settings, Zap, GraduationCap, Package, Globe, ClipboardList, Lightbulb } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useFeatures } from "../../contexts/FeatureContext";

export function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { flags } = useFeatures();

  const allLinks = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard, show: true },
    { name: "Operations", path: "/dashboard/operations", icon: Settings2, show: flags.enable_operations && user?.permissions.operations },
    { name: "Automations", path: "/dashboard/automations", icon: Zap, show: user?.permissions.automations },
    { name: "NWS AI Studio", path: "/dashboard/ai-studio", icon: BrainCircuit, show: flags.enable_ai_studio && user?.permissions.aiStudio },
    { name: "Growth", path: "/dashboard/growth", icon: TrendingUp, show: flags.enable_growth && user?.permissions.growth },
    { name: "Training", path: "/dashboard/training", icon: GraduationCap, show: flags.enable_training },
    { name: "Your Website", path: "/dashboard/website", icon: Globe, show: true },
    { name: "Fulfillment", path: "/dashboard/website-requests", icon: ClipboardList, show: user?.role === 'agency_admin' },
    { name: "Snapshots", path: "/dashboard/snapshots", icon: Package, show: user?.role === 'agency_admin' },
    { name: "Niche Blueprints", path: "/dashboard/niche-blueprints", icon: Lightbulb, show: user?.role === 'agency_admin' },
    { name: "Settings", path: "/dashboard/settings", icon: Settings, show: user?.permissions.settings },
  ];

  const navLinks = allLinks.filter(link => link.show);

  return (
    <>
      <aside aria-label="Sidebar" className="h-screen w-72 fixed left-0 top-0 bg-white/90 backdrop-blur-xl border-r border-slate-200 shadow-sm z-50 flex-col justify-between hidden md:flex">
        {/* Header - Extracted to completely fill the top area */}
        {user?.businessLogo ? (
          <div className="w-full pt-6 px-5 pb-2 border-b border-slate-100/50 mb-2">
            <div className="relative w-full group cursor-pointer">
              {/* 3D Blue Bubble effect */}
              <div className="absolute inset-0 bg-[#0ea5e9] rounded-[16px] blur-sm opacity-20 transform translate-y-1 transition-transform group-hover:translate-y-1.5"></div>
              <div className="relative bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] h-[84px] rounded-[16px] border-t-2 border-white shadow-[0_4px_10px_rgba(3,105,161,0.15),inset_0_-2px_10px_rgba(3,105,161,0.05)] ring-1 ring-sky-300 flex justify-center items-center px-4 overflow-hidden">
                <img src={user.businessLogo} alt="Business Logo" className="w-full h-full object-contain drop-shadow-sm scale-[3] group-hover:scale-[3.1] transition-transform" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full p-6 pt-8 pb-6 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] flex items-center justify-center shrink-0 border-2 border-white shadow-[0_4px_10px_rgba(3,105,161,0.2)]">
                <Building2 className="text-white font-bold w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">{user?.businessName || "NWS Business OS"}</h1>
                <p className="text-[10px] font-bold text-sky-600 mt-1 uppercase tracking-widest">Enterprise Suite</p>
              </div>
            </div>
          </div>
        )}

      {/* Top Section (Nav) */}
      <div className="flex flex-col h-full px-6 pb-6 pt-2 space-y-8 overflow-y-auto">
        {/* Navigation Links */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group relative overflow-hidden ${
                  isActive 
                    ? "bg-sky-50 text-sky-700 font-bold shadow-sm ring-1 ring-sky-200" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {/* Dynamic icon rendering handled via Lucide Icons in navLinks */}
                <link.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-sky-600" : "group-hover:text-slate-900 transition-colors"}`} />
                <span className={`${isActive ? "font-bold" : "font-medium"}`}>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Push Down */}
        {user?.permissions.requireUpgrade && (
          <div className="mt-auto pt-6">
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white text-[12px] font-bold py-3 px-6 rounded-xl transition-all uppercase tracking-[0.18em] shadow-md hover:shadow-lg hover:scale-[1.02]">
              <ArrowUpCircle className="text-[16px]" />
              Upgrade Plan
            </button>
          </div>
        )}
      </div>

      {/* Footer Links / User Profile */}
      <div className="p-6 border-t border-slate-200 bg-slate-50/50">
        <nav className="space-y-1 mb-4">
          <a className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200 ease-in-out group" href="#">
            <HelpCircle className="shrink-0 group-hover:text-slate-900 transition-colors w-5 h-5" />
            <span className="font-medium group-hover:text-slate-900 transition-colors">Support</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition-all duration-200 ease-in-out group" href="#">
            <User className="shrink-0 group-hover:text-slate-900 transition-colors w-5 h-5" />
            <span className="font-medium group-hover:text-slate-900 transition-colors">Account</span>
          </a>
        </nav>

        {/* User Profile Stub */}
        <div className="flex items-center gap-3 px-4 py-3 mt-4 bg-white border border-slate-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center border border-sky-200 text-sky-700 font-bold text-sm">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-slate-900 truncate text-sm">{user?.name || 'Guest'}</p>
            <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-[0.18em]">{user?.role || 'User'}</p>
          </div>
          <button onClick={logout} aria-label="Logout" className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg">
            <LogOut className="text-[18px]" />
          </button>
        </div>
      </div>
    </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 flex items-center justify-around px-2 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navLinks.slice(0, 5).map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full pt-2 ${
                isActive ? "text-sky-600 font-bold" : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <link.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] text-center truncate max-w-full px-1">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
