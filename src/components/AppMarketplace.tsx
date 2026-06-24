import { Building2, UtensilsCrossed, Stethoscope, HardHat, Plus } from "lucide-react";

interface AppMarketplaceProps {
  onBookDemo: () => void;
}

export default function AppMarketplace({ onBookDemo }: AppMarketplaceProps) {
  const industries = [
    {
      name: "Real Estate OS",
      icon: <Building2 size={24} />,
      desc: "Lead capture, buyer/seller nurture, automated follow-up sequences",
      color: "sky"
    },
    {
      name: "Hospitality OS",
      icon: <UtensilsCrossed size={24} />,
      desc: "Reservation management, guest follow-up, reputation automation",
      color: "amber"
    },
    {
      name: "Medical & Clinic OS",
      icon: <Stethoscope size={24} />,
      desc: "Patient intake, appointment reminders, HIPAA-aligned workflows",
      color: "emerald"
    },
    {
      name: "Construction OS",
      icon: <HardHat size={24} />,
      desc: "Quote requests, project pipelines, client communication automation",
      color: "sky"
    }
  ];

  return (
    <section className="py-16 px-6 bg-slate-50 border-t border-border-base">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl tracking-tight leading-none text-text-base font-sans font-black">
            Industry Operating Systems
          </h2>
          <p className="mt-3 text-sm text-text-muted leading-relaxed font-medium">
            Purpose-built for your sector. Add any OS to your account for <span className="font-bold text-sky-600">$97/month</span>.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map(industry => {
            const isSky = industry.color === "sky";
            const isAmber = industry.color === "amber";
            
            const bgClass = isSky ? "bg-sky-50 text-sky-600 border-sky-100" : isAmber ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100";
            const hoverClass = isSky ? "hover:border-sky-300" : isAmber ? "hover:border-amber-300" : "hover:border-emerald-300";
            
            return (
              <div key={industry.name} className={`bg-white border-2 border-slate-100 rounded-2xl p-6 flex flex-col items-start shadow-sm transition-all duration-300 ${hoverClass}`}>
                <div className={`p-4 rounded-full border mb-5 ${bgClass}`}>
                  {industry.icon}
                </div>
                <h3 className="text-lg font-black text-text-base mb-2">{industry.name}</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed flex-grow mb-6">
                  {industry.desc}
                </p>
                
                <div className="w-full flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <span className="text-sm font-bold text-sky-700 uppercase tracking-wider">$97/mo Add-On</span>
                  <button 
                    onClick={onBookDemo}
                    className="flex items-center gap-1.5 text-sm uppercase font-bold tracking-wider text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
