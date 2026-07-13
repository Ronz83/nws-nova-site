import { useState } from "react";
import { ArrowRight, Star, TrendingUp, Phone } from "lucide-react";
import BookingModal from "../components/BookingModal";

const useCases = [
  {
    id: 1,
    industry: "Real Estate",
    useCase: "After-Hours Lead Capture",
    logo: "🏠",
    challenge: "Agents frequently miss inbound inquiry calls after hours or while on showings. Buyers rarely leave voicemails, opting to call the next agent on the list.",
    solution: "A custom AI Voice agent deployed alongside our CRM pipeline. The agent answers every call 24/7, qualifies buyer intent, captures budget requirements, and books property viewings directly into the agent's calendar.",
    results: [
      { title: "Zero Missed Opportunities", desc: "Every after-hours call is answered instantly and handled professionally.", icon: <Phone size={14} /> },
      { title: "Automated Qualification", desc: "Leads are pre-qualified for budget and timeline before they reach the agent.", icon: <TrendingUp size={14} /> },
      { title: "CRM Sync", desc: "All caller data and transcripts are automatically logged into the pipeline.", icon: <Star size={14} /> },
    ],
    accent: "sky",
  },
  {
    id: 2,
    industry: "Medical / Wellness",
    useCase: "Automated Patient Intake & Support",
    logo: "🏥",
    challenge: "Front desk staff spend up to 70% of their day on the phone. Patients experience long hold times, leading to frustration and negative online reviews.",
    solution: "A custom NWS website integrated with an AI voice and chat agent. The agent handles appointment intake, answers insurance pre-screen questions, and manages rescheduling. Post-visit, automated SMS requests generate Google reviews.",
    results: [
      { title: "Eliminate Hold Times", desc: "Patients get immediate answers to FAQs and booking requests.", icon: <Phone size={14} /> },
      { title: "Staff Reallocation", desc: "Front desk freed up to focus entirely on in-clinic patient care.", icon: <TrendingUp size={14} /> },
      { title: "Reputation Growth", desc: "Automated SMS review requests consistently build a 5-star online presence.", icon: <Star size={14} /> },
    ],
    accent: "emerald",
  },
  {
    id: 3,
    industry: "Legal Services",
    useCase: "Streamlined Client Onboarding",
    logo: "⚖️",
    challenge: "New client intake is often a slow email chain. Lawyers spend billable hours on administrative triage and back-and-forth scheduling.",
    solution: "A custom AI agent handles structured intake calls. It walks callers through an intake script, captures matter types, asks conflict-check questions, and books consultations automatically into the firm's calendar.",
    results: [
      { title: "Instant Intake", desc: "Intake process reduced from days of email tag to a 5-minute call.", icon: <Phone size={14} /> },
      { title: "Consistent Data", desc: "Every required detail is captured flawlessly before the consultation.", icon: <TrendingUp size={14} /> },
      { title: "Billable Hours Saved", desc: "Lawyers walk into meetings fully briefed, with zero administrative overhead.", icon: <Star size={14} /> },
    ],
    accent: "violet",
  },
  {
    id: 4,
    industry: "Restaurant & Hospitality",
    useCase: "Reservation Management & Reviews",
    logo: "🍽️",
    challenge: "During peak dinner rush, staff cannot answer the phone. Missed reservation calls lead to lost revenue and frustrated potential diners.",
    solution: "An AI voice receptionist handles reservation calls during peak hours and after closing. Our CRM sends an automated SMS confirmation before the reservation, and a review request afterward.",
    results: [
      { title: "Maximized Covers", desc: "No booking is ever lost due to an unanswered phone.", icon: <Phone size={14} /> },
      { title: "Reduced No-Shows", desc: "Automated SMS reminders ensure tables stay full.", icon: <TrendingUp size={14} /> },
      { title: "Local SEO Boost", desc: "Consistent flow of new Google reviews improves local search ranking.", icon: <Star size={14} /> },
    ],
    accent: "amber",
  }
];

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const study = useCases[active];

  const accentMap: Record<string, string> = {
    sky: "text-sky-600 bg-sky-50 border-sky-200",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-200",
    violet: "text-violet-600 bg-violet-50 border-violet-200",
    amber: "text-amber-600 bg-amber-50 border-amber-200",
  };

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Use Case Templates</span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-text-base mt-3">
            Real Solutions. <span className="text-accent-primary">Real Impact.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Explore how NWS automation systems and AI agents solve specific operational bottlenecks across different industries.
          </p>
        </div>
      </section>

      {/* Case Study Tabs + Detail */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Tab Switcher */}
          <div className="flex flex-wrap gap-3 mb-10">
            {useCases.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${active === i ? "border-sky-300 bg-sky-50 text-sky-700 shadow-sm" : "border-slate-100 bg-white text-text-muted hover:border-sky-100"}`}
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
                    <span className={`text-sm uppercase tracking-widest font-bold border px-3 py-1 rounded-full ${accentMap[study.accent]}`}>{study.industry}</span>
                    <h2 className="text-xl font-black text-text-base mt-2">{study.useCase}</h2>
                  </div>
                  <span className="text-5xl">{study.logo}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm uppercase tracking-widest text-text-muted font-bold block mb-1">The Challenge</span>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="text-sm uppercase tracking-widest text-text-muted font-bold block mb-1">The NWS Solution</span>
                    <p className="text-sm text-text-muted font-medium leading-relaxed">{study.solution}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="text-sm uppercase tracking-widest text-text-muted font-bold mb-1">Business Impact</div>
              {study.results.map((r, i) => (
                <div key={i} className="border-2 border-slate-100 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-100 transition-all flex items-start gap-4">
                  <div className={`p-2 rounded-lg mt-0.5 ${accentMap[study.accent].split(' ')[1]} ${accentMap[study.accent].split(' ')[0]}`}>
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-sm font-black text-text-base mb-1">{r.title}</div>
                    <div className="text-sm text-text-muted font-medium leading-relaxed">{r.desc}</div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full mt-2 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-4 rounded-xl shadow-md cursor-pointer border-none transition-all"
              >
                Implement This Solution <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
