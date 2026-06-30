import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FeatureProvider } from "./contexts/FeatureContext";

import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SamanthaProvider } from "./context/SamanthaContext";
import { GlobalSamantha } from "./components/samantha/GlobalSamantha";

// Dashboard Components
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { DashboardAIStudio } from "./components/dashboard/DashboardAIStudio";
import { DashboardOperations } from "./components/dashboard/DashboardOperations";
import { DashboardGrowth } from "./components/dashboard/DashboardGrowth";
import { DashboardSettings } from "./components/dashboard/DashboardSettings";
import { DashboardAutomations } from "./components/dashboard/DashboardAutomations";
import { DashboardTraining } from "./components/dashboard/DashboardTraining";
import { DashboardSnapshots } from "./components/dashboard/DashboardSnapshots";
import { DashboardWebsite } from "./components/dashboard/DashboardWebsite";
import { DashboardWebsiteRequests } from "./components/dashboard/DashboardWebsiteRequests";
import { DashboardNicheBlueprints } from "./components/dashboard/DashboardNicheBlueprints";

// Eagerly load the homepage — it's the first thing users see
import Index from "./pages/Index";

// Lazy-load all other pages — loaded on demand, not on initial bundle
const About       = lazy(() => import("./pages/About"));
const Services    = lazy(() => import("./pages/Services"));
const SamanthaAI  = lazy(() => import("./pages/SamanthaAI"));
const Portfolio   = lazy(() => import("./pages/Portfolio"));
const Contact     = lazy(() => import("./pages/Contact"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const Blog        = lazy(() => import("./pages/Blog"));
const Demo        = lazy(() => import("./pages/Demo"));
const Privacy     = lazy(() => import("./pages/Privacy"));
const Terms       = lazy(() => import("./pages/Terms"));
const GDPR        = lazy(() => import("./pages/GDPR"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const BusinessOS  = lazy(() => import("./pages/BusinessOS"));
const KBTestPage  = lazy(() => import("./pages/KBTestPage"));

// Minimal page loader shown during lazy-load transitions
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        <span className="text-sm uppercase tracking-widest text-text-muted font-bold">Loading</span>
      </div>
    </div>
  );
}

// Layout for the main public website (includes Nav, Footer, and Samantha)
function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg-base text-text-base overflow-x-hidden relative">
      <div className="absolute inset-0 grid-overlay opacity-[0.35] pointer-events-none"></div>
      <Navbar />
      <main className="relative z-10">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <GlobalSamantha />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FeatureProvider>
        <SamanthaProvider>
          <Router>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Blog />} />
                
                <Route path="/services" element={<Services />} />
                <Route path="/services/samantha-ai" element={<SamanthaAI />} />
                <Route path="/services/business-os" element={<BusinessOS />} />
                
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/gdpr" element={<GDPR />} />
                
                <Route path="/demo/:slug" element={<Demo />} />
                <Route path="/results/:id" element={<ResultsPage />} />
              </Route>

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="ai-studio" element={<DashboardAIStudio />} />
                <Route path="operations" element={<DashboardOperations />} />
                <Route path="growth" element={<DashboardGrowth />} />
                <Route path="automations" element={<DashboardAutomations />} />
                <Route path="training" element={<DashboardTraining />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="snapshots" element={<DashboardSnapshots />} />
                <Route path="website" element={<DashboardWebsite />} />
                <Route path="website-requests" element={<DashboardWebsiteRequests />} />
                <Route path="niche-blueprints" element={<DashboardNicheBlueprints />} />
              </Route>

              <Route path="/kb-test" element={
                <div className="p-8">
                  <Suspense fallback={<PageLoader />}>
                    <KBTestPage />
                  </Suspense>
                </div>
              } />
            </Routes>
          </Router>
        </SamanthaProvider>
      </FeatureProvider>
    </AuthProvider>
  );
}
