import { Menu, Search, Bell, HelpCircle, LayoutGrid } from 'lucide-react';
export function DashboardTopNav() {
  return (
    <header className="fixed top-0 right-0 h-24 z-40 bg-white/92 border-b-2 border-slate-200 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 md:px-12 w-full md:w-[calc(100%-18rem)] transition-all duration-200 ease-in-out">
      {/* Left: Mobile Menu Toggle & Brand (Mobile Only) / Search (Desktop) */}
      <div className="flex items-center gap-4">
        <button aria-label="Open menu" className="md:hidden text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="md:hidden text-xl text-slate-900 font-black tracking-tight truncate max-w-[150px]">NWS OS</h2>
        
        {/* Search Input (3D Pill Style) */}
        <div className="hidden md:flex w-96 group">
          <div className="relative w-full bg-[linear-gradient(180deg,#a3d8ff_0%,#5ab2eb_48%,#1f68a6_50%,#114675_100%)] rounded-full p-2 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.4)] border border-[#0d3c66]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white transition-colors w-4 h-4 z-10 pointer-events-none drop-shadow-md" />
            <input 
              className="w-full h-10 pl-11 pr-4 bg-gradient-to-b from-[#3b4859] to-[#4f6074] rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300/50 transition-all font-medium text-sm border-t border-[#2a3644]" 
              placeholder="Search operations, contacts, or settings..." 
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Center: Navigation Links (Web Only) */}
      <nav className="hidden lg:flex items-center gap-8 h-full">
        <a aria-current="page" className="h-full flex items-center text-slate-900 font-black border-b-2 border-sky-500 text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Dashboard</a>
        <a className="h-full flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold border-b-2 border-transparent text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Reports</a>
        <a className="h-full flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold border-b-2 border-transparent text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Team</a>
      </nav>

      {/* Right: Trailing Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        <button aria-label="Notifications" className="text-sky-600/70 hover:text-sky-500 transition-colors relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <button aria-label="Help" className="text-sky-600/70 hover:text-sky-500 transition-colors p-2 hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button aria-label="Apps" className="text-sky-600/70 hover:text-sky-500 transition-colors p-2 hidden sm:block">
          <LayoutGrid className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-sky-100 mx-1 hidden sm:block"></div>
        
        <button className="relative rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold w-10 h-10 border-2 border-slate-200 hover:border-sky-500 transition-colors shrink-0 ml-2">
          JD
        </button>
      </div>
    </header>
  );
}
