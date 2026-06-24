import { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import LiveDemo from "../components/LiveDemo";
import ROICalculator from "../components/ROICalculator";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import BookingModal from "../components/BookingModal";
import SignupModal from "../components/SignupModal";
import AppMarketplace from "../components/AppMarketplace";

export default function Index() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="relative">
      {/* Home Sections */}
      <Hero onBookDemo={handleOpenBooking} />
      
      <Features />
      
      <HowItWorks />
      
      {/* Live Demo sandbox workbench */}
      <LiveDemo />
      
      <ROICalculator onBookDemo={handleOpenBooking} />
      
      {/* New Consultative Pricing Plans */}
      <Pricing onBookDemo={handleOpenBooking} onSignUp={() => setIsSignupOpen(true)} />
      
      <AppMarketplace onBookDemo={handleOpenBooking} />

      <FAQ />
      
      <CTA onBookDemo={handleOpenBooking} />

      {/* Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  );
}
