import { Zap, Settings, ExternalLink, X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PLAYBOOKS = [
  { id: '1', title: 'Full AI Call Routing', description: 'Route all incoming calls through our AI receptionist.', status: 'inactive', triggers: 0, tier: 'pro' },
  { id: '2', title: 'After-Hours AI Overflow', description: 'AI handles calls outside of your business hours.', status: 'active', triggers: 45, tier: 'base' },
  { id: '3', title: 'Service Booking Assistant', description: 'AI assistant that qualifies and books appointments.', status: 'inactive', triggers: 0, tier: 'pro' },
  { id: '4', title: 'Automotive Stale Lead Revival', description: 'Engage leads older than 30 days with a special offer.', status: 'inactive', triggers: 0, tier: 'base' },
];

interface Playbook {
  id: string;
  title: string;
  description: string;
  status: string;
  triggers: number;
  tier: string;
}

export function DashboardAutomations() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>(INITIAL_PLAYBOOKS);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  // Modal Form State
  const [forwardingNumber, setForwardingNumber] = useState('');
  const [bookingLink, setBookingLink] = useState('');
  const [aiPersona, setAiPersona] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleClick = (pb: Playbook) => {
    if (pb.status === 'inactive') {
      if (pb.tier === 'pro') {
        setIsUpgradeModalOpen(true);
      } else {
        setSelectedPlaybook(pb);
        setIsSetupModalOpen(true);
        // Reset form
        setForwardingNumber('');
        setBookingLink('');
        setAiPersona('');
      }
    } else {
      // Toggle off
      setPlaybooks(playbooks.map(p => p.id === pb.id ? { ...p, status: 'inactive' } : p));
    }
  };

  const handleSaveAndActivate = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/ghl/custom-values', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forwardingNumber,
          bookingLink,
          aiPersona,
          playbookId: selectedPlaybook?.id
        })
      });
    } catch (e) {
      console.error('Failed to update GHL custom values', e);
    }
    
    setPlaybooks(playbooks.map(p => p.id === selectedPlaybook?.id ? { ...p, status: 'active' } : p));
    setIsLoading(false);
    setIsSetupModalOpen(false);
    setSelectedPlaybook(null);
  };

  return (
    <>
      <header className="mb-10 mt-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl text-slate-900 font-black mb-4 tracking-tight">Automations Hub</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Manage your playbooks and workflow automations.</p>
          </div>
          <button className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-slate-800 transition-colors">
             <Settings className="w-4 h-4" /> Advanced Builder
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 max-w-5xl">
        {playbooks.map(pb => (
          <div key={pb.id} className="bg-white rounded-[24px] border-2 border-slate-200 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:border-sky-300 transition-colors group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 border border-sky-100 mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  {pb.tier === 'pro' && (
                    <span className="px-2.5 py-1 text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg shadow-sm mb-4">PRO</span>
                  )}
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={pb.status === 'active'} 
                      onChange={() => handleToggleClick(pb)} 
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors shadow-inner ${pb.status === 'active' ? 'bg-sky-500' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow transition-transform ${pb.status === 'active' ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">{pb.title}</h3>
              <p className="text-slate-600 font-medium mb-6">{pb.description}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-slate-100">
              <span className="text-sm font-bold text-slate-500">
                <span className="text-slate-900">{pb.triggers}</span> triggers this month
              </span>
              <button className="text-sky-600 hover:text-sky-800 text-sm font-bold flex items-center gap-1 transition-colors">
                Edit <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isSetupModalOpen && selectedPlaybook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => !isLoading && setIsSetupModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.2)] border-2 border-slate-200 overflow-hidden pointer-events-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Quick Setup</h2>
                    <p className="text-slate-600 font-medium mt-1">{selectedPlaybook.title}</p>
                  </div>
                  <button 
                    onClick={() => !isLoading && setIsSetupModalOpen(false)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Target Forwarding Number</label>
                    <input 
                      type="text" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      value={forwardingNumber}
                      onChange={(e) => setForwardingNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Calendar Booking Link</label>
                    <input 
                      type="url" 
                      placeholder="https://calendly.com/your-link" 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      value={bookingLink}
                      onChange={(e) => setBookingLink(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">AI Persona Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sarah, Auto-Assistant" 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 font-medium text-slate-900 transition-all placeholder:text-slate-400"
                      value={aiPersona}
                      onChange={(e) => setAiPersona(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={handleSaveAndActivate}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-sky-500 hover:bg-sky-600 text-white font-black text-lg rounded-xl shadow-[0_8px_30px_rgba(14,165,233,0.3)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Activating...
                      </>
                    ) : (
                      'Save & Activate'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpgradeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md pointer-events-auto"
              onClick={() => setIsUpgradeModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 rounded-[32px] shadow-[0_64px_128px_rgba(0,0,0,0.4)] border border-slate-700 overflow-hidden pointer-events-auto"
            >
              <div className="p-6 sm:p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight mb-4">Upgrade to Unlock</h2>
                <p className="text-slate-400 font-medium mb-8 text-lg">
                  This automation is available on the Pro plan. Upgrade your account to access advanced AI capabilities and exclusive playbooks.
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setIsUpgradeModalOpen(false)}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-lg rounded-xl shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all active:scale-[0.98]"
                  >
                    Upgrade Plan
                  </button>
                  <button 
                    onClick={() => setIsUpgradeModalOpen(false)}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-lg rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
