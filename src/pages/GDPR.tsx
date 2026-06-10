import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function GDPR() {
  return (
    <div className="min-h-screen bg-bg-base text-text-base relative overflow-hidden transition-colors duration-400">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-glow blur-[140px] pointer-events-none opacity-40"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10 text-left font-sans">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sky-600 font-bold hover:underline mb-12">
          <ArrowLeft size={12} />
          <span>Back to Home</span>
        </Link>

        {/* Warning Banner */}
        <div className="border-2 border-amber-400/40 bg-amber-50 rounded-2xl p-5 mb-12 flex gap-4 items-start text-amber-800">
          <ShieldAlert size={20} className="shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-semibold">
            <span className="font-extrabold uppercase tracking-wider block mb-1">Attention Required / Legal Disclaimer</span>
            This document serves as an NWS-specific legal policy placeholder. It is not legally binding and must undergo formal review by certified legal counsel prior to public deployment.
          </div>
        </div>

        {/* GDPR Content */}
        <h1 className="text-4xl font-sans font-black tracking-tight mb-2 text-text-base">GDPR Compliance</h1>
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-10">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
          
          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">1. Our Commitment to GDPR</h3>
            <p>
              Novelty Web Solutions (NWS) is committed to protecting user privacy and complying with the General Data Protection Regulation (GDPR) requirements for European citizens. Even as a Barbadian agency, we maintain standard data privacy baselines for global users.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">2. Data Processing Roles</h3>
            <p>
              NWS acts as a **Data Controller** when handling our direct visitors' or clients' information. When deploying custom AI Employees (Nova) trained on client datasets that collect visitor contacts and transcribe calls, NWS acts as a **Data Processor** on behalf of the client.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">3. Users' Data Rights</h3>
            <p>
              Under GDPR regulations, you have rights to access, rectify, or erase your personal details. If you wish to request deletion of your information, conversation transcripts, or voice call recordings compiled on our pipelines, please email Hello@noveltywebsolutions.com.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">4. Data Retention</h3>
            <p>
              We retain customer call transcripts and qualification data only as long as necessary to sync them to the client's destination CRM or resolve active consultation tickets. Once synced or processed, logs are purged or archived securely based on client SLA parameters.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
