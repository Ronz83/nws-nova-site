import { useAuth } from '../contexts/AuthContext';
import { useFeatures } from '../contexts/FeatureContext';
import { Shield, Settings, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminToggleWidget() {
  const { user, loginAsAdmin, loginAsEmployee, logout } = useAuth();
  const { flags, toggleFlag } = useFeatures();
  const [isOpen, setIsOpen] = useState(false);

  // If there's no user, show a simple login widget
  if (!user) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 w-72">
          <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
            <Shield size={16} /> Login
          </h3>
          <div className="space-y-2">
            <button onClick={loginAsAdmin} className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-bold">Log In as Admin</button>
            <button onClick={loginAsEmployee} className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg px-4 py-2 text-sm font-bold">Log In as Employee</button>
          </div>
        </div>
      </div>
    );
  }

  // The main widget for admins to configure the client's view
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-[0px_10px_40px_rgba(12,26,46,0.1)] border-2 border-slate-200 w-80 mb-4 overflow-hidden"
          >
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Current User</p>
                <p className="font-bold">{user.name}</p>
                <p className="text-xs text-slate-300">{user.role}</p>
              </div>
              <UserCircle size={32} className="text-slate-400" />
            </div>

            <div className="p-4 bg-slate-50 border-b-2 border-slate-100">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Role Switching</p>
              <div className="flex gap-2">
                <button 
                  onClick={loginAsAdmin}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'agency_admin' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Admin
                </button>
                <button 
                  onClick={loginAsEmployee}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'location_user' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                >
                  Employee
                </button>
              </div>
            </div>

            {user.role === 'agency_admin' && (
              <div className="p-4 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Feature Toggles (Client View)</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">AI Studio</span>
                  <button 
                    onClick={() => toggleFlag('enable_ai_studio')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${flags.enable_ai_studio ? 'bg-sky-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${flags.enable_ai_studio ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Operations Hub</span>
                  <button 
                    onClick={() => toggleFlag('enable_operations')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${flags.enable_operations ? 'bg-sky-500' : 'bg-slate-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${flags.enable_operations ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>

              </div>
            )}

            <div className="p-2 bg-slate-50 border-t-2 border-slate-100">
               <button onClick={logout} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-red-500 transition-colors">Log Out</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center relative"
      >
        <Settings size={24} />
        {user.role === 'agency_admin' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-white"></span>
        )}
      </button>

    </div>
  );
}
