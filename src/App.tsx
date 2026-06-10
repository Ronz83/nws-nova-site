import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import NovAI from "./pages/NovAI";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import PricingPage from "./pages/PricingPage";
import Blog from "./pages/Blog";
import Demo from "./pages/Demo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GDPR from "./pages/GDPR";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-base text-text-base overflow-x-hidden relative">

        {/* Dot Grid Background Overlay */}
        <div className="absolute inset-0 grid-overlay opacity-[0.35] pointer-events-none"></div>

        {/* Navigation */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/"              element={<Index />} />
            <Route path="/about"         element={<About />} />
            <Route path="/services"      element={<Services />} />
            <Route path="/nova"          element={<NovAI />} />
            <Route path="/portfolio"     element={<Portfolio />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="/pricing"       element={<PricingPage />} />
            <Route path="/blog"          element={<Blog />} />
            <Route path="/blog/:slug"    element={<Blog />} />
            <Route path="/demo/:slug"    element={<Demo />} />
            <Route path="/privacy"       element={<Privacy />} />
            <Route path="/terms"         element={<Terms />} />
            <Route path="/gdpr"          element={<GDPR />} />
            <Route path="*"             element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
