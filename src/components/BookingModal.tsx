import { X, Calendar } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-white border-2 border-border-base rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10 text-left font-sans">

        {/* Header */}
        <div className="px-8 py-5 border-b border-border-base flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-sky-200 bg-sky-50 rounded-xl text-sky-600 shadow-sm">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-text-base leading-tight">Book a Strategy Session</h3>
              <p className="text-[10px] text-text-muted font-mono tracking-wider uppercase mt-0.5">30-Minute Complimentary Consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full border border-border-base text-text-muted cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content / Iframe */}
        <div className="flex-1 w-full relative bg-slate-50/30">
          <iframe
            src="https://home.noveltywebsolutions.com/widget/booking/7XM9CtPbOpvqKfdXXFeq"
            style={{ width: "100%", height: "100%", border: "none" }}
            scrolling="yes"
            id="nws-ghl-booking-iframe"
            title="NWS Booking Calendar"
          />
        </div>

      </div>
    </div>
  );
}
