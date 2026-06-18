import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SamanthaProvider } from "./context/SamanthaContext";
import { GlobalSamantha } from "./components/samantha/GlobalSamantha";

// Eagerly load the homepage — it's the first thing users see
import Index from "./pages/Index";

// Lazy-load all other pages — loaded on demand, not on initial bundle
const About       = lazy(() => import("./pages/About"));
const Services    = lazy(() => import("./pages/Services"));
const SamanthaAI       = lazy(() => import("./pages/SamanthaAI"));
const Portfolio   = lazy(() => import("./pages/Portfolio"));
const Contact     = lazy(() => import("./pages/Contact"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const Blog        = lazy(() => import("./pages/Blog"));
const Demo        = lazy(() => import("./pages/Demo"));
const Privacy     = lazy(() => import("./pages/Privacy"));
const Terms       = lazy(() => import("./pages/Terms"));
const GDPR        = lazy(() => import("./pages/GDPR"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));

// Minimal page loader shown during lazy-load transitions
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Loading</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SamanthaProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg-base text-text-base overflow-x-hidden relative">

          {/* Dot Grid Background Overlay */}
          <div className="absolute inset-0 grid-overlay opacity-[0.35] pointer-events-none"></div>

          {/* Navigation */}
          <Navbar />

          {/* Main Routed Content */}
          <main className="relative z-10">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"           element={<Index />} />
                <Route path="/about"      element={<About />} />
                <Route path="/services"   element={<Services />} />
                <Route path="/samantha"       element={<SamanthaAI />} />
                <Route path="/portfolio"  element={<Portfolio />} />
                <Route path="/contact"    element={<Contact />} />
                <Route path="/pricing"    element={<PricingPage />} />
                <Route path="/blog"       element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
                <Route path="/demo/:slug" element={<Demo />} />
                <Route path="/privacy"    element={<Privacy />} />
                <Route path="/terms"      element={<Terms />} />
                <Route path="/gdpr"       element={<GDPR />} />
                <Route path="/results/:id" element={<ResultsPage />} />
                <Route path="*"          element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />

          <GlobalSamantha />
        </div>
      </BrowserRouter>
    </SamanthaProvider>
  );
}
