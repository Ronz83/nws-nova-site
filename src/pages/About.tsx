import { useState } from "react";
import { Compass, Sparkles, MapPin, Calendar, Heart, Shield, Cpu } from "lucide-react";
import BookingModal from "../components/BookingModal";

export default function About() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-text-base relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-100 blur-[160px] pointer-events-none opacity-70"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-amber-50 blur-[180px] pointer-events-none opacity-80"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">

        {/* Page Hero Header */}
        <div className="text-left max-w-3xl mb-20 font-sans">
          <div className="inline-flex items-center gap-2 border border-sky-200 bg-sky-50 px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold text-sky-700 mb-6 select-none shadow-sm">
            <Compass size={11} className="text-sky-500" />
            <span>Company Profile / Vision</span>
          </div>

          <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02] text-text-base">
            Bridging the gap between <span className="italic font-normal text-accent-primary">innovation</span> and execution.
          </h1>

          <p className="mt-6 text-sm sm:text-base text-text-muted leading-relaxed font-medium max-w-2xl">
            Novelty Web Solutions is a premium digital transformation agency based in Barbados. We engineer conversion-focused web frontends and deploy autonomous AI operations systems that enable modern organizations to scale.
          </p>
        </div>

        {/* Mission Statement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
          <div className="lg:col-span-4 text-left">
            <span className="text-[10px] uppercase tracking-widest text-sky-600 font-bold font-mono">Our Purpose</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-text-base mt-2 font-sans">
              Our Mission
            </h2>
            <p className="text-xs text-text-muted mt-3 font-medium leading-relaxed">
              The conviction that drives every website we build and every AI system we deploy.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 text-left hover:shadow-lg hover:border-sky-100 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 blur-3xl rounded-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-50 blur-2xl rounded-full pointer-events-none"></div>
              <p className="text-base sm:text-lg text-text-muted leading-relaxed font-medium relative z-10">
                At Novelty Web Solutions, we believe every business — regardless of size — should have access to{" "}
                <span className="text-text-base font-bold">enterprise-level technology without enterprise-level complexity.</span>
                {" "}We bridge the gap between innovation and execution by delivering intelligent websites, AI employees,
                automation systems, and growth-focused digital solutions that help businesses work faster, serve
                customers better, and unlock new opportunities across the Caribbean and beyond.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Novelty Web Solutions · Barbados, W.I.</span>
              </div>
            </div>
          </div>
        </div>

        {/* NWS Story & Caribbean Context */}
        <div className="border-t-2 border-border-base pt-24 mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 text-left font-sans">

          <div className="flex flex-col gap-6">
            <div className="p-3 bg-sky-50 border border-sky-100 rounded-2xl w-fit shadow-sm">
              <MapPin size={20} className="text-sky-600" />
            </div>
            <h3 className="text-2xl font-black text-text-base tracking-tight">Caribbean Regional Focus</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              Rooted in Barbados, West Indies, NWS was established to catalyze digital growth across the Caribbean region. While local enterprises have traditionally faced high barriers to adopting custom software, we deploy pre-configured systems that require no local development teams.
            </p>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              Our voice nodes run on optimized low-latency pathways, giving Caribbean businesses the same high-end conversational reception capabilities enjoyed by Silicon Valley tech startups.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl w-fit shadow-sm">
              <Cpu size={20} className="text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-text-base tracking-tight">Why We Engineered Nova</h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              Most businesses spend thousands of dollars a month trying to duct-tape together calendars, CRMs, chat widgets, and virtual assistants. This is expensive and fragile.
            </p>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-medium">
              Nova is our answers-it-all AI employee. It qualifies inbound phone leads, answers instant FAQs, books strategy calls, and synchronizes the entire database in real-time — removing the technical complexity entirely.
            </p>
          </div>

        </div>

        {/* Founder & Team Section */}
        <div className="border-t-2 border-border-base pt-24 mb-24 text-left font-sans">
          <span className="text-[10px] uppercase tracking-widest text-sky-600 font-bold font-mono">The Architects</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-base mt-2 mb-12">
            Led by Ronald P.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg hover:border-sky-100 transition-all duration-300">
              <div className="text-sky-500 mb-6">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-text-base mb-2">Bespoke Quality</h4>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  We don't use generic Webflow or WordPress templates. Every frontend is natively coded for speed, accessibility, and pixel-perfect responsiveness.
                </p>
              </div>
            </div>

            <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg hover:border-sky-100 transition-all duration-300">
              <div className="text-emerald-500 mb-6">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-text-base mb-2">Clinical Security</h4>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  Client databases, caller records, and chat transcripts are protected via high-security SSL pipelines and strict access controls.
                </p>
              </div>
            </div>

            <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg hover:border-amber-100 transition-all duration-300">
              <div className="text-amber-500 mb-6">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-text-base mb-2">Dynamic Adaptability</h4>
                <p className="text-xs text-text-muted leading-relaxed font-medium">
                  Our custom agents adapt to new product launches, business information, or staff adjustments instantly via semantic vector retraining.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action Banner — Ocean Gradient */}
        <div className="bg-ocean-gradient border border-sky-900 rounded-[32px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-sky-400/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-400/15 blur-3xl rounded-full pointer-events-none"></div>

          <h3 className="text-3xl md:text-4xl font-sans font-light tracking-tight leading-none">
            Ready to experience next-gen <span className="italic font-normal text-amber-300">operations?</span>
          </h3>
          <p className="mt-4 text-xs md:text-sm text-sky-100 max-w-xl mx-auto leading-relaxed font-medium">
            See Nova in action and consult with Ronald on a custom digital strategy for your business.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-white hover:bg-sky-50 text-sky-800 font-black uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-none font-sans"
            >
              <Calendar size={14} className="text-sky-600" />
              <span>See Nova in Action</span>
            </button>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
