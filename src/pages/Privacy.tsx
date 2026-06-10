import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
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

        {/* Policy Content */}
        <h1 className="text-4xl font-sans font-black tracking-tight mb-2 text-text-base">Privacy Policy</h1>
        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-10">Last updated: June 10, 2026</p>

        <div className="space-y-8 text-xs sm:text-sm text-text-muted leading-relaxed font-semibold">
          
          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">1. Information We Collect</h3>
            <p>
              At Novelty Web Solutions (NWS), we collect information that you directly provide to us when using our website, submitting booking queries, interacting with our Nova AI receptionist (both voice and chat formats), or requesting consultative setups. This includes names, phone numbers, email addresses, business details, and site domain URLs.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">2. How We Use Your Data</h3>
            <p>
              We use the collected data exclusively to compile customized AI employees, analyze client domain assets, sync contacts to target CRMs (HubSpot, Salesforce, or GHL), process consultation requests, and reply to client inquiries. We do not sell or rent customer data to third-party brokers.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">3. AI Conversation Logs & Recording</h3>
            <p>
              When interacting with the Nova AI receptionist or chat widgets, conversation logs, microphone audio, and transcripts are recorded for quality assurance, semantic prompt tuning, and database mapping. We maintain these data assets on secure pipelines. By utilizing these tools, you consent to this monitoring and processing.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">4. Security Measures</h3>
            <p>
              NWS utilizes industry-standard security protocols to safeguard database systems and API connection keys. However, no database transmission over the internet can be guaranteed to be 100% secure. You acknowledge that you provide your personal details at your own risk.
            </p>
          </section>

          <section>
            <h3 className="text-base sm:text-lg font-black text-text-base mb-3 font-sans">5. Contact Information</h3>
            <p>
              If you have any questions regarding NWS's data handling protocols or this placeholder policy, please contact our team at hello@noveltywebsolutions.com.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
