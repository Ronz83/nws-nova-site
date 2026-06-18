import { useState } from "react";
import { MessageSquare, PhoneCall } from "lucide-react";
import BookingModal from "./BookingModal";
import { useSamantha } from "../context/SamanthaContext";

export default function LiveDemo() {
  const [showBooking, setShowBooking] = useState(false);
  const { openChat, openVoice } = useSamantha();

  // Vapi is wired via /api/demo-agent/start-call (Vercel serverless)
  const hasVapiKeys = true;

  const handleOpenVoice = () => {
    if (hasVapiKeys) {
      openVoice();
    } else {
      setShowBooking(true);
    }
  };

  const handleOpenChat = () => {
    openChat();
  };

  return (
    <section id="demo" className="py-24 px-6 border-t border-border-base bg-bg-tint relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Interactive Sandbox</span>
        <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
          See Samantha in Action.
        </h2>
        <p className="mt-4 text-xs sm:text-sm text-text-muted leading-relaxed max-w-xl mx-auto font-medium">
          Interact with Samantha, our autonomous voice and chat receptionist, in real-time. Test its capabilities or schedule a custom integration session.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

          {/* Chat demo */}
          <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="p-4 border border-sky-100 rounded-2xl w-fit bg-sky-50 text-sky-600 mb-6 shadow-sm">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-black text-text-base mb-2">Test Live Chat</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6 font-medium">
                Simulate an online conversation with our AI receptionist trained on NWS capabilities.
              </p>
            </div>
            <button
              onClick={handleOpenChat}
              className="text-xs uppercase tracking-[0.15em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-6 py-3.5 rounded-xl transition-all duration-300 w-full shadow-md hover:shadow-lg border-none cursor-pointer"
            >
              Open Chat
            </button>
          </div>

          {/* Voice demo */}
          <div className="border-2 border-slate-100 bg-white rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="p-4 border border-amber-100 rounded-2xl w-fit bg-amber-50 text-amber-600 mb-6 shadow-sm">
                <PhoneCall size={24} />
              </div>
              <h3 className="text-lg font-black text-text-base mb-2">Test Live Voice</h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6 font-medium">
                Speak directly with Samantha through your browser microphone. No phone numbers required.
              </p>
            </div>
            <button
              onClick={handleOpenVoice}
              className="text-xs uppercase tracking-[0.15em] font-bold border-2 border-slate-200 hover:border-amber-300 px-6 py-3 rounded-xl text-text-muted hover:text-amber-700 transition-all duration-300 w-full hover:bg-amber-50 cursor-pointer"
            >
              Request a Live Demo
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal Fallback */}
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </section>
  );
}
