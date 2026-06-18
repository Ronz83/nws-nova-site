import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
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

        {/* Terms Content */}
        <h1 className="text-4xl font-sans font-black tracking-tight mb-2 text-text-base">Terms of Service</h1>
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-10">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
          
          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">1. Scope of Service</h3>
            <p>
              Novelty Web Solutions (NWS) provides bespoke website design, CRM automation pipelines, and custom conversational AI employee (Samantha) nodes. Setup build fees and monthly subscriptions are governed by individualized service agreements signed upon booking confirmation.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">2. Fees and Subscriptions</h3>
            <p>
              Subscription pricing plans (e.g. Solo Operations at $299/month, Business Operations at $599/month) are subject to one-time setup and build fees. Setup fees are non-refundable once custom semantic ingestion or asset design has commenced.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">3. AI Agent Behavior and Output Limitations</h3>
            <p>
              While NWS AI employees are pre-trained on your specific business rules, guidelines, and catalogs, AI conversational outputs can occasionally produce inaccuracies. NWS does not accept liability for business decisions, commitments, or pricing errors made by the AI receptionist during customer calls or chat sessions. It is the client's responsibility to periodically review logs and keep the semantic knowledge base updated.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">4. Acceptable Use Policy</h3>
            <p>
              Clients may not utilize NWS sites, CRM nodes, or voice receptionists to distribute spam, make unsolicited outbound cold voice campaigns violating local telecommunication laws, or ingest malicious software. NWS reserves the right to suspend any workspace that violates these conditions.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">5. Jurisdiction</h3>
            <p>
              These terms are governed by and construed in accordance with the laws of Barbados. Any disputes arising out of the services rendered shall be handled exclusively in Barbadian courts.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
