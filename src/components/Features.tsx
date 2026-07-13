import React from "react";
import { Workflow, Layers, ArrowUpRight, Sparkles } from "lucide-react";

interface ProductCardProps {
  className?: string;
  children: React.ReactNode;
}

function ProductCard({ className = "", children }: ProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-glow-container relative rounded-[24px] border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-card-bg p-8 md:p-9 flex flex-col justify-between overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-lg hover:border-sky-200 dark:hover:border-sky-800 cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 dark:from-sky-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="products" className="py-24 px-6 border-t border-border-base bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
          <div className="max-w-xl">
            <span className="text-sm uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 font-bold">Our Products</span>
            <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
              Software built to run your business.
            </h2>
          </div>
          <p className="text-sm sm:text-sm text-text-muted leading-relaxed max-w-sm font-medium">
            From the ultimate operating system for service businesses to bespoke web applications. We build the tools that power your growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Business OS */}
          <a href="https://businessesos.com" target="_blank" rel="noopener noreferrer" className="contents">
            <ProductCard className="min-h-[400px]">
              <div className="flex justify-between items-start w-full">
                <div className="p-3 rounded-xl border border-sky-100 dark:border-sky-900 bg-sky-50 dark:bg-sky-900/30 shadow-sm">
                  <Workflow size={24} className="text-sky-600 dark:text-sky-400" />
                </div>
                <span className="text-sm uppercase tracking-widest text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="my-8 flex-grow flex flex-col justify-center text-left font-sans">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-text-base flex items-center gap-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  Business OS
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-base text-text-muted leading-relaxed font-medium">
                  The ultimate operating system for your business. Consolidate your CRM, unify your inbox, and deploy an AI Receptionist to answer your calls 24/7. Never miss a lead again.
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 w-full text-sm text-text-muted font-mono font-bold">
                <span>businessesos.com</span>
                <span className="text-sky-600 dark:text-sky-400 uppercase tracking-widest font-bold group-hover:underline">Explore OS →</span>
              </div>
            </ProductCard>
          </a>

          {/* TicketFlows (Coming Soon) */}
          <ProductCard className="min-h-[400px] opacity-80 hover:opacity-100">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 rounded-xl border border-amber-100 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/30 shadow-sm">
                <Layers size={24} className="text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm uppercase tracking-widest text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-2">
                <Sparkles size={12} />
                Coming Soon
              </span>
            </div>
            <div className="my-8 flex-grow flex flex-col justify-center text-left font-sans">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-text-base flex items-center gap-1.5 transition-colors">
                TicketFlows
              </h3>
              <p className="text-base text-text-muted leading-relaxed font-medium">
                The modern ticketing and support desk platform designed for speed. Streamline your customer support and automate your resolution workflows.
              </p>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 w-full text-sm text-text-muted font-mono font-bold">
              <span>Internal Alpha</span>
              <span className="text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold">Join Waitlist</span>
            </div>
          </ProductCard>

        </div>
      </div>
    </section>
  );
}
