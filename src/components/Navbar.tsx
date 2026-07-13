import { useState } from "react";
import { Menu, X, ChevronDown, Phone, Layers, Database, Workflow, BookOpen, Briefcase, Mail } from "lucide-react";
import Logo from "./Logo";
import BookingModal from "./BookingModal";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Website Design",    href: "/services#web-design",   icon: <Layers size={15} />,   desc: "Custom-coded, conversion-first sites" },
      { label: "AI Voice Receptionist",   href: "/services/samantha-ai",                  icon: <Phone size={15} />,    desc: "24/7 voice receptionist" },
      { label: "CRM & Automations", href: "/services#crm",          icon: <Database size={15} />, desc: "Consolidate your customer ops" },
      { label: "Reputation Mgmt",   href: "/services#reputation",   icon: <Workflow size={15} />, desc: "Google & Facebook reviews AI" },
    ],
  },
  { label: "Business OS", href: "/services/business-os", icon: <Workflow size={14} /> },
  { label: "Portfolio", href: "/portfolio", icon: <Briefcase size={14} /> },
  { label: "Blog",      href: "/blog",      icon: <BookOpen size={14} /> },
  { label: "About",     href: "/about",     icon: null },
  { label: "Contact",   href: "/contact",   icon: <Mail size={14} /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openDropdown, setOpenDropdown]  = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border-base bg-glass-bg backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center focus:outline-none" onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              let timeoutRef: ReturnType<typeof setTimeout>;

              const handleMouseEnter = () => {
                clearTimeout(timeoutRef);
                if (item.dropdown) setOpenDropdown(item.label);
              };

              const handleMouseLeave = () => {
                timeoutRef = setTimeout(() => {
                  setOpenDropdown(null);
                }, 150); // 150ms debounce
              };

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown ? (
                    <>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm uppercase tracking-[0.12em] font-bold transition-all duration-200 ${isActive(item.href) ? "text-sky-700 bg-sky-50" : "text-text-muted hover:text-text-base hover:bg-slate-50"}`}
                      >
                        {item.label}
                        <ChevronDown size={11} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                      </Link>

                      {/* Dropdown with hover bridge */}
                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 pt-2 w-64 z-50">
                          <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-xl p-2">
                            {item.dropdown.map(d => (
                              <Link
                                key={d.label}
                                to={d.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 hover:text-sky-700 transition-all group"
                              >
                                <div className="p-1.5 bg-slate-100 rounded-lg text-text-muted group-hover:bg-sky-100 group-hover:text-sky-600 transition-all shrink-0 mt-0.5">
                                  {d.icon}
                                </div>
                                <div>
                                  <div className="text-sm font-black text-text-base group-hover:text-sky-700 transition-colors">{d.label}</div>
                                  <div className="text-sm text-text-muted font-medium mt-0.5">{d.desc}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm uppercase tracking-[0.12em] font-bold transition-all duration-200 ${isActive(item.href) ? "text-sky-700 bg-sky-50" : "text-text-muted hover:text-text-base hover:bg-slate-50"}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
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
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.15em] transition-all ${isActive(item.href) ? "text-sky-700 bg-sky-50" : "text-text-muted hover:text-text-base hover:bg-slate-50"}`}
                  >
                    {item.icon && <span className="text-text-muted">{item.icon}</span>}
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {item.dropdown.map(d => (
                        <Link
                          key={d.label}
                          to={d.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm uppercase tracking-[0.15em] font-bold text-text-muted/70 hover:text-sky-600 hover:bg-sky-50 transition-all"
                        >
                          {d.icon} {d.label}
                        </Link>
                      ))}
                    </div>
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
