import { useState } from "react";
import { Menu, X, Workflow, BookOpen, Briefcase, Mail } from "lucide-react";
import Logo from "./Logo";
import BookingModal from "./BookingModal";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Business OS", href: "https://businessesos.com", icon: <Workflow size={14} />, external: true },
  { label: "Portfolio", href: "/portfolio", icon: <Briefcase size={14} /> },
  { label: "Blog",      href: "/blog",      icon: <BookOpen size={14} /> },
  { label: "About",     href: "/about",     icon: null },
  { label: "Contact",   href: "/contact",   icon: <Mail size={14} /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border-base bg-glass-bg backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center focus:outline-none" onClick={() => { setMobileOpen(false); }}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
                <div key={item.label} className="relative">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm uppercase tracking-[0.12em] font-bold transition-all duration-200 text-text-muted hover:text-text-base hover:bg-slate-50 dark:hover:bg-slate-800`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm uppercase tracking-[0.12em] font-bold transition-all duration-200 ${isActive(item.href) ? "text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30" : "text-text-muted hover:text-text-base hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsBookingOpen(true)}
              className="text-sm uppercase tracking-[0.15em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer border-none hover:scale-[1.02]"
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex lg:hidden p-2.5 text-text-base hover:bg-slate-100 rounded-xl border border-border-base cursor-pointer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border-base bg-white max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col p-5 gap-1">
              {navItems.map(item => (
                <div key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] transition-all text-text-muted hover:text-text-base hover:bg-slate-50 dark:hover:bg-slate-800`}
                    >
                      {item.icon && <span className="text-text-muted">{item.icon}</span>}
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] transition-all ${isActive(item.href) ? "text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30" : "text-text-muted hover:text-text-base hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                      {item.icon && <span className="text-text-muted">{item.icon}</span>}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <button
                onClick={() => { setMobileOpen(false); setIsBookingOpen(true); }}
                className="w-full mt-3 bg-accent-deep text-white font-bold uppercase tracking-[0.18em] text-sm rounded-xl py-4 cursor-pointer border-none shadow-md"
              >
                Book a Strategy Call
              </button>
            </nav>
          </div>
        )}
      </header>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
