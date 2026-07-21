import { ArrowRight, Sparkles } from "lucide-react";



export default function CTA() {
  return (
    <section className="px-6 py-10 bg-white border-t border-border-base">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-[28px] overflow-hidden bg-ocean-gradient p-12 md:p-16 text-center text-white shadow-2xl">

          {/* Background orbs */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-400/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/15 blur-[80px] rounded-full pointer-events-none"></div>

          {/* Grid overlay */}
          <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 rounded-full text-sm uppercase tracking-[0.2em] font-bold text-white shadow-sm backdrop-blur-sm">
              <Sparkles size={11} className="text-amber-300 animate-pulse" />
              <span>Complimentary — No Commitment</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-[-0.04em] leading-[1.06] text-white max-w-3xl">
              Ready to put your operations on{" "}
              <span className="text-amber-300">Autopilot?</span>
            </h2>

            <p className="text-sm text-sky-100 max-w-md leading-relaxed font-medium">
              Book a free 30-minute strategy call. We'll map your current pipeline, identify automation leverage points, and show you exactly what NWS can build.
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center mt-2">
              <a href="https://home.noveltywebsolutions.com/widget/bookings/nws_discovery-call" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm uppercase tracking-[0.18em] font-bold bg-white hover:bg-amber-50 text-sky-800 px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border-none">
                <span>Book Free Strategy Call</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <p className="text-sm text-sky-200/70 uppercase tracking-widest font-bold mt-2">
              30-Minute Call · No Credit Card Required · Caribbean &amp; Global
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
