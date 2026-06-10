import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import BookingModal from "../components/BookingModal";

export default function Contact() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, show success state. Wire to Formspree / EmailJS / GHL webhook when ready.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-text-base">

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-tint border-b border-border-base relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100 blur-[120px] rounded-full pointer-events-none opacity-70"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Get in Touch</span>
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight leading-[1.04] text-text-base mt-3">
            Let's build something <span className="italic text-accent-primary">remarkable.</span>
          </h1>
          <p className="mt-5 text-sm text-text-muted max-w-xl mx-auto leading-relaxed font-medium">
            Send us a message, book a strategy call, or reach out directly. We respond to all inquiries within one business day.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left: Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Contact Cards */}
            {[
              { icon: <Mail size={18} />, label: "Email Us", value: "hello@noveltywebsolutions.com", sub: "We reply within 1 business day", color: "sky" },
              { icon: <MapPin size={18} />, label: "Location", value: "Barbados, West Indies", sub: "Serving Caribbean & Global clients", color: "emerald" },
              { icon: <Clock size={18} />, label: "Business Hours", value: "Mon–Fri · 9AM–6PM AST", sub: "Nova handles after-hours inquiries", color: "amber" },
            ].map(c => (
              <div key={c.label} className={`border-2 border-slate-100 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-${c.color}-100 transition-all`}>
                <div className={`p-2.5 bg-${c.color}-50 border border-${c.color}-100 text-${c.color}-600 rounded-xl w-fit mb-4 shadow-sm`}>
                  {c.icon}
                </div>
                <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold block mb-1">{c.label}</span>
                <div className="text-sm font-black text-text-base">{c.value}</div>
                <div className="text-[10px] text-text-muted font-medium mt-1">{c.sub}</div>
              </div>
            ))}

            {/* Booking CTA Card */}
            <div className="bg-ocean-gradient rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full pointer-events-none"></div>
              <div className="relative z-10">
                <Phone size={20} className="text-amber-300 mb-3" />
                <h4 className="font-black text-base mb-2">Prefer a call?</h4>
                <p className="text-xs text-sky-100 font-medium leading-relaxed mb-4">Book a free 30-minute strategy call directly with Ronald.</p>
                <button onClick={() => setIsBookingOpen(true)} className="w-full bg-white hover:bg-sky-50 text-sky-800 font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-xl cursor-pointer border-none transition-all shadow-md">
                  Book a Call
                </button>
              </div>
            </div>

          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 border-2 border-slate-100 bg-white rounded-[28px] p-8 md:p-10 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-black text-text-base">Message Sent!</h3>
                <p className="text-sm text-text-muted font-medium max-w-sm">We'll review your inquiry and get back to you within one business day. If it's urgent, book a call directly.</p>
                <button onClick={() => setIsBookingOpen(true)} className="mt-2 text-xs uppercase tracking-[0.18em] font-bold bg-accent-deep text-white px-6 py-3 rounded-xl cursor-pointer border-none shadow-md">
                  Book a Call Now
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-black text-text-base">Send a Message</h2>
                  <p className="text-xs text-text-muted mt-1 font-medium">Tell us about your project and we'll follow up with a tailored recommendation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name",    label: "Your Name",    placeholder: "Ronald P.",         type: "text" },
                    { name: "email",   label: "Email Address", placeholder: "you@company.com",   type: "email" },
                    { name: "company", label: "Company",       placeholder: "Acme Corp",          type: "text" },
                  ].map(f => (
                    <div key={f.name} className={f.name === "company" ? "sm:col-span-2" : ""}>
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        required={f.name !== "company"}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 rounded-xl px-4 py-3 text-sm text-text-base font-medium placeholder:text-slate-300 outline-none transition-all bg-white"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-2">Service Interest</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 rounded-xl px-4 py-3 text-sm text-text-base font-medium outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">Select a service...</option>
                    <option>Website Design</option>
                    <option>AI Voice Receptionist (Nova)</option>
                    <option>CRM & Automations</option>
                    <option>Reputation Management</option>
                    <option>Full Operations Package</option>
                    <option>I'm not sure — I need guidance</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business and what you're looking to improve..."
                    className="w-full border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 rounded-xl px-4 py-3 text-sm text-text-base font-medium placeholder:text-slate-300 outline-none transition-all resize-none bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] font-bold bg-accent-deep hover:bg-sky-800 text-white px-7 py-4 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer border-none w-full sm:w-auto self-start"
                >
                  <Send size={12} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
