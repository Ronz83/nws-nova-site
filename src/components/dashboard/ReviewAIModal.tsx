import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, Store, CheckCircle2, ArrowRight } from 'lucide-react';

interface ReviewAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewAIModal({ isOpen, onClose }: ReviewAIModalProps) {
  const [step, setStep] = useState(1);

  const handleConnect = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000); // Simulate connection
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 2 ? handleClose : undefined}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Network className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Connect Integration</h2>
              </div>
              {step !== 2 && (
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-600 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-blue-100">
                      <Store className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Google Business Profile</h3>
                    <p className="text-slate-700 mb-8 max-w-sm mx-auto">
                      Connect your account to allow Review AI to automatically analyze and respond to customer reviews.
                    </p>
                    
                    <button
                      onClick={handleConnect}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      Connect with Google
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center py-8"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                      <Store className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Authenticating...</h3>
                    <p className="text-slate-700">Securely connecting to Google services.</p>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-emerald-100">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Connection Successful!</h3>
                    <p className="text-slate-700 mb-8 max-w-sm mx-auto">
                      Review AI is now authorized to manage your Google Business Profile reviews.
                    </p>
                    
                    <button
                      onClick={handleClose}
                      className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
