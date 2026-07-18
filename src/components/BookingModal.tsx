import { X, Calendar } from "lucide-react";
import { BOOKING_URL } from "../config/links";

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
      <div className="relative w-[95vw] max-w-[1050px] h-[90vh] bg-white border-2 border-border-base rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10 text-left font-sans">

        {/* Header */}
        <div className="px-8 py-5 border-b border-border-base flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-sky-200 bg-sky-50 rounded-xl text-sky-600 shadow-sm">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-text-base leading-tight">Book a Strategy Session</h3>
              <p className="text-sm text-text-muted font-mono tracking-wider uppercase mt-0.5">30-Minute Complimentary Consultation</p>
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
            src={BOOKING_URL}
            style={{ width: "100%", height: "100%", border: "none" }}
            scrolling="yes"
            id="nws-CRM-booking-iframe"
            title="NWS Booking Calendar"
          />
        </div>

        <div className="px-6 py-4 border-t border-border-base bg-white flex justify-end">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-[0.18em] font-bold text-sky-700 hover:text-sky-900 transition-colors"
          >
            Open Booking in New Tab
          </a>
        </div>

      </div>
    </div>
  );
}
