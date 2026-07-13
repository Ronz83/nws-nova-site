import { useState } from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "why-caribbean-businesses-need-ai-receptionists",
    category: "AI Operations",
    categoryColor: "sky",
    title: "Why Caribbean Businesses Are Losing Leads to Voicemail — And How to Fix It",
    excerpt: "The average Caribbean SME misses 40% of inbound calls during peak hours. Here's a breakdown of the operational cost and the exact system we deploy to solve it.",
    date: "June 10, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "custom-website-vs-webflow-wordpress",
    category: "Web Design",
    categoryColor: "amber",
    title: "Custom-Coded vs. Webflow vs. WordPress — What Actually Converts in 2026",
    excerpt: "We analyzed 80+ SME websites across the Caribbean. Here's what we found about load times, conversion rates, and why template sites are leaving money on the table.",
    date: "June 5, 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "CRM-crm-setup-guide-caribbean-sme",
    category: "CRM & Automations",
    categoryColor: "emerald",
    title: "The Complete CRM CRM Setup Guide for Caribbean SMEs",
    excerpt: "A step-by-step walkthrough of how we configure CRM for service businesses — pipelines, automations, lead scoring, and SMS sequences.",
    date: "May 28, 2026",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "ai-voice-receptionist-vs-human-receptionist-cost",
    category: "AI Operations",
    categoryColor: "sky",
    title: "AI Voice Receptionist vs. Human Receptionist — A Real Cost Comparison",
    excerpt: "Breaking down the true cost of a human receptionist (salary, taxes, training, turnover) vs. an AI system that scales infinitely at a flat monthly fee.",
    date: "May 20, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "reputation-management-google-reviews-local-seo",
    category: "Local SEO",
    categoryColor: "violet",
    title: "How to Build 50+ Google Reviews Automatically (Without Begging Customers)",
    excerpt: "Reputation is a ranking signal. Here's the exact automated SMS sequence we use to turn happy customers into published reviews — consistently.",
    date: "May 12, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "nova-ai-employee-training-protocol",
    category: "AI Receptionists",
    categoryColor: "indigo",
    title: "Inside the Training Protocol: How We Teach AI to Sound Like Your Business",
    excerpt: "A behind-the-scenes look at how we ingest a client's domain, configure escalation rules, and test the AI agent across 20+ call scenarios before go-live.",
    date: "May 1, 2026",
    readTime: "9 min read",
    featured: false,
  },
];

const colorMap: Record<string, string> = {
  sky:    "text-sky-700 bg-sky-50 border-sky-200",
  amber:  "text-amber-700 bg-amber-50 border-amber-200",
  emerald:"text-emerald-700 bg-emerald-50 border-emerald-200",
  violet: "text-violet-700 bg-violet-50 border-violet-200",
  indigo: "text-indigo-700 bg-indigo-50 border-indigo-200",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "AI Operations", "Web Design", "CRM & Automations", "Local SEO", "AI Receptionists"];

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);
  const featured = posts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Insights & Guides</span>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-[-0.04em] leading-[1.04] text-text-base mt-3">
            The NWS <span className="text-accent-primary">Playbook.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Practical guides, case studies, and insights for Caribbean business owners looking to automate operations and grow intelligently.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-b border-border-base bg-white sticky top-[80px] z-30">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${activeCategory === cat ? "bg-sky-50 border-sky-300 text-sky-700" : "border-slate-200 text-text-muted hover:border-sky-200 bg-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === "All" && featured && (
        <section className="py-12 px-6 bg-white border-b border-border-base">
          <div className="max-w-6xl mx-auto">
            <div className="border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-white rounded-[28px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`text-sm uppercase tracking-widest font-bold border px-3 py-1.5 rounded-full ${colorMap[featured.categoryColor]}`}>
                  <Tag size={9} className="inline mr-1" />{featured.category}
                </span>
                <span className="text-sm uppercase tracking-widest text-text-muted font-bold border border-amber-200 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">⭐ Featured</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-text-base leading-tight mb-4 max-w-3xl">{featured.title}</h2>
              <p className="text-sm text-text-muted font-medium leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-sm text-text-muted font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock size={11} /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <Link to={`/blog/${featured.slug}`} className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold text-sky-600 hover:text-sky-800 transition-colors">
                  Read Article <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group border-2 border-slate-100 bg-white rounded-[20px] p-6 flex flex-col gap-4 hover:border-sky-200 hover:shadow-md transition-all"
            >
              <span className={`text-sm uppercase tracking-widest font-bold border px-3 py-1.5 rounded-full self-start ${colorMap[post.categoryColor]}`}>
                {post.category}
              </span>
              <h3 className="text-base font-black text-text-base leading-snug group-hover:text-sky-700 transition-colors">{post.title}</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed flex-grow">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-text-muted font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
                <ArrowRight size={13} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
