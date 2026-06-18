import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border-base bg-slate-900 text-slate-300 px-6 pt-14 pb-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo variant="light" />
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Custom websites &amp; AI-powered operations for businesses that want to scale without growing headcount.
            </p>
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">Barbados, West Indies · Global</span>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-slate-500 font-bold text-[9px] mb-1">Services</span>
              <Link to="/services"          className="hover:text-white transition-colors">Website Design</Link>
              <Link to="/samantha"              className="hover:text-white transition-colors">AI Voice (Samantha)</Link>
              <Link to="/services#crm"      className="hover:text-white transition-colors">CRM & Automations</Link>
              <Link to="/services#reputation" className="hover:text-white transition-colors">Reputation Mgmt</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-slate-500 font-bold text-[9px] mb-1">Company</span>
              <Link to="/about"      className="hover:text-white transition-colors">About NWS</Link>
              <Link to="/portfolio"  className="hover:text-white transition-colors">Portfolio</Link>
              <Link to="/blog"       className="hover:text-white transition-colors">Blog</Link>
              <Link to="/contact"    className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-slate-500 font-bold text-[9px] mb-1">Product</span>
              <Link to="/samantha"       className="hover:text-white transition-colors">Meet Samantha</Link>
              <Link to="/pricing"    className="hover:text-white transition-colors">Pricing</Link>
              <a href="/#roi"        className="hover:text-white transition-colors">ROI Calculator</a>
              <a href="/#faq"        className="hover:text-white transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-slate-500 font-bold text-[9px] mb-1">Legal</span>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/gdpr"    className="hover:text-white transition-colors">GDPR</Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-medium">
          <span>© {new Date().getFullYear()} Novelty Web Solutions. All rights reserved.</span>
          <span className="text-sky-600 font-bold uppercase tracking-widest">Barbados · W.I.</span>
        </div>
      </div>
    </footer>
  );
}
