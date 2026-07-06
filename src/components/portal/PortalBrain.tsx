import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, Bot, User, Cpu, Activity, Play, CheckCircle2 } from 'lucide-react';
import { usePortalBrain } from '../../context/PortalBrainContext';

export default function PortalBrain() {
  const { 
    isCommandBarOpen, closeCommandBar, 
    isChatPanelOpen, closeChatPanel, 
    messages, isLoading, sendCommand 
  } = usePortalBrain();

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto focus input when command bar opens
  useEffect(() => {
    if (isCommandBarOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandBarOpen]);

  // Auto scroll chat
  useEffect(() => {
    if (isChatPanelOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatPanelOpen, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      {/* COMMAND BAR (Spotlight) */}
      <AnimatePresence>
        {isCommandBarOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={closeCommandBar}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="relative flex items-center px-4 py-4 border-b border-slate-800">
                <Search className="w-5 h-5 text-sky-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask the Brain to do something... (e.g. 'List all active clients')"
                  className="w-full bg-transparent text-slate-100 placeholder-slate-500 outline-none text-lg"
                />
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono ml-4">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">ESC</span>
                  to close
                </div>
              </form>

              <div className="px-4 py-4 text-sm">
                <div className="text-slate-500 mb-2 px-2 text-xs uppercase tracking-wider font-semibold">Suggested Commands</div>
                <div className="space-y-1">
                  <button onClick={() => { setInputValue('List all active clients'); inputRef.current?.focus(); }} className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-3">
                    <Activity className="w-4 h-4 text-slate-400" />
                    List all active clients
                  </button>
                  <button onClick={() => { setInputValue('Check system deployment status'); inputRef.current?.focus(); }} className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-slate-400" />
                    Check system deployment status
                  </button>
                  <button onClick={() => { setInputValue('Create a high priority task for Apex Auto'); inputRef.current?.focus(); }} className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                    Create a high priority fulfillment task
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT PANEL (Sidebar) */}
      <AnimatePresence>
        {isChatPanelOpen && (
          <div className="fixed inset-0 z-[90] pointer-events-none flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto lg:hidden"
              onClick={closeChatPanel}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="relative w-full max-w-md h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">NWS Portal Brain</h2>
                    <p className="text-xs text-sky-400/80 font-mono">Agentic Mode Active</p>
                  </div>
                </div>
                <button onClick={closeChatPanel} className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6 opacity-60">
                    <Cpu className="w-12 h-12 text-slate-500 mb-4" />
                    <h3 className="text-lg font-medium text-slate-200 mb-2">How can I help you?</h3>
                    <p className="text-sm text-slate-400">Press ⌘K anywhere to open the command bar, or just start typing below.</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-sky-500/20 text-sky-400'
                      }`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        {msg.text && (
                          <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                            msg.role === 'user' 
                              ? 'bg-indigo-600 text-white rounded-tr-sm' 
                              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                          }`}>
                            {msg.text}
                          </div>
                        )}
                        
                        {/* Render tool executions */}
                        {msg.toolsExecuted && msg.toolsExecuted.length > 0 && (
                          <div className="flex flex-col gap-2 w-full mt-1">
                            {msg.toolsExecuted.map((tool, idx) => (
                              <div key={idx} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 w-full">
                                <div className="flex items-center gap-2 mb-2 text-xs font-mono">
                                  <div className="text-emerald-400"><Play className="w-3 h-3 fill-current" /></div>
                                  <span className="text-slate-300">Tool execution:</span>
                                  <span className="text-sky-400">{tool.name}</span>
                                </div>
                                <div className="bg-slate-950 rounded border border-slate-800 p-2 overflow-x-auto">
                                  <pre className="text-[10px] text-slate-400 font-mono">
                                    {JSON.stringify(tool.result, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex gap-3 flex-row">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message the Brain..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-full pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 p-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:hover:bg-sky-500 text-white rounded-full transition-colors"
                  >
                    <Command className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
