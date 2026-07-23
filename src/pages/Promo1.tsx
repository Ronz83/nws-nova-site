import { useState, useEffect } from 'react';

export default function Promo1() {
  const [days, setDays] = useState(29);
  const [hours, setHours] = useState(23);
  const [mins, setMins] = useState(59);
  const [secs, setSecs] = useState(59);

  useEffect(() => {
    const endDate = new Date('2026-08-19T23:59:59-04:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); return; }
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMins(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSecs(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gradient-to-b from-[#080f1e] via-[#0c1a2e] to-[#080f1e] text-white font-sans" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
        
        {/* Top Bar */}
        <div className="bg-[#0ea5e9] text-center py-2 text-sm font-bold tracking-wide">
          ⚡ SUMMER LAUNCH — 50% OFF — LIMITED FOUNDING SPOTS AVAILABLE
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-12 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            Exclusive Summer Launch
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Launch Smarter.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]">
              Automate Your Growth.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Capture more leads, respond instantly, and turn enquiries into revenue — automatically.
            The complete operating system for your business.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { label: 'Days', value: days },
              { label: 'Hours', value: hours },
              { label: 'Mins', value: mins },
              { label: 'Secs', value: secs },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center min-w-[70px]">
                <div className="text-2xl md:text-3xl font-black text-[#0ea5e9]">{item.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden max-w-lg mx-auto mb-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Founder Plan</div>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="text-xl font-bold text-slate-500 line-through decoration-red-500/60 decoration-2">$597</span>
                <span className="text-5xl md:text-6xl font-black text-white">$297</span>
                <span className="text-lg text-slate-400 font-medium">/mo</span>
              </div>
              <div className="text-emerald-400 font-semibold text-sm mb-6 flex items-center justify-center gap-1">
                ✓ Save $300/month — or $3,600/year
              </div>
              <a
                href="https://businessesos.com/register?promo=true&tier=pro"
                className="block w-full bg-[#0ea5e9] hover:bg-[#38bdf8] text-white text-lg font-bold py-4 rounded-xl transition-all shadow-[0_0_40px_-5px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Claim Your Spot — $297/mo
              </a>
              <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                <span className="text-yellow-500">★</span> Limited founding spots available
              </p>
            </div>
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['✓ No tech skills required', '✓ AI answers calls 24/7', '✓ Live in 24 hours', '✓ Cancel anytime'].map((pill) => (
              <span key={pill} className="text-sm text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {pill}
              </span>
            ))}
          </div>
        </section>

        {/* Problems */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Every Missed Call Is a Job Walking Out the Door.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'The Silent Phone Drain', body: 'Missed calls after hours don\'t go to voicemail — they go straight to your competitor who picks up.' },
              { title: 'The Follow-Up Black Hole', body: 'Leads come in, life gets busy, and by the time you call back, they\'ve already booked someone else.' },
              { title: 'The Tool Chaos', body: 'You\'re juggling emails, Facebook messages, Instagram DMs, and a spreadsheet you don\'t trust — and nothing talks to anything else.' },
              { title: 'The Review Gap', body: 'Your work is great. But you forget to ask, clients forget to leave one, and your Google profile sits at 3.8 stars while a less-skilled competitor sits at 4.9.' },
            ].map((p) => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">The Complete Growth Arsenal</h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Everything you need to capture, nurture, and close leads — all in one connected system.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🌐', title: 'Smart Website Design', desc: 'Modern, mobile-friendly websites that build trust and convert visitors.' },
              { icon: '📅', title: 'Integrated Booking', desc: 'Let customers book appointments 24/7 with ease.' },
              { icon: '🤖', title: 'AI Receptionist', desc: 'Never miss a lead. AI answers, qualifies and captures enquiries.' },
              { icon: '⭐', title: 'Reputation Management', desc: 'Collect reviews, strengthen trust and grow credibility.' },
              { icon: '💬', title: 'Unified Messaging', desc: 'Manage WhatsApp, SMS, Email & Social in one place.' },
              { icon: '📍', title: 'Regional Business Listing', desc: 'Premium placement on CaricomBusiness.com to drive traffic.' },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#0ea5e9]/30 transition-all">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-base font-bold mb-1">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Value Breakdown */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Unbeatable Value. <span className="text-[#0ea5e9]">All in One Bundle.</span>
            </h2>
            <div className="space-y-3">
              {[
                { item: 'Website: Overhaul (Lite) / Single Page (Pro) / 3-Page (Platinum)', value: '$1,500' },
                { item: 'Integrated Booking System', value: '$29' },
                { item: 'AI Receptionist', value: '$597' },
                { item: 'Reputation Management System', value: '$29' },
                { item: 'Unified Messaging System', value: '$99' },
                { item: 'Regional Business Listing', value: '$199' },
              ].map((row) => (
                <div key={row.item} className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-slate-300 text-sm">{row.item}</span>
                  <span className="text-slate-500 font-mono text-xs">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="text-lg font-bold">Total Real World Value</span>
                <span className="text-xl font-black text-slate-500 line-through decoration-red-500/50">$2,453+</span>
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="text-sm text-slate-400 mb-1">Your Price Today</div>
              <div className="text-4xl font-black text-[#0ea5e9] mb-1">$297<span className="text-base text-slate-400 font-medium">/month</span></div>
              <div className="text-emerald-400 text-sm font-semibold mb-4">That's a savings of over 88%</div>
              <a
                href="https://businessesos.com/register?promo=true&tier=pro"
                className="inline-block bg-[#0ea5e9] hover:bg-[#38bdf8] text-white text-base font-bold py-3 px-10 rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(14,165,233,0.4)]"
              >
                Claim Founder Pricing
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">One System. Your Industry. Running in a Day.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Pick Your Industry', desc: 'Choose your trade — Roofing, Handyman, Dental, Legal, Chiropractic, or General Business — and we configure the exact tools your business needs.' },
              { step: '02', title: 'Complete Onboarding', desc: 'Complete your business profile during checkout, and we configure your CRM, AI Receptionist, booking system, and inbox. Live within 24 hours.' },
              { step: '03', title: 'Start Getting Jobs', desc: 'Leads are captured automatically, calls are answered 24/7, and follow-ups go out without you lifting a finger. You just show up and do the work.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-black text-[#0ea5e9]/20 mb-3">{s.step}</div>
                <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learn More */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Want to Learn More?</h2>
            <p className="text-slate-400 text-sm mb-6">Explore our platforms in detail before committing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://noveltywebsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#0ea5e9]/30 transition-all group"
            >
              <div className="text-lg font-bold mb-1 group-hover:text-[#0ea5e9] transition-colors">Novelty Web Solutions</div>
              <p className="text-slate-400 text-sm mb-3">Our parent company. Full-service web design, digital marketing, and business solutions for the Caribbean.</p>
              <div className="text-[#0ea5e9] text-xs font-semibold flex items-center gap-1">
                Visit NWS →
              </div>
            </a>
            <a
              href="https://businessesos.com/"
              target="_self"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#0ea5e9]/30 transition-all group"
            >
              <div className="text-lg font-bold mb-1 group-hover:text-[#0ea5e9] transition-colors">Business OS</div>
              <p className="text-slate-400 text-sm mb-3">The complete operating system. CRM, AI receptionist, reputation management, unified inbox — configured for your industry.</p>
              <div className="text-[#0ea5e9] text-xs font-semibold flex items-center gap-1">
                Visit Business OS →
              </div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'What exactly is Business OS?', a: 'Business OS is a complete business operating system that combines CRM, AI phone answering, appointment booking, reputation management, and unified messaging — all configured for your specific industry.' },
              { q: 'How long does setup take?', a: 'Your system is live within 24 hours. We handle all the configuration based on your industry selection during checkout.' },
              { q: 'Do I need technical skills?', a: 'No. Business OS is designed for business owners, not tech experts. Everything is pre-configured and managed for you.' },
              { q: 'Can I cancel anytime?', a: 'Yes. There are no long-term contracts. You can cancel your subscription at any time.' },
              { q: 'What industries do you support?', a: 'We currently support: Handyman, Roofing, Dental, Legal, Chiropractic, and General Business. Each industry gets a custom configuration.' },
            ].map((faq) => (
              <details key={faq.q} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                <summary className="px-5 py-3 cursor-pointer font-semibold text-slate-200 hover:text-[#0ea5e9] transition-colors flex justify-between items-center text-sm">
                  {faq.q}
                  <span className="text-slate-500 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <div className="px-5 pb-3 text-slate-400 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0ea5e9]/10 rounded-2xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-4 leading-tight">
                Ready to launch with NWS this summer?
              </h2>
              <p className="text-slate-300 text-base mb-6 max-w-lg mx-auto">
                We're opening only a few founder places in selected key industries. Enrollment closes when the launch period ends.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://businessesos.com/register?promo=true&tier=pro"
                  className="bg-[#0ea5e9] hover:bg-[#38bdf8] text-white text-base font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(14,165,233,0.4)]"
                >
                  Claim Your Spot — $297/mo
                </a>
                <a
                  href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/20 text-white text-base font-bold py-3 px-8 rounded-xl transition-all"
                >
                  Book a Consultation
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4">Setup and onboarding included · Cancel anytime</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <div>
              <div className="text-base font-bold text-[#0ea5e9] mb-0.5">Novelty Web Solutions</div>
              <p className="text-xs text-slate-500">© 2026 Novelty Web Solutions. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a href="https://noveltywebsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors">Novelty Web Solutions</a>
              <a href="https://businessesos.com/" className="text-xs text-slate-400 hover:text-white transition-colors">Business OS</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
