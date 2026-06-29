import { Building2, ArrowUpCircle, HelpCircle, User, LogOut, LayoutDashboard, Settings2, BrainCircuit, TrendingUp, Settings, Zap } from 'lucide-react';
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
    { name: "Settings", path: "/dashboard/settings", icon: Settings, show: user?.permissions.settings },
  ];

  const navLinks = allLinks.filter(link => link.show);

  return (
    <>
      <aside aria-label="Sidebar" className="h-screen w-72 fixed left-0 top-0 bg-slate-900 border-r-2 border-slate-800 z-50 flex-col justify-between hidden md:flex">
      {/* Top Section */}
      <div className="flex flex-col h-full p-6 space-y-8 overflow-y-auto">
        {/* Header */}
        {user?.businessLogo ? (
          <div className="bg-white rounded-xl p-3 flex items-center justify-center shadow-inner">
            <img src={user.businessLogo} alt="Business Logo" className="w-full max-h-12 object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 rounded-lg bg-sky-900 flex items-center justify-center shrink-0">
              <Building2 className="text-sky-100 font-bold w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">{user?.businessName || "NWS Business OS"}</h1>
              <p className="text-[10px] font-bold text-sky-400 mt-1 uppercase tracking-widest">Enterprise Suite</p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group relative overflow-hidden ${
                  isActive 
                    ? "bg-sky-900/50 text-sky-400" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {/* Dynamic icon rendering handled via Lucide Icons in navLinks */}
                <link.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-sky-400" : "group-hover:text-white transition-colors"}`} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Push Down */}
        {user?.permissions.requireUpgrade && (
          <div className="mt-auto pt-6">
            <button className="w-full flex items-center justify-center gap-2 bg-sky-700 text-white text-[12px] font-bold py-3 px-6 rounded-xl hover:bg-sky-600 transition-colors uppercase tracking-widest">
              <ArrowUpCircle className="text-[16px]" />
              Upgrade Plan
            </button>
          </div>
        )}
      </div>

      {/* Footer Links / User Profile */}
      <div className="p-6 border-t border-slate-800 bg-slate-900/90">
        <nav className="space-y-1 mb-4">
          <a className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-all duration-200 ease-in-out group" href="#">
            <HelpCircle className="shrink-0 group-hover:text-white transition-colors w-5 h-5" />
            <span className="font-medium group-hover:text-white transition-colors">Support</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-all duration-200 ease-in-out group" href="#">
            <User className="shrink-0 group-hover:text-white transition-colors w-5 h-5" />
            <span className="font-medium group-hover:text-white transition-colors">Account</span>
          </a>
        </nav>

        {/* User Profile Stub */}
        <div className="flex items-center gap-3 px-4 py-2 mt-4 bg-slate-800/50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 text-white font-bold text-sm">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'JD'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium text-white truncate text-sm">{user?.name || 'Guest'}</p>
            <p className="text-[10px] text-slate-400 truncate uppercase tracking-wider">{user?.role || 'User'}</p>
          </div>
          <button onClick={logout} aria-label="Logout" className="text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="text-[18px]" />
          </button>
        </div>
      </div>
    </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 z-50 flex items-center justify-around px-2 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        {navLinks.slice(0, 5).map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full pt-2 ${
                isActive ? "text-sky-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <link.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium text-center truncate max-w-full px-1">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
