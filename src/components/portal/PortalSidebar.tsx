import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LayoutDashboard, Users, Settings, Package, Lightbulb, ClipboardList, Database, LogOut } from "lucide-react";

export function PortalSidebar() {
  const location = useLocation();
  const { user, logout, hasPortalAccess } = useAuth();

  const allLinks = [
    { name: "Portal Overview", path: "/portal", icon: LayoutDashboard, show: hasPortalAccess('user') },
    { name: "Snapshots", path: "/portal/snapshots", icon: Package, show: hasPortalAccess('admin') },
    { name: "Niche Blueprints", path: "/portal/niche-blueprints", icon: Lightbulb, show: hasPortalAccess('admin') },
    { name: "Fulfillment", path: "/portal/fulfillment", icon: ClipboardList, show: hasPortalAccess('admin') },
    { name: "GHL Control", path: "/portal/ghl-control", icon: Database, show: hasPortalAccess('admin') },
    { name: "User Management", path: "/portal/users", icon: Users, show: hasPortalAccess('super_admin') },
    { name: "System Config", path: "/portal/system", icon: Settings, show: hasPortalAccess('super_admin') },
  ];

  const navLinks = allLinks.filter(link => link.show);

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 bg-slate-950 border-r border-slate-800 z-50 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-black text-white tracking-tight">NWS Portal</h2>
        <p className="text-[10px] font-bold text-sky-500 mt-1 uppercase tracking-widest">Internal Operations</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {navLinks.map(link => {
          const isActive = location.pathname === link.path || (location.pathname.startsWith(link.path) && link.path !== '/portal');
          return (
            <Link key={link.name} to={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-sky-900/40 text-sky-400' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}`}>
              <link.icon className="w-5 h-5 shrink-0" />
              <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-900">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-sm font-bold">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ST'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-slate-200 truncate text-sm">{user?.name || 'Staff'}</p>
            <p className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-widest">{user?.role || 'user'}</p>
          </div>
          <button onClick={logout} className="text-slate-500 hover:text-red-400 p-1">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
