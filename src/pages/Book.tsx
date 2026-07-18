import { BOOKING_URL } from "../config/links";

export default function Book() {
  return (
    <section className="min-h-[calc(100vh-96px)] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Schedule</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-text-base">
            Book Your Strategy Call
          </h1>
          <p className="mt-3 text-sm text-text-muted max-w-2xl mx-auto">
            Pick a time that works for you. If the embedded calendar has trouble loading, open it in a new tab.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-8 py-4 rounded-xl shadow-md transition-all duration-200"
          >
            Open Booking in New Tab
          </a>
        </div>

        <div className="rounded-[32px] overflow-hidden border-2 border-border-base bg-white shadow-xl">
          <iframe
            src={BOOKING_URL}
            style={{ width: "100%", height: "80vh", border: "none" }}
            scrolling="yes"
            title="NWS Booking Calendar"
          />
        </div>
      </div>
    </section>
  );
}
