import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FeatureProvider } from "./contexts/FeatureContext";

import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// Dashboard Components (Client-Facing)
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview";
import { DashboardAIStudio } from "./components/dashboard/DashboardAIStudio";
import { DashboardOperations } from "./components/dashboard/DashboardOperations";
import { DashboardGrowth } from "./components/dashboard/DashboardGrowth";
import { DashboardSettings } from "./components/dashboard/DashboardSettings";
import { DashboardAutomations } from "./components/dashboard/DashboardAutomations";
import { DashboardTraining } from "./components/dashboard/DashboardTraining";
import { DashboardWebsite } from "./components/dashboard/DashboardWebsite";

// Portal Components (Internal Admin)
import { PortalLayout } from "./components/portal/PortalLayout";
import { DashboardSnapshots } from "./components/dashboard/DashboardSnapshots";
import { DashboardWebsiteRequests } from "./components/dashboard/DashboardWebsiteRequests";
import { DashboardNicheBlueprints } from "./components/dashboard/DashboardNicheBlueprints";

// Eagerly load the homepage â€” it's the first thing users see
import Index from "./pages/Index";

// Lazy-load all other pages â€” loaded on demand, not on initial bundle
const About       = lazy(() => import("./pages/About"));
const Services    = lazy(() => import("./pages/Services"));
const SamanthaAI  = lazy(() => import("./pages/SamanthaAI"));
const Portfolio   = lazy(() => import("./pages/Portfolio"));
const Contact     = lazy(() => import("./pages/Contact"));
const Blog        = lazy(() => import("./pages/Blog"));
const Demo        = lazy(() => import("./pages/Demo"));
const Privacy     = lazy(() => import("./pages/Privacy"));
const Terms       = lazy(() => import("./pages/Terms"));
const GDPR        = lazy(() => import("./pages/GDPR"));
const Book        = lazy(() => import("./pages/Book"));
const PricingRedirect = lazy(() => import("./pages/PricingRedirect"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const BusinessOS  = lazy(() => import("./pages/BusinessOS"));

// Giveaway Funnel Pages
const SmartStart     = lazy(() => import("./pages/SmartStart"));
const BusinessAudit  = lazy(() => import("./pages/BusinessAudit"));
const AIReceptionist = lazy(() => import("./pages/AIReceptionist"));
const SummerLaunch = lazy(() => import("./pages/SummerLaunch"));

// Portal Lazy Pages
const PortalOverview   = lazy(() => import("./pages/portal/PortalOverview"));
const PortalUsers      = lazy(() => import("./pages/portal/PortalUsers"));
const PortalSystem     = lazy(() => import("./pages/portal/PortalSystem"));
const PortalGHLControl = lazy(() => import("./pages/portal/PortalGHLControl"));
const PortalBusinessOS = lazy(() => import("./pages/portal/PortalBusinessOS"));
const PortalCaricom    = lazy(() => import("./pages/portal/PortalCaricom"));
const PortalLogin      = lazy(() => import("./pages/portal/PortalLogin"));
const PortalSnapshots  = lazy(() => import("./pages/portal/PortalSnapshots"));
const PortalNicheBlueprints = lazy(() => import("./pages/portal/PortalNicheBlueprints"));
const PortalFulfillment= lazy(() => import("./pages/portal/PortalFulfillment"));

// Operations
const PortalPipeline     = lazy(() => import("./pages/portal/PortalPipeline"));
const PortalActiveTools  = lazy(() => import("./pages/portal/PortalActiveTools"));
const PortalNewClient    = lazy(() => import("./pages/portal/PortalNewClient"));
const PortalAcademy      = lazy(() => import("./pages/portal/PortalAcademy"));
const PortalCallAssistant= lazy(() => import("./pages/portal/PortalCallAssistant"));

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
    <div className="min-h-screen text-text-base overflow-x-hidden relative" style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 40%, #fffbeb 100%)" }}>
      
      {/* Fixed Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)", transform: "translate(30%, 30%)" }}></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)" }}></div>
        <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const hostname = window.location.hostname;
  const isBusinessOS = hostname === 'businessesos.com' || hostname === 'www.businessesos.com';
  const isOsDomain = hostname === 'os.noveltywebsolutions.com';
  const isPortalDomain = hostname === 'portal.noveltywebsolutions.com';

  let domainRoutes;

  if (isPortalDomain) {
    domainRoutes = (
      <Routes>
        <Route path="/" element={<Navigate to="/portal" replace />} />
        <Route path="/portal/login" element={<Suspense fallback={<PageLoader />}><PortalLogin /></Suspense>} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><PortalOverview /></Suspense>} />
          <Route path="snapshots" element={<DashboardSnapshots />} />
          <Route path="niche-blueprints" element={<DashboardNicheBlueprints />} />
          <Route path="fulfillment" element={<DashboardWebsiteRequests />} />
          <Route path="ghl-control" element={<Suspense fallback={<PageLoader />}><PortalGHLControl /></Suspense>} />
          <Route path="users" element={<Suspense fallback={<PageLoader />}><PortalUsers /></Suspense>} />
          <Route path="system" element={<Suspense fallback={<PageLoader />}><PortalSystem /></Suspense>} />
          <Route path="business-os" element={<Suspense fallback={<PageLoader />}><PortalBusinessOS /></Suspense>} />
          <Route path="caricom-business" element={<Suspense fallback={<PageLoader />}><PortalCaricom /></Suspense>} />
          
          <Route path="snapshots" element={<Suspense fallback={<PageLoader />}><PortalSnapshots /></Suspense>} />
          <Route path="niche-blueprints" element={<Suspense fallback={<PageLoader />}><PortalNicheBlueprints /></Suspense>} />
          <Route path="fulfillment" element={<Suspense fallback={<PageLoader />}><PortalFulfillment /></Suspense>} />
          
          <Route path="pipeline" element={<Suspense fallback={<PageLoader />}><PortalPipeline /></Suspense>} />
          <Route path="tools" element={<Suspense fallback={<PageLoader />}><PortalActiveTools /></Suspense>} />
          <Route path="new-client" element={<Suspense fallback={<PageLoader />}><PortalNewClient /></Suspense>} />
          <Route path="academy" element={<Suspense fallback={<PageLoader />}><PortalAcademy /></Suspense>} />
          <Route path="call-assistant" element={<Suspense fallback={<PageLoader />}><PortalCallAssistant /></Suspense>} />
        </Route>
        <Route path="*" element={<Navigate to="/portal" replace />} />
      </Routes>
    );
  } else if (isOsDomain) {
    domainRoutes = (
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="ai-studio" element={<DashboardAIStudio />} />
          <Route path="operations" element={<DashboardOperations />} />
          <Route path="growth" element={<DashboardGrowth />} />
          <Route path="automations" element={<DashboardAutomations />} />
          <Route path="training" element={<DashboardTraining />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="website" element={<DashboardWebsite />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  } else if (isBusinessOS) {
    domainRoutes = (
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><BusinessOS /></Suspense>} />
          <Route path="/book" element={<Suspense fallback={<PageLoader />}><Book /></Suspense>} />
          <Route path="/pricing" element={<Suspense fallback={<PageLoader />}><PricingRedirect target="/#pricing" /></Suspense>} />
          <Route path="/smart-start" element={<Suspense fallback={<PageLoader />}><SmartStart /></Suspense>} />
          <Route path="/ai-receptionist" element={<Suspense fallback={<PageLoader />}><AIReceptionist /></Suspense>} />
          <Route path="/business-audit" element={<Suspense fallback={<PageLoader />}><BusinessAudit /></Suspense>} />
          <Route path="/demo/:slug" element={<Demo />} />
          <Route path="/results/:id" element={<ResultsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    // Default (noveltywebsolutions.com and localhost)
    domainRoutes = (
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<Suspense fallback={<PageLoader />}><Book /></Suspense>} />
          <Route path="/pricing" element={<Suspense fallback={<PageLoader />}><PricingRedirect target="/services/business-os#pricing" /></Suspense>} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          
          <Route path="/services" element={<Services />} />
          <Route path="/services/samantha-ai" element={<SamanthaAI />} />
          <Route path="/services/business-os" element={<Suspense fallback={<PageLoader />}><BusinessOS /></Suspense>} />
          
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/demo/:slug" element={<Demo />} />
          <Route path="/results/:id" element={<ResultsPage />} />
        </Route>
        <Route path="/promo1" element={<Suspense fallback={<PageLoader />}><SummerLaunch /></Suspense>} />

        <Route path="/portal/login" element={<Suspense fallback={<PageLoader />}><PortalLogin /></Suspense>} />
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><PortalOverview /></Suspense>} />
          <Route path="snapshots" element={<Suspense fallback={<PageLoader />}><PortalSnapshots /></Suspense>} />
          <Route path="niche-blueprints" element={<Suspense fallback={<PageLoader />}><PortalNicheBlueprints /></Suspense>} />
          <Route path="fulfillment" element={<Suspense fallback={<PageLoader />}><PortalFulfillment /></Suspense>} />
          <Route path="ghl-control" element={<Suspense fallback={<PageLoader />}><PortalGHLControl /></Suspense>} />
          <Route path="users" element={<Suspense fallback={<PageLoader />}><PortalUsers /></Suspense>} />
          <Route path="system" element={<Suspense fallback={<PageLoader />}><PortalSystem /></Suspense>} />
          <Route path="business-os" element={<Suspense fallback={<PageLoader />}><PortalBusinessOS /></Suspense>} />
          <Route path="caricom-business" element={<Suspense fallback={<PageLoader />}><PortalCaricom /></Suspense>} />
          
          <Route path="pipeline" element={<Suspense fallback={<PageLoader />}><PortalPipeline /></Suspense>} />
          <Route path="tools" element={<Suspense fallback={<PageLoader />}><PortalActiveTools /></Suspense>} />
          <Route path="new-client" element={<Suspense fallback={<PageLoader />}><PortalNewClient /></Suspense>} />
          <Route path="academy" element={<Suspense fallback={<PageLoader />}><PortalAcademy /></Suspense>} />
          <Route path="call-assistant" element={<Suspense fallback={<PageLoader />}><PortalCallAssistant /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthProvider>
      <FeatureProvider>
          <Router>
            {domainRoutes}
          </Router>
      </FeatureProvider>
    </AuthProvider>
  );
}
