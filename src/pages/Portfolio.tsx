import { useState } from "react";
import { ArrowRight, Star, TrendingUp, Phone, Globe } from "lucide-react";
import BookingModal from "../components/BookingModal";

const caseStudies = [
  {
    id: 1,
    industry: "Real Estate",
    client: "Island Properties Group",
    location: "Barbados, W.I.",
    logo: "🏠",
    challenge: "Agents were missing inbound inquiry calls after hours, losing warm leads to competitors. No CRM to track follow-ups.",
    solution: "Deployed Nova voice receptionist with CRM. All inbound calls routed through Nova, which qualifies buyer intent, captures budget range, and books property tours automatically.",
    results: [
      { metric: "Call Capture Rate", before: "61%", after: "100%", icon: <Phone size={14} /> },
      { metric: "Monthly Leads Qualified", before: "22", after: "89", icon: <TrendingUp size={14} /> },
      { metric: "Time on Phone/Day (Staff)", before: "4.5 hrs", after: "0.8 hrs", icon: <Star size={14} /> },
    ],
    quote: "Nova answered more calls in the first week than our team did in a month. We closed two deals directly from after-hours inquiries we would have missed.",
    testimonialName: "Marcus B.",
    testimonialTitle: "Managing Director, Island Properties Group",
    accent: "sky",
  },
  {
    id: 2,
    industry: "Medical / Wellness",
    client: "Clarity Wellness Clinic",
    location: "Trinidad & Tobago",
    logo: "🏥",
    challenge: "Front desk overwhelmed with appointment booking calls. Patients were waiting 10+ minutes on hold, leading to drop-offs and Google review complaints.",
    solution: "Built a custom website with embedded Nova chat + phone. Nova handles appointment intake, insurance pre-screen questions, and sends automated appointment reminders via SMS.",
    results: [
      { metric: "Avg Hold Time", before: "11 min", after: "0 sec", icon: <Phone size={14} /> },
      { metric: "Weekly Bookings", before: "48", after: "112", icon: <TrendingUp size={14} /> },
      { metric: "Google Rating", before: "3.8 ★", after: "4.7 ★", icon: <Star size={14} /> },
    ],
    quote: "Our front desk staff finally have time to focus on in-clinic patients. The AI handles everything else, and patients actually prefer it — no waiting.",
    testimonialName: "Dr. Priya S.",
    testimonialTitle: "Founder, Clarity Wellness Clinic",
    accent: "emerald",
  },
  {
    id: 3,
    industry: "Legal Services",
    client: "Chambers & Associates Law",
    location: "Barbados, W.I.",
    logo: "⚖️",
    challenge: "New client intake was handled entirely by email — slow, inconsistent, and missing key conflict-check information before consultation.",
    solution: "Deployed Nova to handle all intake calls. Nova walks callers through a structured intake script, captures matter type, conflict check questions, and books consultations — all logged to your CRM automatically.",
    results: [
      { metric: "Intake Time (per client)", before: "35 min", after: "8 min", icon: <Phone size={14} /> },
      { metric: "Consultations Booked/Week", before: "9", after: "24", icon: <TrendingUp size={14} /> },
      { metric: "Staff Hours Saved/Month", before: "0", after: "62 hrs", icon: <Star size={14} /> },
    ],
    quote: "The intake quality is actually better now. Nova captures everything consistently, and our lawyers walk into consultations already briefed.",
    testimonialName: "Kwame A.",
    testimonialTitle: "Senior Partner, Chambers & Associates",
    accent: "violet",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const study = caseStudies[active];

  const accentMap: Record<string, string> = {
    sky: "text-sky-600 bg-sky-50 border-sky-200",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-200",
    violet: "text-violet-600 bg-violet-50 border-violet-200",
  };

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Client Results</span>
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight leading-[1.04] text-text-base mt-3">
            Real results. <span className="italic text-accent-primary">Real businesses.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Case studies from Caribbean businesses that deployed NWS systems to automate their operations and scale without hiring.
          </p>
        </div>
      </section>

      {/* Case Study Tabs + Detail */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-3 mb-10">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${active === i ? "border-sky-300 bg-sky-50 text-sky-700 shadow-sm" : "border-slate-100 bg-white text-text-muted hover:border-sky-100"}`}
              >
                <span className="text-base">{cs.logo}</span>
                {cs.industry}
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Story */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="border-2 border-slate-100 bg-white rounded-[24px] p-8 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className={`text-[9px] uppercase tracking-widest font-bold border px-3 py-1 rounded-full ${accentMap[study.accent]}`}>{study.industry}</span>
                    <h2 className="text-xl font-black text-text-base mt-2">{study.client}</h2>
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium mt-1">
                      <Globe size={11} /> {study.location}
                    </div>
                  </div>
                  <span className="text-5xl">{study.logo}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">The Challenge</span>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">The NWS Solution</span>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{study.solution}</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="border-2 border-sky-100 bg-sky-50/60 rounded-[24px] p-8 shadow-sm">
                <p className="text-sm text-text-base font-medium leading-relaxed italic mb-4">&ldquo;{study.quote}&rdquo;</p>
                <div>
                  <div className="font-black text-text-base text-sm">{study.testimonialName}</div>
                  <div className="text-[10px] text-text-muted font-medium">{study.testimonialTitle}</div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">Measured Results</div>
              {study.results.map((r, i) => (
                <div key={i} className="border-2 border-slate-100 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-100 transition-all">
                  <div className="flex items-center gap-2 text-sky-600 mb-3">
                    {r.icon}
                    <span className="text-[10px] uppercase tracking-widest font-bold text-text-muted">{r.metric}</span>
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-text-muted/50 font-bold block">Before</span>
                      <span className="text-xl font-black font-mono text-text-muted line-through decoration-1">{r.before}</span>
                    </div>
                    <ArrowRight size={14} className="text-sky-400 mb-1" />
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-sky-600 font-bold block">After NWS</span>
                      <span className="text-2xl font-black font-mono text-sky-600">{r.after}</span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full mt-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all"
              >
                Get Similar Results <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
