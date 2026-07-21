import { useState, useEffect } from 'react';
import {
  Globe,
  Calendar,
  Phone,
  MessageSquare,
  Shield,
  Users,
  Star,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Loader2,
} from 'lucide-react';
import { redirectToCheckout } from "../lib/stripe";
import { PRICING_TIERS } from "../config/pricing";
import WorkbenchWizard from "../components/workbench/WorkbenchWizard";

const endDate = new Date('2026-08-19T23:59:59-04:00');

// Color tokens — no Tailwind color classes used anywhere
const C = {
  bg: '#080f1e',
  bg2: '#0c1a2e',
  panel: '#0f172a',
  panel2: '#111d31',
  panel3: '#1e293b',
  line: 'rgba(255,255,255,0.11)',
  lineStrong: '#334155',
  white: '#ffffff',
  muted: '#94a3b8',
  soft: '#cbd5e1',
  slate300: '#e2e8f0',
  cyan: '#0ea5e9',
  cyanLight: '#38bdf8',
  emerald: '#10B981',
  yellow: '#facc15',
  yellowDark: '#f59e0b',
  danger: '#f87171',
};

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function update() {
      const diff = endDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const itemStyle: React.CSSProperties = {
    minWidth: 72, borderRadius: 14, background: 'rgba(255,255,255,0.06)',
    border: `1px solid rgba(255,255,255,0.12)`, textAlign: 'center', padding: '12px 10px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 0 }}>
      {[
        { num: timeLeft.days, label: 'Days' },
        { num: timeLeft.hours, label: 'Hours' },
        { num: timeLeft.mins, label: 'Mins' },
        { num: timeLeft.secs, label: 'Secs' },
      ].map((item) => (
        <div key={item.label} style={itemStyle}>
          <div style={{ color: C.cyanLight, fontSize: 26, fontWeight: 900 }}>{item.num}</div>
          <div style={{ color: C.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

interface FeatureItem {
  icon: React.FC<{ size?: number; color?: string }>;
  title: string;
  desc: string;
}

const features: FeatureItem[] = [
  { icon: Globe, title: 'Smart Website Design', desc: 'Modern, mobile-friendly pages that help visitors understand your value and take action.' },
  { icon: Calendar, title: 'Integrated Booking System', desc: 'Give customers a simple way to request appointments, consultations, or next steps.' },
  { icon: Phone, title: 'AI Receptionist', desc: 'Answer common questions, capture details, and route enquiries using approved information.' },
  { icon: Shield, title: 'Reputation Management', desc: 'Request reviews, strengthen trust, and make good customer experiences easier to see.' },
  { icon: MessageSquare, title: 'Unified Messaging Inbox', desc: 'Bring WhatsApp, website, email, and social messages into a cleaner follow-up process.' },
  { icon: Users, title: 'Free Business Listing', desc: 'Get listed on CaricomBusiness.com so more regional buyers can discover your business.' },
];

const problems = [
  { title: 'Missed leads after hours', desc: 'You lose potential customers while your team is unavailable.' },
  { title: 'Slow replies across channels', desc: 'Delayed responses across WhatsApp, website, and social media cost trust.' },
  { title: 'Scattered conversations', desc: 'It is hard to track messages when every platform becomes its own little island.' },
  { title: 'No clear follow-up process', desc: 'Leads go quiet without a system to remind, route, and nurture them.' },
  { title: 'Weak online presence', desc: 'Your website and profiles may be underselling the business before you speak to anyone.' },
];

const steps = [
  { num: '01', title: 'Attract', desc: 'Build a stronger online presence with a modern website and regional listing.' },
  { num: '02', title: 'Capture', desc: 'Turn visits, messages, and calls into trackable enquiries and next steps.' },
  { num: '03', title: 'Respond', desc: 'Use AI and automation to provide fast, approved responses to common questions.' },
  { num: '04', title: 'Convert', desc: 'Route, follow up, book, and keep opportunities visible until the right team member acts.' },
];

const industries = [
  { icon: '🚗', name: 'Automotive' },
  { icon: '🏗️', name: 'Construction' },
  { icon: '🎓', name: 'Education' },
  { icon: '💰', name: 'Financial Services' },
  { icon: '🏥', name: 'Healthcare' },
  { icon: '🏨', name: 'Hospitality' },
  { icon: '🛡️', name: 'Insurance' },
  { icon: '⚖️', name: 'Legal & Accounting' },
  { icon: '🏭', name: 'Manufacturing' },
  { icon: '🏠', name: 'Real Estate' },
  { icon: '🛍️', name: 'Retail' },
  { icon: '💼', name: 'Professional Services' },
];

const faqs = [
  { q: 'What exactly is included?', a: 'The bundle includes smart website design, integrated booking, AI receptionist, reputation management, unified messaging, and a free business listing on CaricomBusiness.com.' },
  { q: 'Does AI replace my team?', a: 'No. The system handles approved first responses, intake, routing, and follow-up. Human decisions, service delivery, and sensitive conversations remain with your team.' },
  { q: 'What does the system review cover?', a: 'We map one real enquiry journey for your business, show where response or follow-up can break down, and demonstrate how the connected NWS workflow handles it.' },
  { q: 'What is the founder plan price?', a: 'The founder plan is $297 USD monthly, or $2,970 USD annually, which gives you two months free.' },
];

export default function SummerLaunch() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const checkoutSuccess = new URLSearchParams(window.location.search).get('checkout') === 'success';
  const checkoutTier = new URLSearchParams(window.location.search).get('tier');

  const handleCheckout = async (tierId: string) => {
    setLoading(tierId);
    try {
      const tier = PRICING_TIERS.find(t => t.id === tierId);
      if (!tier) throw new Error("Tier not found");
      const priceId = isYearly ? tier.stripeYearly : tier.stripeMonthly;
      await redirectToCheckout(priceId, undefined, undefined, tierId);
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Please try again or contact support.");
    } finally {
      setLoading(null);
    }
  };

  // Button styles
  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    minHeight: 52, padding: '0 22px', borderRadius: 14, textDecoration: 'none',
    fontWeight: 900, fontSize: 15, border: '1px solid transparent',
    background: `linear-gradient(135deg, ${C.cyan}, #0284c7)`, color: C.white,
    boxShadow: '0 16px 50px rgba(14,165,233,0.3)', cursor: 'pointer',
    transition: 'transform .2s ease, box-shadow .2s ease',
  };
  const btnSecondary: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    minHeight: 52, padding: '0 22px', borderRadius: 14, textDecoration: 'none',
    fontWeight: 900, fontSize: 15, border: '1px solid rgba(255,255,255,0.16)',
    background: 'rgba(255,255,255,0.055)', color: C.white,
    cursor: 'pointer', transition: 'transform .2s ease, background .2s ease, border-color .2s ease',
  };
  const cardBase: React.CSSProperties = {
    background: `linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))`,
    border: `1px solid ${C.line}`, borderRadius: 20,
    boxShadow: '0 12px 35px rgba(0,0,0,0.16)',
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(to bottom, ${C.bg}, ${C.bg2} 38%, ${C.bg})`, fontFamily: "'Open Sans', Arial, sans-serif", color: C.white }}>
      {/* Animated Top Banner */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, background: `linear-gradient(180deg, ${C.yellow}, ${C.yellowDark})`, color: '#08111f', borderBottom: '1px solid rgba(0,0,0,0.12)', boxShadow: '0 8px 24px rgba(245,158,11,0.18)', overflow: 'hidden', height: 36, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', animation: 'scrollBanner 20s linear infinite', width: 'max-content' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 24px' }}>
              NWS Summer Launch Founder Plan — Enrollment closes when the launch period ends
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes scrollBanner { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

      {/* Nav */}
      <div style={{ position: 'sticky', top: 35, zIndex: 35, backdropFilter: 'blur(18px)', background: 'rgba(8,15,30,0.68)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
          <a href="https://noveltywebsolutions.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', minWidth: 230 }}>
            <img src="/assets/nws-logo.png" alt="Novelty Web Solutions" style={{ width: 46, height: 46, objectFit: 'contain', flex: '0 0 auto', filter: 'drop-shadow(0 8px 18px rgba(14,165,233,0.18))' }} />
            <div>
              <strong style={{ display: 'block', fontWeight: 900, fontSize: 16, lineHeight: 1 }}>Novelty Web Solutions</strong>
              <span style={{ display: 'block', color: C.muted, fontSize: 12, marginTop: 5 }}>Business growth systems for modern teams</span>
            </div>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: 'Live AI Demo', href: 'https://noveltywebsolutions.com/#samantha', highlight: true },
              { label: 'Agency', href: 'https://noveltywebsolutions.com/' },
              { label: 'Operating System', href: 'https://businessesos.com/' },
              { label: 'Assessment', href: '#assessment', highlight: false },
              { label: 'Pricing', href: '#pricing', highlight: false },
              { label: 'Included', href: '#included' },
              { label: 'Claim Offer', href: '#claim' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  textDecoration: 'none',
                  color: link.highlight ? C.white : C.soft,
                  fontSize: 13, fontWeight: 800, padding: '10px 12px', borderRadius: 999,
                  border: '1px solid transparent',
                  background: link.highlight ? 'rgba(14,165,233,0.16)' : 'transparent',
                  borderColor: link.highlight ? 'rgba(56,189,248,0.32)' : 'transparent',
                  transition: 'color .2s ease, background .2s ease, border-color .2s ease, transform .2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!link.highlight) {
                    (e.target as HTMLElement).style.color = C.white;
                    (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.highlight) {
                    (e.target as HTMLElement).style.color = C.soft;
                    (e.target as HTMLElement).style.background = 'transparent';
                    (e.target as HTMLElement).style.borderColor = 'transparent';
                    (e.target as HTMLElement).style.transform = 'none';
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Checkout success banner */}
      {checkoutSuccess && (
        <section style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 20px 0' }}>
          <div style={{ borderRadius: 16, padding: '16px 20px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(52,211,153,0.35)', color: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Checkout Complete</p>
              <p style={{ fontSize: 13, color: '#a7f3d0', marginTop: 4 }}>
                Your {checkoutTier ? `${checkoutTier} ` : ""}subscription was submitted successfully.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Hero */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '54px 40px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 0.75fr) minmax(580px, 1.25fr)', gap: 40, alignItems: 'start' }}>
          {/* Left: Copy */}
          <div style={{ alignSelf: 'start', maxWidth: 620, paddingTop: 6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.36)', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: C.emerald, boxShadow: '0 0 0 0 rgba(16,185,129,0.45)', animation: 'pulse 1.7s infinite' }}></span>
              Exclusive summer launch
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.cyanLight, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Summer Promo</span>
                <span style={{ color: C.muted, fontSize: 18 }}>•</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.cyanLight, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Exclusive Launch</span>
              </div>
              <h1 style={{ fontSize: 'clamp(48px, 7vw, 92px)', lineHeight: 0.92, letterSpacing: '-0.075em', fontWeight: 900 }}>
                NWS <span style={{ background: `linear-gradient(100deg, ${C.cyan}, ${C.cyanLight} 48%, #a7f3d0 105%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Summer Launch</span>
              </h1>
            </div>
            <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: C.slate300, lineHeight: 1.45, fontWeight: 800, marginBottom: 16 }}>
              Launch smarter. Capture more leads. Automate more of the work.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.72, fontSize: 16, maxWidth: 610, marginBottom: 28 }}>
              A limited-time business growth bundle from Novelty Web Solutions designed to help businesses modernize their online presence, improve customer response, and streamline daily operations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary }} onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 65px rgba(14,165,233,0.42)'}} onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(14,165,233,0.3)'}}>
                Book a Demo <ArrowRight size={16} />
              </a>
              <button onClick={() => handleCheckout('lite')} disabled={loading === 'lite'} style={{ ...btnSecondary, opacity: loading === 'lite' ? 0.7 : 1, cursor: loading === 'lite' ? 'not-allowed' : 'pointer' }} onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'}} onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.055)'}}>
                {loading === 'lite' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />} Subscribe $297/mo
              </button>
            </div>
          </div>

          {/* Right: Product Showcase */}
          <div style={{ position: 'relative', alignSelf: 'start', width: '100%', minHeight: 640, borderRadius: 36, padding: 24, background: 'radial-gradient(circle at 55% 34%, rgba(56,189,248,0.25), transparent 35%), radial-gradient(circle at 50% 98%, rgba(14,165,233,0.2), transparent 36%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.022))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {/* Promo Tape */}


            {/* Grid */}
            <div style={{ position: 'relative', zIndex: 2, minHeight: 542, display: 'grid', gridTemplateColumns: '1fr 1.28fr 1fr', gridTemplateRows: '122px 122px 122px 128px', gap: 12, paddingTop: 12 }}>
              {/* Side modules */}
              {[
                { Icon: Globe, title: 'Smart Website Design', desc: 'Modern pages built for trust and conversion.', col: 1, row: 1 },
                { Icon: Calendar, title: 'Integrated Booking', desc: 'Make the next step easy for customers.', col: 3, row: 1 },
                { Icon: Phone, title: 'AI Receptionist', desc: 'Capture and qualify enquiries faster.', col: 1, row: 2 },
                { Icon: Shield, title: 'Reputation Management', desc: 'Turn happy customers into visible trust.', col: 3, row: 2 },
                { Icon: MessageSquare, title: 'Unified Messaging Inbox', desc: 'Keep customer conversations in one place.', col: 1, row: 3 },
                { Icon: Users, title: 'CaricomBusiness Listing', desc: 'Build regional visibility for your business.', col: 3, row: 3 },
              ].map(({ Icon, title, desc, col, row }) => (
                <article key={title} style={{ position: 'relative', borderRadius: 20, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gridColumn: col, gridRow: row, background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, display: 'grid', placeItems: 'center', marginBottom: 10, background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: C.cyanLight, fontSize: 18 }}>
                    <Icon size={21} />
                  </div>
                  <h3 style={{ fontSize: 12, lineHeight: 1.08, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 5 }}>{title}</h3>
                  <p style={{ color: C.muted, fontSize: 10, lineHeight: 1.35 }}>{desc}</p>
                </article>
              ))}

              {/* Center main box */}
              <article style={{ gridColumn: 2, gridRow: '1 / 4', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)', minHeight: 380 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
                  <img src="/assets/nws-logo.png" alt="NWS" style={{ width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.38))', flex: '0 0 auto' }} />
                  <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.06em' }}>N<span style={{ color: C.cyanLight }}>W</span>S</div>
                </div>
                <div>
                  <h2 style={{ position: 'relative', zIndex: 2, fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: '.94', letterSpacing: '-0.045em', textTransform: 'uppercase', fontWeight: 900 }}>
                    Business<br />Growth<br />Bundle
                  </h2>
                  <p style={{ position: 'relative', zIndex: 2, color: C.soft, fontSize: 12, lineHeight: 1.45, marginTop: 10 }}>One connected system for leads, conversations, bookings, follow-up and reputation.</p>
                </div>
              </article>

              {/* Price plate */}
              <div style={{ gridColumn: '1 / -1', gridRow: 4, display: 'grid', gridTemplateColumns: 'minmax(170px, 215px) auto minmax(220px, 1fr)', gap: 20, alignItems: 'center', borderRadius: 24, padding: '22px 24px', background: 'rgba(8,15,30,0.9)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 70px rgba(0,0,0,0.42), 0 0 60px rgba(14,165,233,0.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <img src="/assets/nws-logo.png" alt="NWS" style={{ width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.38))', flex: '0 0 auto' }} />
                  <div>
                    <div style={{ color: C.muted, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.14em', lineHeight: 1.22 }}>Founder plan</div>
                    <div style={{ color: C.soft, fontSize: 9, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: 4, lineHeight: 1.25 }}>Summer launch pricing</div>
                  </div>
                </div>
                <div style={{ fontSize: 44, lineHeight: 0.95, fontWeight: 900, letterSpacing: '-0.06em', color: C.cyanLight, whiteSpace: 'nowrap' }}>
                  $297<span style={{ color: C.white, fontSize: 16, letterSpacing: 0 }}>/month</span>
                </div>
                <p style={{ color: C.soft, fontSize: 12, lineHeight: 1.55, maxWidth: 260, margin: 0 }}>or $2,970 annually, which gives you two months free.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower: Trust badges + countdown */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, width: '100%', marginTop: 8, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 0 }}>
            {['All-in-one solution', 'AI + automation configured for your business', 'Guided setup included'].map((pill) => (
              <span key={pill} style={{ padding: '8px 13px', borderRadius: 999, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.11)', color: C.soft, fontSize: 12, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Star size={12} /> {pill}
              </span>
            ))}
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* Story Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 28, borderRadius: 34, padding: 30, background: 'radial-gradient(circle at 14% 16%, rgba(14,165,233,0.24), transparent 32%), linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.03))', border: `1px solid ${C.line}`, boxShadow: '0 24px 80px rgba(0,0,0,0.38)' }}>
          <div style={{ borderRadius: 26, padding: 30, background: 'rgba(8,15,30,0.6)', border: '1px solid rgba(56,189,248,0.18)' }}>
            <blockquote style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.04, fontWeight: 900, letterSpacing: '-0.045em', marginBottom: 18 }}>
              "The lead you already paid for should not disappear between channels."
            </blockquote>
            <p style={{ color: C.soft, lineHeight: 1.72 }}>
              A customer sees your business, checks your website, sends a message, then waits. Your team is busy. The enquiry is real, but the response gets delayed. By the time someone follows up, the moment has cooled.
            </p>
          </div>
          <div style={{ padding: '8px 6px' }}>
            <div style={{ color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10, textAlign: 'left' }}>The NWS perspective</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.3vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 18 }}>
              Most businesses do not need more tools first. They need a cleaner customer journey.
            </h2>
            <p style={{ color: C.soft, lineHeight: 1.72, marginBottom: 14 }}>
              Novelty Web Solutions builds connected digital systems that help customers find you, ask questions, book appointments, receive fast responses, and stay in follow-up without forcing your team to chase everything manually.
            </p>
            <p style={{ color: C.soft, lineHeight: 1.72 }}>
              That is the idea behind the NWS Summer Launch: a practical business growth bundle that combines website, booking, AI reception, unified messaging, review growth, and regional visibility into one managed system.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="included">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>What's included</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Classic bundle energy. Modern business polish.
        </h2>
        <p style={{ textAlign: 'center', color: C.muted, maxWidth: 740, margin: '0 auto 34px', lineHeight: 1.65, fontSize: 16 }}>
          A launch-ready offer stack designed to make your business easier to find, easier to contact, and easier to choose.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
          {features.map((f) => (
            <article key={f.title} style={{ ...cardBase, minHeight: 218, padding: 22, position: 'relative', overflow: 'hidden', transition: 'transform .2s ease, border-color .2s ease' }}
              onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.35)'}}
              onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = C.line}}
            >
              <div style={{ width: 52, height: 52, borderRadius: 18, display: 'grid', placeItems: 'center', marginBottom: 16, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', color: C.cyanLight }}>
                <f.icon size={24} />
              </div>
              <h3 style={{ fontSize: 17, lineHeight: 1.12, marginBottom: 10, letterSpacing: '-0.02em', fontWeight: 900 }}>{f.title}</h3>
              <p style={{ color: C.muted, lineHeight: 1.55, fontSize: 13 }}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Value Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="value">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Value stack</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Unbeatable Value. <span style={{ background: `linear-gradient(100deg, ${C.cyan}, ${C.cyanLight} 48%, #a7f3d0 105%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>All in One Bundle.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'stretch' }}>
          <div style={{ borderRadius: 28, padding: 30, background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.03))', border: `1px solid ${C.line}`, boxShadow: '0 24px 80px rgba(0,0,0,0.38)' }}>
            {[
              ['Website Overhaul or New Website', '$1,500 value'],
              ['Integrated Booking System', '$29 value'],
              ['AI Receptionist', '$597 value'],
              ['Reputation Management System', '$29 value'],
              ['Unified Messaging System', '$49 value'],
              ['Free Business Listing on CaricomBusiness.com', 'Included'],
            ].map(([name, val]) => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '15px 0', borderBottom: `1px solid rgba(255,255,255,0.1)`, color: C.soft }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
                  <span style={{ color: C.emerald, fontWeight: 900 }}>✓</span> {name}
                </span>
                <span style={{ fontFamily: "'Montserrat', 'Open Sans', Arial, sans-serif", fontWeight: 900, color: C.cyanLight }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 28, padding: 28, background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.28), transparent 42%), linear-gradient(145deg, rgba(14,165,233,0.16), rgba(8,15,30,0.76))', border: '1px solid rgba(56,189,248,0.26)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 54, marginBottom: 18 }}>✦</div>
            <h3 style={{ fontSize: 28, lineHeight: 1.08, letterSpacing: '-0.04em', fontWeight: 900 }}>One connected system. One monthly investment.</h3>
            <p style={{ marginTop: 12, color: C.soft, lineHeight: 1.55 }}>Built for growing businesses that want a cleaner first impression, faster response, and better follow-up.</p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="problems">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Why this matters</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Your next customer may already be trying to reach you.
        </h2>
        <p style={{ textAlign: 'center', color: C.muted, maxWidth: 740, margin: '0 auto 34px', lineHeight: 1.65, fontSize: 16 }}>
          NWS helps you protect the demand you already create before it leaks through slow replies, scattered tools, or unclear follow-up.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {problems.map((p) => (
            <article key={p.title} style={{ ...cardBase, padding: 22, minHeight: 205 }}>
              <div style={{ width: 52, height: 52, borderRadius: 18, display: 'grid', placeItems: 'center', marginBottom: 16, background: 'rgba(248,113,113,0.09)', border: '1px solid rgba(248,113,113,0.18)', color: C.danger }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: 17, lineHeight: 1.12, marginBottom: 10, letterSpacing: '-0.02em', fontWeight: 900 }}>{p.title}</h3>
              <p style={{ color: C.muted, lineHeight: 1.55, fontSize: 13 }}>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="works">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>How it works</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          From first impression to booked opportunity.
        </h2>
        <div style={{ position: 'relative', padding: 24, borderRadius: 30, background: 'rgba(255,255,255,0.038)', border: `1px solid ${C.line}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {steps.map((s) => (
              <article key={s.num} style={{ textAlign: 'center', padding: 24, position: 'relative' }}>
                <div style={{ width: 58, height: 58, display: 'grid', placeItems: 'center', margin: '0 auto 16px', borderRadius: 999, color: C.white, fontWeight: 900, background: 'rgba(14,165,233,0.18)', border: '1px solid rgba(56,189,248,0.3)' }}>{s.num}</div>
                <h3 style={{ fontSize: 17, lineHeight: 1.12, marginBottom: 10, letterSpacing: '-0.02em', fontWeight: 900 }}>{s.title}</h3>
                <p style={{ color: C.muted, lineHeight: 1.55, fontSize: 13 }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="industries">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Who it's for</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Configured around real business enquiries.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {industries.map((ind) => (
            <div key={ind.name} style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, color: C.slate300, borderRadius: 20, background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: `1px solid ${C.line}` }}>
              <span style={{ color: C.cyanLight, fontSize: 20 }}>{ind.icon}</span> {ind.name}
            </div>
          ))}
        </div>
      </section>

      {/* Assessment Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="assessment">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Free Assessment</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Get Your Free Business Intelligence Report
        </h2>
        <p style={{ textAlign: 'center', color: C.muted, maxWidth: 640, margin: '0 auto 34px', lineHeight: 1.65, fontSize: 16 }}>
          Enter your domain to scan your business, identify revenue leaks, and get a customized AI agent demo &mdash; free, no credit card.
        </p>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <WorkbenchWizard />
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="pricing">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Choose Your Plan
        </h2>
        <p style={{ textAlign: 'center', color: C.muted, maxWidth: 640, margin: '0 auto 34px', lineHeight: 1.65, fontSize: 16 }}>
          Pick the tier that fits your business. All plans include a free CaricomBusiness.com listing. Upgrade anytime.
        </p>

        {/* Yearly toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', borderRadius: 999, padding: 4, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setIsYearly(false)} style={{ padding: '10px 22px', borderRadius: 999, fontWeight: 900, fontSize: 13, cursor: 'pointer', border: 'none', background: !isYearly ? 'rgba(14,165,233,0.2)' : 'transparent', color: !isYearly ? C.cyanLight : C.soft, transition: 'all .2s ease' }}>
              Monthly
            </button>
            <button onClick={() => setIsYearly(true)} style={{ padding: '10px 22px', borderRadius: 999, fontWeight: 900, fontSize: 13, cursor: 'pointer', border: 'none', background: isYearly ? 'rgba(14,165,233,0.2)' : 'transparent', color: isYearly ? C.cyanLight : C.soft, transition: 'all .2s ease' }}>
              Yearly <span style={{ color: C.emerald, fontSize: 11 }}>(2 months free)</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PRICING_TIERS.map((tier) => {
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;
            const priceLabel = isYearly ? `/year` : `/month`;
            const isPopular = tier.id === 'pro';
            const isSummerOffer = tier.id === 'lite';
            return (
              <div key={tier.id} style={{ position: 'relative', padding: isPopular ? '36px 28px' : '28px', borderRadius: 24, ...(isPopular ? { background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.28), transparent 42%), linear-gradient(145deg, rgba(14,165,233,0.16), rgba(8,15,30,0.76))', border: '1px solid rgba(56,189,248,0.26)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), 0 0 75px rgba(14,165,233,0.13)' } : cardBase), display: 'flex', flexDirection: 'column' }}>
                {isPopular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: C.cyan, color: '#fff', padding: '4px 16px', borderRadius: 999, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    Most Popular
                  </div>
                )}
                {isSummerOffer && (
                  <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(52,211,153,0.25)', color: C.emerald, padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                    Summer Launch Offer
                  </div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>{tier.name}</h3>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 16, flex: 1 }}>{tier.description}</p>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: C.cyanLight, letterSpacing: '-0.04em' }}>${price.toLocaleString()}</span>
                  <span style={{ color: C.soft, fontSize: 14, marginLeft: 4 }}>{priceLabel}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}> 
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: C.soft, lineHeight: 1.4 }}>
                      <Check size={14} style={{ color: C.emerald, marginTop: 2, flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCheckout(tier.id)} disabled={loading === tier.id}
                  style={{ width: '100%', ...(isPopular ? btnPrimary : btnSecondary), opacity: loading === tier.id ? 0.7 : 1, cursor: loading === tier.id ? 'not-allowed' : 'pointer', border: isPopular ? 'none' : '1px solid rgba(255,255,255,0.16)' }}
                  onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; if (isPopular) (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 65px rgba(14,165,233,0.42)'; else { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; } }}}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; if (isPopular) (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(14,165,233,0.3)'; else { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.055)'; }}}>
                  {loading === tier.id ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe Now'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Explore Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="learn">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Explore first</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Learn before you book.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'Agency: Novelty Web Solutions', desc: 'See the agency behind the offer and explore how NWS helps businesses modernize their digital presence.', href: 'https://noveltywebsolutions.com/', linkText: 'Visit noveltywebsolutions.com' },
            { title: 'Operating System: Business OS', desc: 'Explore the CRM, AI receptionist, unified messaging, booking, and reputation tools behind the bundle.', href: 'https://businessesos.com/', linkText: 'Visit businessesos.com' },
          ].map((card) => (
            <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" style={{ ...cardBase, display: 'block', padding: 24, textDecoration: 'none', transition: 'transform .2s ease, border-color .2s ease' }}
              onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.32)'}}
              onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = C.line}}
            >
              <h3 style={{ marginBottom: 10, fontSize: 18, fontWeight: 900 }}>{card.title}</h3>
              <p style={{ color: C.muted, lineHeight: 1.55, fontSize: 13 }}>{card.desc}</p>
              <div style={{ marginTop: 14, color: C.cyanLight, fontWeight: 900, fontSize: 13 }}>{card.linkText} →</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px' }} id="faq">
        <div style={{ textAlign: 'center', color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Quick answers</div>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 16 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {faqs.map((faq, i) => (
            <button key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ ...cardBase, display: 'block', padding: 24, textAlign: 'left', cursor: 'pointer', transition: 'transform .2s ease, border-color .2s ease' }}
              onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.32)'}}
              onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = C.line}}
            >
              <h3 style={{ marginBottom: 10, fontSize: 18, fontWeight: 900, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {faq.q}
                {openFaq === i ? <ChevronUp size={18} style={{ color: C.cyanLight }} /> : <ChevronDown size={18} style={{ color: C.muted }} />}
              </h3>
              {openFaq === i && <p style={{ color: C.muted, lineHeight: 1.55, fontSize: 13 }}>{faq.a}</p>}
            </button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 20px 54px' }} id="claim">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', borderRadius: 30, padding: 36, background: 'radial-gradient(circle at 82% 35%, rgba(14,165,233,0.25), transparent 38%), linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(56,189,248,0.20)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), 0 0 75px rgba(14,165,233,0.13)' }}>
          <div>
            <div style={{ color: C.cyanLight, fontSize: 12, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12, textAlign: 'left' }}>Final call to action</div>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 50px)', lineHeight: 1.02, letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 14 }}>
              Ready to launch with NWS this summer?
            </h2>
            <p style={{ color: C.soft, lineHeight: 1.65, maxWidth: 650 }}>
              We are opening only a few founder places in selected key industries, and enrollment closes when the launch period ends.
            </p>
          </div>
          <div style={{ borderRadius: 24, padding: 26, minWidth: 300, background: 'rgba(8,15,30,0.72)', border: '1px solid rgba(255,255,255,0.13)' }}>
            <div style={{ color: C.cyanLight, fontSize: 54, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1 }}>
              $297 <span style={{ fontSize: 16, color: C.white, letterSpacing: 0 }}>monthly</span>
            </div>
            <p style={{ color: C.soft, fontSize: 13, margin: '8px 0 18px' }}>or $2,970 annually — 2 months free</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={() => handleCheckout('lite')} disabled={loading === 'lite'} style={{ ...btnPrimary, opacity: loading === 'lite' ? 0.7 : 1, cursor: loading === 'lite' ? 'not-allowed' : 'pointer', border: 'none' }} onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 65px rgba(14,165,233,0.42)'}} onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 50px rgba(14,165,233,0.3)'}}>
                {loading === 'lite' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />} Subscribe $297/mo
              </button>
              <button onClick={() => handleCheckout('pro')} disabled={loading === 'pro'} style={{ ...btnSecondary, opacity: loading === 'pro' ? 0.7 : 1, cursor: loading === 'pro' ? 'not-allowed' : 'pointer' }} onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.45)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'}} onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.055)'}}>
                {loading === 'pro' ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />} Subscribe $597/mo (Popular)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: '26px 20px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: C.cyanLight, fontWeight: 900 }}>Novelty Web Solutions</div>
            <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Enterprise-level technology without enterprise-level complexity.</div>
          </div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <a href="https://noveltywebsolutions.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: 'none', fontSize: 13 }}>Agency</a>
            <a href="https://businessesos.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: 'none', fontSize: 13 }}>Operating System</a>
            <a href="https://noveltywebsolutions.com/#samantha" target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: 'none', fontSize: 13 }}>Live AI Demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
