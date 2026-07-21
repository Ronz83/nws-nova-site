import { useState, useEffect } from 'react';
import {
  Star,
  Globe,
  Calendar,
  Phone,
  MessageSquare,
  Shield,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const endDate = new Date('2026-08-19T23:59:59-04:00');

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

  return (
    <div className="flex justify-center gap-3 flex-wrap mt-4">
      {[
        { num: timeLeft.days, label: 'Days' },
        { num: timeLeft.hours, label: 'Hours' },
        { num: timeLeft.mins, label: 'Mins' },
        { num: timeLeft.secs, label: 'Secs' },
      ].map((item) => (
        <div
          key={item.label}
          className="min-w-[72px] rounded-xl bg-white/[0.06] border border-white/[0.12] text-center py-3 px-2"
        >
          <div className="text-primary-2 text-2xl font-black">{item.num}</div>
          <div className="text-muted text-[10px] uppercase tracking-[0.12em]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    icon: Globe,
    title: 'Smart Website Design',
    desc: 'Modern, mobile-friendly pages that help visitors understand your value and take action.',
  },
  {
    icon: Calendar,
    title: 'Integrated Booking System',
    desc: 'Give customers a simple way to request appointments, consultations, or next steps.',
  },
  {
    icon: Phone,
    title: 'AI Receptionist',
    desc: 'Answer common questions, capture details, and route enquiries using approved information.',
  },
  {
    icon: Shield,
    title: 'Reputation Management',
    desc: 'Request reviews, strengthen trust, and make good customer experiences easier to see.',
  },
  {
    icon: MessageSquare,
    title: 'Unified Messaging Inbox',
    desc: 'Bring WhatsApp, website, email, and social messages into a cleaner follow-up process.',
  },
  {
    icon: Users,
    title: 'Free Business Listing',
    desc: 'Get listed on CaricomBusiness.com so more regional buyers can discover your business.',
  },
];

const problems = [
  { icon: Zap, title: 'Missed leads after hours', desc: 'You lose potential customers while your team is unavailable.' },
  { icon: Zap, title: 'Slow replies across channels', desc: 'Delayed responses across WhatsApp, website, and social media cost trust.' },
  { icon: Zap, title: 'Scattered conversations', desc: 'It is hard to track messages when every platform becomes its own little island.' },
  { icon: Zap, title: 'No clear follow-up process', desc: 'Leads go quiet without a system to remind, route, and nurture them.' },
  { icon: Zap, title: 'Weak online presence', desc: 'Your website and profiles may be underselling the business before you speak to anyone.' },
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
  {
    q: 'What exactly is included?',
    a: 'The bundle includes smart website design, integrated booking, AI receptionist, reputation management, unified messaging, and a free business listing on CaricomBusiness.com.',
  },
  {
    q: 'Does AI replace my team?',
    a: 'No. The system handles approved first responses, intake, routing, and follow-up. Human decisions, service delivery, and sensitive conversations remain with your team.',
  },
  {
    q: 'What does the system review cover?',
    a: 'We map one real enquiry journey for your business, show where response or follow-up can break down, and demonstrate how the connected NWS workflow handles it.',
  },
  {
    q: 'What is the founder plan price?',
    a: 'The founder plan is $297 USD monthly, or $2,970 USD annually, which gives you two months free.',
  },
];

export default function SummerLaunch() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #080f1e, #0c1a2e 38%, #080f1e)' }}>
      {/* Top Banner */}
      <div
        className="sticky top-0 z-40 text-center py-2 px-4 text-xs font-black uppercase tracking-[0.08em] text-slate-900"
        style={{
          background: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.18) 0 14px, transparent 14px 28px), linear-gradient(180deg, #facc15, #f59e0b)',
          borderBottom: '1px solid rgba(0,0,0,0.18)',
          boxShadow: '0 8px 24px rgba(245,158,11,0.18)',
        }}
      >
        NWS Summer Launch Founder Plan — Enrollment closes when the launch period ends
      </div>

      {/* Nav */}
      <div className="sticky top-[36px] z-30 backdrop-blur-md" style={{ background: 'rgba(8,15,30,0.68)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-[1180px] mx-auto px-5 flex items-center justify-between py-4 gap-4 flex-wrap">
          <a href="https://noveltywebsolutions.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-w-[230px] no-underline">
            <div className="w-[50px] h-[50px] rounded-2xl grid place-items-center text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 0 34px rgba(14,165,233,0.28)' }}>
              NWS
            </div>
            <div>
              <strong className="block font-black text-base leading-none">Novelty Web Solutions</strong>
              <span className="block text-muted text-xs mt-1">Business growth systems for modern teams</span>
            </div>
          </a>
          <nav className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'Live AI Demo', href: 'https://noveltywebsolutions.com/#samantha', highlight: true },
              { label: 'Agency', href: 'https://noveltywebsolutions.com/' },
              { label: 'Operating System', href: 'https://businessesos.com/' },
              { label: 'Included', href: '#included' },
              { label: 'Claim Offer', href: '#claim' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`no-underline text-sm font-extrabold px-3 py-2.5 rounded-full border border-transparent transition-all duration-200 hover:text-white hover:bg-white/[0.07] hover:border-white/[0.12] hover:-translate-y-0.5 ${link.highlight ? '!text-white bg-cyan-500/16 border-cyan-400/32' : 'text-slate-300'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-[1180px] mx-auto px-5 pt-14 pb-16">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-9 items-start" style={{ gridTemplateAreas: "'copy showcase'", minHeight: '600px' }}>
          {/* Left: Copy */}
          <div style={{ gridArea: 'copy', alignSelf: 'start', maxWidth: 620, paddingTop: 6 }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.36)', color: '#38bdf8', fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 0 0 rgba(16,185,129,0.45)', animation: 'pulse 1.7s infinite' }}></span>
              Exclusive summer launch
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.075em] font-black mb-6">
              NWS <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">Summer Launch</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-extrabold mb-4 leading-relaxed">
              Launch smarter. Capture more leads. Automate more of the work.
            </p>
            <p className="text-muted leading-relaxed mb-7">
              A limited-time business growth bundle from Novelty Web Solutions designed to help businesses modernize their online presence, improve customer response, and streamline daily operations.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5.5 rounded-xl no-underline font-black text-sm border border-transparent transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', boxShadow: '0 16px 50px rgba(14,165,233,0.3)' }}
              >
                Book a Demo <ArrowRight size={16} />
              </a>
              <a
                href="https://businessesos.com/register?promo=true&tier=pro"
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5.5 rounded-xl no-underline font-black text-sm border border-white/[0.16] text-white transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-white/[0.09]"
                style={{ background: 'rgba(255,255,255,0.055)' }}
              >
                Get Started <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Product Showcase */}
          <div className="relative rounded-3xl p-7" style={{ gridArea: 'showcase', alignSelf: 'start', minWidth: 0, background: 'radial-gradient(circle at 55% 34%, rgba(56,189,248,0.25), transparent 35%), radial-gradient(circle at 50% 98%, rgba(14,165,233,0.2), transparent 36%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.022))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {/* Promo Tape */}
            <div className="absolute top-5 left-6 right-6 h-9 flex items-center justify-center overflow-hidden rounded-lg" style={{ background: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.18) 0 14px, transparent 14px 28px), linear-gradient(180deg, #facc15, #f59e0b)', border: '1px solid rgba(0,0,0,0.16)', boxShadow: '0 12px 28px rgba(245,158,11,0.18)', zIndex: 9 }}>
              <span className="text-xs font-black tracking-[0.16em] uppercase whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif', textShadow: '0 1px 0 rgba(255,255,255,0.18)' }}>
                Summer Promo &nbsp;•&nbsp; Summer Promo &nbsp;•&nbsp; Summer Promo &nbsp;•&nbsp; Summer Promo
              </span>
            </div>

            {/* Grid Layout */}
            <div className="relative z-20 pt-10 min-h-[542px]" style={{ display: 'grid', gridTemplateColumns: '1fr 1.28fr 1fr', gridTemplateRows: '122px 122px 122px 128px', gap: 14 }}>
              {/* Side modules */}
              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <Globe size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">Smart Website Design</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Modern pages built for trust and conversion.</p>
              </article>

              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <Calendar size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">Integrated Booking</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Make the next step easy for customers.</p>
              </article>

              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <Phone size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">AI Receptionist</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Capture and qualify enquiries faster.</p>
              </article>

              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <Shield size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">Reputation Management</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Turn happy customers into visible trust.</p>
              </article>

              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <MessageSquare size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">Unified Messaging Inbox</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Keep customer conversations in one place.</p>
              </article>

              <article className="rounded-2xl p-4 flex flex-col justify-start" style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)' }}>
                <div className="w-10 h-10 rounded-xl grid place-items-center mb-3" style={{ background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(14,165,233,0.26)', color: '#38bdf8', fontSize: 21 }}>
                  <Users size={21} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-tight leading-[1.08]">CaricomBusiness Listing</h3>
                <p className="text-muted text-[11px] leading-relaxed mt-1.5">Build regional visibility for your business.</p>
              </article>

              {/* Center main box */}
              <article className="rounded-2xl p-7 flex flex-col justify-between" style={{ gridColumn: 2, gridRow: '1 / 4', background: 'linear-gradient(155deg, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, #17233a, #09111f 70%)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 54px rgba(0,0,0,0.38), 0 0 58px rgba(14,165,233,0.12)', minHeight: 394 }}>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-[50px] h-[50px] rounded-xl grid place-items-center text-sm font-black text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)' }}>NWS</div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-[42px] leading-[0.94] tracking-[-0.045em] uppercase font-black">
                    Business<br />Growth<br />Bundle
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mt-3">One connected system for leads, conversations, bookings, follow-up and reputation.</p>
                </div>
              </article>

              {/* Price plate */}
              <div className="rounded-2xl p-5.5 flex items-center gap-5" style={{ gridColumn: '1 / -1', gridRow: 4, background: 'rgba(8,15,30,0.9)', border: '1px solid rgba(56,189,248,0.32)', boxShadow: '0 24px 70px rgba(0,0,0,0.42), 0 0 60px rgba(14,165,233,0.14)' }}>
                <div>
                  <div className="text-muted text-xs font-black uppercase tracking-[0.14em] leading-snug">Founder plan</div>
                  <div className="text-slate-300 text-xs font-bold uppercase tracking-[0.09em] leading-tight mt-1">Summer launch pricing</div>
                </div>
                <div className="text-5xl leading-[0.95] font-black tracking-[-0.06em] whitespace-nowrap" style={{ color: '#38bdf8' }}>
                  $297<span className="text-base font-normal tracking-0 text-white">/month</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-[280px]">or $2,970 annually, which gives you two months free.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower: Trust badges + countdown */}
        <div className="flex flex-col items-center gap-3 mt-8 text-center">
          <div className="flex justify-center gap-2.5 flex-wrap">
            {['All-in-one solution', 'AI + automation configured for your business', 'Guided setup included'].map((pill) => (
              <span key={pill} className="px-3.5 py-2 rounded-full text-xs font-extrabold" style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.11)', color: '#cbd5e1' }}>
                <Star size={12} className="inline mr-1.5" /> {pill}
              </span>
            ))}
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12">
        <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-7 rounded-[34px] p-8" style={{ background: 'radial-gradient(circle at 14% 16%, rgba(14,165,233,0.24), transparent 32%), linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.03))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 24px 80px rgba(0,0,0,0.38)' }}>
          <div className="rounded-2xl p-8" style={{ background: 'rgba(8,15,30,0.6)', border: '1px solid rgba(56,189,248,0.18)' }}>
            <blockquote className="text-2xl md:text-4xl leading-[1.04] font-black tracking-[-0.045em] mb-4.5">
              "The lead you already paid for should not disappear between channels."
            </blockquote>
            <p className="text-slate-300 leading-relaxed">
              A customer sees your business, checks your website, sends a message, then waits. Your team is busy. The enquiry is real, but the response gets delayed. By the time someone follows up, the moment has cooled.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-2.5">The NWS perspective</div>
            <h2 className="text-3xl md:text-4xl leading-[1.05] tracking-[-0.05em] font-black mb-4.5">
              Most businesses do not need more tools first. They need a cleaner customer journey.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-3.5">
              Novelty Web Solutions builds connected digital systems that help customers find you, ask questions, book appointments, receive fast responses, and stay in follow-up without forcing your team to chase everything manually.
            </p>
            <p className="text-slate-300 leading-relaxed">
              That is the idea behind the NWS Summer Launch: a practical business growth bundle that combines website, booking, AI reception, unified messaging, review growth, and regional visibility into one managed system.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="included">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">What's included</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-4">
          Classic bundle energy. Modern business polish.
        </h2>
        <p className="text-center text-muted max-w-[740px] mx-auto mb-9 leading-relaxed text-base">
          A launch-ready offer stack designed to make your business easier to find, easier to contact, and easier to choose.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl p-5.5 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/35"
              style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 12px 35px rgba(0,0,0,0.16)', minHeight: 218 }}
            >
              <div className="w-[52px] h-[52px] rounded-2xl grid place-items-center mb-4" style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.25)', color: '#38bdf8' }}>
                <f.icon size={24} />
              </div>
              <h3 className="text-base leading-[1.12] font-black tracking-tight mb-2.5">{f.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Value Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="value">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Value stack</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-10">
          Unbeatable Value. <span className="bg-gradient-to-r from-cyan-400 to-emerald-300 bg-clip-text text-transparent">All in One Bundle.</span>
        </h2>
        <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-stretch">
          <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.03))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 24px 80px rgba(0,0,0,0.38)' }}>
            {[
              ['Website Overhaul or New Website', '$1,500 value'],
              ['Integrated Booking System', '$29 value'],
              ['AI Receptionist', '$597 value'],
              ['Reputation Management System', '$29 value'],
              ['Unified Messaging System', 'Included'],
              ['Free Business Listing on CaricomBusiness.com', 'Included'],
            ].map(([name, val]) => (
              <div key={name} className="grid grid-cols-[1fr_auto] gap-4 items-center py-3.5 border-b border-white/[0.10] text-slate-300">
                <span className="flex items-center gap-2.5 font-semibold">
                  <span className="text-emerald-500 font-black">✓</span> {name}
                </span>
                <span className="font-black" style={{ color: '#38bdf8' }}>{val}</span>
              </div>
            ))}
          </div>
          <div className="rounded-3xl p-7 flex flex-col justify-center text-center" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.28), transparent 42%), linear-gradient(145deg, rgba(14,165,233,0.16), rgba(8,15,30,0.76))', border: '1px solid rgba(56,189,248,0.26)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), 0 0 75px rgba(14,165,233,0.13)' }}>
            <div className="text-5xl mb-4.5">✦</div>
            <h3 className="text-2xl leading-[1.08] tracking-[-0.04em] font-black">One connected system. One monthly investment.</h3>
            <p className="text-slate-300 leading-relaxed mt-3">Built for growing businesses that want a cleaner first impression, faster response, and better follow-up.</p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="problems">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Why this matters</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-4">
          Your next customer may already be trying to reach you.
        </h2>
        <p className="text-center text-muted max-w-[740px] mx-auto mb-9 leading-relaxed text-base">
          NWS helps you protect the demand you already create before it leaks through slow replies, scattered tools, or unclear follow-up.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {problems.map((p) => (
            <article key={p.title} className="rounded-2xl p-5.5 min-h-[205px]" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 12px 35px rgba(0,0,0,0.16)' }}>
              <div className="w-[52px] h-[52px] rounded-2xl grid place-items-center mb-4" style={{ background: 'rgba(248,113,113,0.09)', border: '1px solid rgba(248,113,113,0.18)', color: '#f87171' }}>
                <p.icon size={24} />
              </div>
              <h3 className="text-base leading-[1.12] font-black tracking-tight mb-2.5">{p.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="works">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">How it works</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-10">
          From first impression to booked opportunity.
        </h2>
        <div className="relative p-6 rounded-[30px]" style={{ background: 'rgba(255,255,255,0.038)', border: '1px solid rgba(255,255,255,0.11)' }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <article key={s.num} className="text-center p-6 relative">
                <div className="w-[58px] h-[58px] grid place-items-center mx-auto mb-4 rounded-full text-white font-black" style={{ background: 'rgba(14,165,233,0.18)', border: '1px solid rgba(56,189,248,0.3)' }}>
                  {s.num}
                </div>
                <h3 className="text-base font-black tracking-tight mb-2.5">{s.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="industries">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Who it's for</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-10">
          Configured around real business enquiries.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <div key={ind.name} className="flex items-center gap-3 font-extrabold text-slate-200 py-4 px-5 rounded-2xl" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: '1px solid rgba(255,255,255,0.11)' }}>
              <span className="text-2xl">{ind.icon}</span> {ind.name}
            </div>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="learn">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Explore first</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-10">
          Learn before you book.
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Agency: Novelty Web Solutions', desc: 'See the agency behind the offer and explore how NWS helps businesses modernize their digital presence.', href: 'https://noveltywebsolutions.com/', linkText: 'Visit noveltywebsolutions.com' },
            { title: 'Operating System: Business OS', desc: 'Explore the CRM, AI receptionist, unified messaging, booking, and reputation tools behind the bundle.', href: 'https://businessesos.com/', linkText: 'Visit businessesos.com' },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-6 no-underline transition-all duration-200 hover:-translate-y-0.75 hover:border-cyan-400/32"
              style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 12px 35px rgba(0,0,0,0.16)' }}
            >
              <h3 className="text-lg font-black tracking-tight mb-2.5">{card.title}</h3>
              <p className="text-muted leading-relaxed text-sm mb-3.5">{card.desc}</p>
              <div className="text-cyan-400 font-black text-sm">{card.linkText} →</div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="faq">
        <div className="text-center text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Quick answers</div>
        <h2 className="text-center text-3xl md:text-5xl leading-[1.05] tracking-[-0.05em] font-black mb-10">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <button
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="block text-left rounded-2xl p-6 no-underline transition-all duration-200 hover:-translate-y-0.75 hover:border-cyan-400/32"
              style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.032))', border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 12px 35px rgba(0,0,0,0.16)' }}
            >
              <h3 className="text-lg font-black tracking-tight mb-2.5 flex items-center justify-between">
                {faq.q}
                {openFaq === i ? <ChevronUp size={18} className="text-cyan-400" /> : <ChevronDown size={18} className="text-muted" />}
              </h3>
              {openFaq === i && <p className="text-muted leading-relaxed text-sm">{faq.a}</p>}
            </button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1180px] mx-auto px-5 py-12" id="claim">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center rounded-[30px] p-9" style={{ background: 'radial-gradient(circle at 82% 35%, rgba(14,165,233,0.25), transparent 38%), linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(56,189,248,0.20)', boxShadow: '0 24px 80px rgba(0,0,0,0.38), 0 0 75px rgba(14,165,233,0.13)' }}>
          <div>
            <div className="text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">Final call to action</div>
            <h2 className="text-3xl md:text-5xl leading-[1.02] tracking-[-0.05em] font-black mb-3.5">
              Ready to launch with NWS this summer?
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-[650px]">
              We are opening only a few founder places in selected key industries, and enrollment closes when the launch period ends.
            </p>
          </div>
          <div className="rounded-2xl p-6.5 min-w-[300px]" style={{ background: 'rgba(8,15,30,0.72)', border: '1px solid rgba(255,255,255,0.13)' }}>
            <div className="text-5xl font-black tracking-[-0.06em] leading-none" style={{ color: '#38bdf8' }}>
              $297 <span className="text-base font-normal tracking-0 text-white">monthly</span>
            </div>
            <p className="text-slate-300 text-sm mt-2 mb-4.5">or $2,970 annually — 2 months free</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://businessesos.com/register?promo=true&tier=pro"
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5.5 rounded-xl no-underline font-black text-sm border border-transparent transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', boxShadow: '0 16px 50px rgba(14,165,233,0.3)' }}
              >
                Claim Your Spot <ArrowRight size={16} />
              </a>
              <a
                href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5.5 rounded-xl no-underline font-black text-sm border border-white/[0.16] text-white transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-white/[0.09]"
                style={{ background: 'rgba(255,255,255,0.055)' }}
              >
                Book a Call <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.10] py-6.5" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div className="max-w-[1180px] mx-auto px-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-black" style={{ color: '#38bdf8' }}>Novelty Web Solutions</div>
            <div className="text-muted text-sm mt-1">Enterprise-level technology without enterprise-level complexity.</div>
          </div>
          <div className="flex gap-4.5 flex-wrap">
            <a href="https://noveltywebsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-muted no-underline text-sm hover:!text-white transition-colors">Agency</a>
            <a href="https://businessesos.com/" target="_blank" rel="noopener noreferrer" className="text-muted no-underline text-sm hover:!text-white transition-colors">Operating System</a>
            <a href="https://noveltywebsolutions.com/#samantha" target="_blank" rel="noopener noreferrer" className="text-muted no-underline text-sm hover:!text-white transition-colors">Live AI Demo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
