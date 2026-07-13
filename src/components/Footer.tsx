import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border-base bg-transparent text-text-base px-6 pt-14 pb-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start">

          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Logo variant="dark" />
            <p className="text-sm text-text-muted leading-relaxed font-medium">
              Custom websites &amp; AI-powered operations for businesses that want to scale without growing headcount.
            </p>
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Barbados, West Indies · Global</span>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-sky-600 font-bold text-sm mb-1">Services</span>
              <Link to="/services"          className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Website Design</Link>
              <Link to="/services/samantha-ai"      className="text-text-muted hover:text-accent-deep hover:underline transition-colors">AI Voice Receptionist (Samantha)</Link>
              <Link to="/services#crm"      className="text-text-muted hover:text-accent-deep hover:underline transition-colors">CRM & Automations</Link>
              <Link to="/services#reputation" className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Reputation Mgmt</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-sky-600 font-bold text-sm mb-1">Company</span>
              <Link to="/about"      className="text-text-muted hover:text-accent-deep hover:underline transition-colors">About NWS</Link>
              <Link to="/portfolio"  className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Portfolio</Link>
              <Link to="/blog"       className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Blog</Link>
              <Link to="/contact"    className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-sky-600 font-bold text-sm mb-1">Product</span>
              <Link to="/services/samantha-ai"       className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Demo the AI Agent</Link>
              <a href="/#roi"        className="text-text-muted hover:text-accent-deep hover:underline transition-colors">ROI Calculator</a>
              <a href="/#faq"        className="text-text-muted hover:text-accent-deep hover:underline transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-[0.2em] text-sky-600 font-bold text-sm mb-1">Legal</span>
              <Link to="/privacy" className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Privacy Policy</Link>
              <Link to="/terms"   className="text-text-muted hover:text-accent-deep hover:underline transition-colors">Terms of Service</Link>
              <Link to="/gdpr"    className="text-text-muted hover:text-accent-deep hover:underline transition-colors">GDPR</Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-border-base pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted font-medium">
          <span>© {new Date().getFullYear()} Novelty Web Solutions. All rights reserved.</span>
          <span className="text-sky-600 font-bold uppercase tracking-widest">Barbados · W.I.</span>
        </div>
      </div>
    </footer>
  );
}
