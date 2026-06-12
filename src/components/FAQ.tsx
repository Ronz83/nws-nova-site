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
    a: "Solo ($299/mo): Voice AI receptionist, unlimited inbound call handling, website hosting, CRM sync, and monthly performance reporting. Business ($599/mo): All of the above plus custom workflow automations, multi-channel outreach (SMS + email drips), reputation management, and priority support.",
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
    a: "We configure custom escalation protocols. The AI can route calls to a human, send an SMS to your mobile, create a support ticket, or offer a callback — depending on what you define.",
  },
  {
    q: "Is there a setup fee?",
    a: "Yes. Website design projects start at $1,500 (one-time). The AI setup fee is $499 for Solo and $799 for Business — this covers voice tuning, CRM mapping, and a launch testing sprint.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 border-t border-border-base bg-white">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-sky-600 font-bold">Questions Answered</span>
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
                  <div className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? "border-sky-300 bg-sky-50 text-sky-600 rotate-180" : "border-slate-200 text-slate-400"}`}>
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
