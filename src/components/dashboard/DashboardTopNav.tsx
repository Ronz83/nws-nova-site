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
        
        {/* Search Input */}
        <div className="hidden md:flex relative w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors w-5 h-5" />
          <input 
            className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-0 focus:outline-none transition-all font-medium" 
            placeholder="Search operations, contacts, or settings..." 
            type="text"
          />
        </div>
      </div>

      {/* Center: Navigation Links (Web Only) */}
      <nav className="hidden lg:flex items-center gap-8 h-full">
        <a aria-current="page" className="h-full flex items-center text-sky-500 font-bold border-b-2 border-sky-500 text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Dashboard</a>
        <a className="h-full flex items-center text-slate-500 hover:text-sky-500 transition-colors font-bold border-b-2 border-transparent text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Reports</a>
        <a className="h-full flex items-center text-slate-500 hover:text-sky-500 transition-colors font-bold border-b-2 border-transparent text-[12px] uppercase tracking-[0.18em] pt-1" href="#">Team</a>
      </nav>

      {/* Right: Trailing Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        <button aria-label="Notifications" className="text-slate-500 hover:text-sky-500 transition-colors relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <button aria-label="Help" className="text-slate-500 hover:text-sky-500 transition-colors p-2 hidden sm:block">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button aria-label="Apps" className="text-slate-500 hover:text-sky-500 transition-colors p-2 hidden sm:block">
          <LayoutGrid className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        
        <button className="relative rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold w-10 h-10 border-2 border-slate-200 hover:border-sky-500 transition-colors shrink-0 ml-2">
          JD
        </button>
      </div>
    </header>
  );
}
