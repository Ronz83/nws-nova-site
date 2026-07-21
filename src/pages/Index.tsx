import { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ROICalculator from "../components/ROICalculator";

import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import SignupModal from "../components/SignupModal";
import AppMarketplace from "../components/AppMarketplace";

export default function Index() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleOpenBooking = () => {
    window.open("https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call", "_blank", "noopener,noreferrer");
  };

  const handleOpenSignup = () => {
    setIsSignupOpen(true);
  };

  return (
    <div className="relative">
      {/* Home Sections */}
      <Hero onSignUp={handleOpenSignup} />
      
      <Features />
      
      <HowItWorks />
      
      {/* Live Demo sandbox workbench */}
      {/* LiveDemo removed - Vapi deprecated */}
<ROICalculator onBookDemo={handleOpenBooking} />
      
      {/* Consultation CTA */}
      <section className="py-24 px-6 border-t border-border-base bg-bg-tint">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Custom Engagements</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Every engagement starts with a conversation.
          </h2>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            We don't do one-size-fits-all. Book a free 30-minute strategy call and we'll map exactly what your business needs.
          </p>
          <button
            onClick={handleOpenBooking}
            className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md transition-all duration-200"
          >
            Book Free Consultation
          </button>
        </div>
      </section>
      
      <AppMarketplace />

      <FAQ />
      
      <CTA />

      {/* Modals */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  );
}
