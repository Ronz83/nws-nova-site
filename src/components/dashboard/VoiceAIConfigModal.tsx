import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Mic, Settings, Sliders, PhoneCall } from 'lucide-react';

interface VoiceAIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceAIConfigModal({ isOpen, onClose }: VoiceAIConfigModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('sip:agent-1a2b3c@vapi.nws.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-3xl bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shadow-md">
                  <Mic className="text-[24px]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Voice AI Configuration</h2>
                  <p className="text-sm text-slate-700 font-medium mt-1">Configure your autonomous phone agent</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
              
              {/* SIP Trunking Section */}
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <PhoneCall className="w-5 h-5 text-sky-400" />
                      <h3 className="text-lg font-bold text-white">SIP Trunking Endpoint</h3>
                    </div>
                    <p className="text-slate-600 text-sm max-w-md">
                      Provide this URI to your PBX administrator to route calls directly to this AI agent.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 w-full sm:w-auto">
                    <div className="px-4 py-2 font-mono text-sm text-sky-300 truncate w-full sm:w-auto max-w-[200px] sm:max-w-none">
                      sip:agent-1a2b3c@vapi.nws.com
                    </div>
                    <button
                      onClick={handleCopy}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex-shrink-0"
                      title="Copy SIP URI"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </section>

              {/* System Prompt & Messaging */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold text-slate-900">Behavior &amp; Persona</h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">System Prompt</label>
                  <p className="text-xs text-slate-700 mb-2">Define how the agent acts, its knowledge boundaries, and tone of voice.</p>
                  <textarea
                    rows={5}
                    className="w-full rounded-xl border-2 border-slate-300 p-4 text-slate-700 focus:border-sky-500 focus:ring-0 transition-colors bg-slate-50/50 hover:bg-white resize-none"
                    defaultValue="You are a helpful customer service representative for NWS. Your tone is professional, friendly, and concise. Always verify the customer's name and help them with their technical inquiries."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">First Message</label>
                  <p className="text-xs text-slate-700 mb-2">The exact first sentence the agent says when picking up the phone.</p>
                  <input
                    type="text"
                    className="w-full rounded-xl border-2 border-slate-300 p-4 text-slate-700 focus:border-sky-500 focus:ring-0 transition-colors bg-slate-50/50 hover:bg-white"
                    defaultValue="Hello! Thanks for calling NWS. How can I assist you today?"
                  />
                </div>
              </section>

              {/* Voice Settings */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sliders className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold text-slate-900">Voice Characteristics</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Voice Model</label>
                    <select className="w-full rounded-xl border-2 border-slate-300 p-4 text-slate-700 focus:border-sky-500 focus:ring-0 transition-colors bg-slate-50/50 hover:bg-white appearance-none">
                      <option>OpenAI - Alloy (Neutral)</option>
                      <option>OpenAI - Echo (Male)</option>
                      <option>OpenAI - Shimmer (Female)</option>
                      <option>ElevenLabs - Rachel</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Speaking Rate</label>
                    <div className="flex items-center gap-4 pt-4">
                      <span className="text-xs font-bold text-slate-600">Slow</span>
                      <input type="range" className="flex-1 accent-sky-500" defaultValue="50" />
                      <span className="text-xs font-bold text-slate-600">Fast</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors text-sm uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors text-sm uppercase tracking-wider shadow-md"
              >
                Save Configuration
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
