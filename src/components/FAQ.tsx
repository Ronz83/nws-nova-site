import React from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How quickly can I have an AI receptionist answering calls?",
    a: "Typically 5–10 business days. We handle the voice tuning, knowledge base setup, CRM sync configuration, and a full test call suite before go-live. Existing businesses with a CRM workspace are often faster.",
  },
  {
    q: "What's included in the monthly retainer?",
    a: "Small Business Self-Serve plans on businessesos.com start at $0/mo (Stage 0 Micro-Vendor) and $97 / $197 / $297/mo (Tier 1 Small Business, with optional +$50/mo Starter AI or +$97/mo Pro Voice AI). On noveltywebsolutions.com, our Tier 2 MSB & Enterprise Full-Service engagements start at $997/mo (+$1,000 setup) for Commercial Growth Core, $1,497/mo (+$1,500 setup) for the Full Standalone App (TicketFlows or Dispatch OS Pro) + Tier 2 Business Suite Bundle, and $2,997–$5,000+/mo for Enterprise & Regional Transformation.",
  },
  {
    q: "Can the AI handle my industry's specific questions?",
    a: "Yes. We tune it on your own service offerings, pricing, FAQs, and escalation rules. The knowledge base is version-controlled and can be updated any time.",
  },
  {
    q: "Do I need technical experience to manage the system?",
    a: "No. Your CRM dashboard is a clean visual interface. You see live conversations, call logs, and contact cards. Our team handles all backend changes and model updates.",
  },
  {
    q: "What happens if the AI can't answer a question?",
    a: "We configure custom escalation protocols. The AI can route calls to a human, send a WhatsApp or OneSignal push notification to your mobile, create a support ticket, or offer a callback — depending on what you define.",
  },
  {
    q: "Is there a setup fee?",
    a: "Self-serve Stage 0 ($0/mo) and Tier 1 ($97 / $197 / $297/mo) plans on businessesos.com have $0 setup fee ($297/mo Pro includes our Dedicated Onboarding & Support Team). For Tier 2 MSB & Enterprise engagements on noveltywebsolutions.com, setup starts at $1,000 for Commercial Growth Core ($997/mo) and $1,500 for the Full Standalone App + Tier 2 Suite Bundle ($1,497/mo), scoped during your Discovery Call.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 border-t border-border-base bg-white">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <div className="text-center mb-14">
          <span className="text-sm uppercase tracking-[0.2em] text-sky-600 font-bold">Questions Answered</span>
          <h2 className="text-3xl md:text-5xl tracking-tight leading-none text-text-base mt-3 font-sans font-black">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${isOpen ? "border-sky-200 shadow-md bg-sky-50/40" : "border-slate-100 bg-white hover:border-sky-100"}`}
              >
                <div className="flex justify-between items-center p-5 md:p-6 gap-6">
                  <span className={`text-sm font-bold leading-snug text-left transition-colors ${isOpen ? "text-sky-700" : "text-text-base"}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? "border-sky-300 bg-sky-50 text-sky-600 rotate-180" : "border-slate-200 text-sky-600"}`}>
                    <ChevronDown size={14} strokeWidth={2.5} />
                  </div>
                </div>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 text-sm text-text-muted font-medium leading-relaxed text-left border-t border-sky-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
