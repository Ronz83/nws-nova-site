import { CheckCircle, ArrowRight } from "lucide-react";

interface AppMarketplaceProps {
  onBookDemo: () => void;
}

export default function AppMarketplace({ onBookDemo }: AppMarketplaceProps) {
  const bullets = [
    "Pre-built for 6+ industries (Dental, Legal, Roofing, Handyman, Chiropractor, and more)",
    "Free tier to get started — no credit card required",
    "Full AI stack: Voice Receptionist, CRM, Reputation Management, Unified Inbox",
  ];

  return (
    <section className="py-24 px-6 bg-white border-t border-border-base">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

        {/* Text Content */}
        <div className="flex-1">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Our Flagship Product</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Business OS — Your Industry, Pre-Built.
          </h2>
          <p className="mt-5 text-sm text-text-muted leading-relaxed font-medium max-w-xl">
            We built Business OS for SMBs who want enterprise-grade automation without the enterprise price tag. Pre-configured for your industry. No setup headaches. Live within 24 hours.
          </p>

          {/* Feature Bullets */}
          <ul className="mt-8 flex flex-col gap-4">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-medium">
                <CheckCircle size={18} className="shrink-0 mt-0.5 text-sky-500" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://businessesos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md transition-all duration-200"
          >
            Explore Business OS <ArrowRight size={14} />
          </a>
        </div>

        {/* Visual accent card */}
        <div className="flex-shrink-0 w-full lg:w-80 bg-gradient-to-br from-sky-50 to-white border-2 border-sky-100 rounded-[28px] p-8 shadow-sm flex flex-col gap-6">
          <div className="text-4xl font-black font-mono text-sky-600">$0</div>
          <div>
            <div className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-1">Free to start</div>
            <p className="text-sm text-text-muted font-medium leading-relaxed">No credit card required. Upgrade when you're ready to scale.</p>
          </div>
          <div className="border-t border-sky-100 pt-6">
            <div className="text-xs uppercase tracking-widest text-text-muted font-bold mb-3">Industries covered</div>
            <div className="flex flex-wrap gap-2">
              {["Dental", "Legal", "Roofing", "Handyman", "Chiro"].map(ind => (
                <span key={ind} className="text-xs font-bold bg-sky-100 text-sky-700 px-3 py-1 rounded-full">{ind}</span>
              ))}
              <span className="text-xs font-bold bg-slate-100 text-text-muted px-3 py-1 rounded-full">+ more</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
