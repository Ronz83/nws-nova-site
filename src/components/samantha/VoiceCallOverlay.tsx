import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Mic, MicOff, MessageSquare, Phone, X, Send, Loader2, Volume2 } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface Props {
  demoId: string;
  businessName: string;
  primaryColor: string;
  apiBase: string;
  logoUrl?: string;
  onClose: () => void;
  assistantId?: string;
  publicKey?: string;
  industry?: string;
}

type CallStatus = 'connecting' | 'active' | 'ended' | 'error';
type Tab = 'voice' | 'chat';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const VoiceCallOverlay: React.FC<Props> = ({
  demoId,
  businessName,
  primaryColor,
  apiBase,
  logoUrl,
  onClose,
  assistantId: propAssistantId,
  publicKey: propPublicKey,
  industry = 'General Business',
}) => {
  const [status, setStatus] = useState<CallStatus>('connecting');
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [micError, setMicError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('voice');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'assistant', text: `Hi! I'm the AI agent for ${businessName}. How can I help you today?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);

  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // --- Body scroll lock ---
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // --- Voice call init ---
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const initCall = async () => {
      try {
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch {
          setStatus('error');
          setMicError(true);
          return;
        }

        let resolvedAssistantId: string;
        let resolvedPublicKey: string;

        if (propAssistantId && propPublicKey) {
          resolvedAssistantId = propAssistantId;
          resolvedPublicKey = propPublicKey;
        } else {
          const res = await fetch(`${apiBase}/api/demo-agent/start-call`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ demo_id: demoId }),
          });
          const data = await res.json();
          if (data.status !== 'success' || !data.assistant_id || !data.public_key) {
            throw new Error(data.message || 'Failed to provision agent');
          }
          resolvedAssistantId = data.assistant_id;
          resolvedPublicKey = data.public_key;
        }

        const VapiClass = (Vapi as any).default || Vapi;
        const vapi = new VapiClass(resolvedPublicKey);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          setStatus('active');
          vapi.setMuted(false);
          setIsMuted(false);
          timerRef.current = setInterval(() => setElapsedSeconds(p => p + 1), 1000);
        });

        vapi.on('speech-start', () => setIsAgentSpeaking(true));
        vapi.on('speech-end', () => setIsAgentSpeaking(false));

        vapi.on('call-end', () => {
          setStatus('ended');
          setIsAgentSpeaking(false);
          if (timerRef.current) clearInterval(timerRef.current);
        });

        vapi.on('message', (msg: any) => {
          if (msg.type === 'transcript' && msg.transcriptType === 'final') {
            setTranscript(prev => [
              ...prev,
              { role: msg.role === 'assistant' ? 'assistant' : 'user', text: msg.transcript },
            ]);
            setTimeout(() => transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
          }
        });

        vapi.on('error', (err: Error) => {
          setStatus('error');
          setErrorMsg(err.message || 'Unknown error');
          if (timerRef.current) clearInterval(timerRef.current);
        });

        await vapi.start(resolvedAssistantId);
      } catch (e: unknown) {
        setStatus('error');
        setErrorMsg(e instanceof Error ? e.message : 'Failed to start call');
      }
    };

    initCall();

    return () => {
      if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
      if (vapiRef.current) vapiRef.current.stop();
    };
  }, [demoId, apiBase, propAssistantId, propPublicKey]);

  const handleEndCall = () => {
    vapiRef.current?.stop();
    setStatus('ended');
    setIsAgentSpeaking(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const toggleMute = () => {
    if (!vapiRef.current) return;
    vapiRef.current.setMuted(!isMuted);
    setIsMuted(p => !p);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || isSending) return;
    setChatInput('');
    const userMsg: Message = { role: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    setIsSending(true);

    try {
      const res = await fetch('/api/workbench/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.reply || "I'm sorry, I didn't catch that. Could you rephrase?";
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsSending(false);
      chatInputRef.current?.focus();
    }
  };

  const DARK_BG = '#080f1e';
  const CARD_BG = '#0d1b30';
  const BORDER = 'rgba(255,255,255,0.08)';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="w-full max-w-sm flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: CARD_BG, border: `1px solid ${BORDER}`, maxHeight: '88vh', fontFamily: "'Inter', sans-serif" }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header bar */}
        <div className="shrink-0 px-5 pt-5 pb-4" style={{ background: DARK_BG, borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between mb-4">
            {/* Avatar + info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* Outer pulse rings when agent speaking */}
                {isAgentSpeaking && (
                  <>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: primaryColor, transform: 'scale(1.5)' }} />
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: primaryColor, transform: 'scale(2)', animationDelay: '0.3s' }} />
                  </>
                )}
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}25`, border: `2px solid ${primaryColor}50` }}>
                  {logoUrl
                    ? <img src={logoUrl} alt="Logo" className="w-7 h-7 object-contain" />
                    : <Volume2 className="w-5 h-5" style={{ color: primaryColor }} />
                  }
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-base leading-tight">{businessName}</h3>
                <p className="text-xs font-medium" style={{ color: `${primaryColor}cc` }}>AI Receptionist</p>
              </div>
            </div>

            {/* Status pill + close */}
            <div className="flex items-center gap-2">
              {status === 'active' && (
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: `${primaryColor}30`, border: `1px solid ${primaryColor}50` }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {formatTime(elapsedSeconds)}
                </div>
              )}
              {status === 'connecting' && (
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white/60" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}` }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Connecting
                </div>
              )}
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10 cursor-pointer border-none bg-transparent text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 gap-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {(['voice', 'chat'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center justify-center gap-2 text-[12px] font-bold py-2 rounded-lg transition-all cursor-pointer border-none"
                style={{
                  background: activeTab === tab ? primaryColor : 'transparent',
                  color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.45)',
                }}
              >
                {tab === 'voice' ? <Phone size={12} /> : <MessageSquare size={12} />}
                {tab === 'voice' ? 'Voice Call' : 'Text Chat'}
              </button>
            ))}
          </div>
        </div>

        {/* VOICE TAB */}
        {activeTab === 'voice' && (
          <div className="flex-1 flex flex-col min-h-0" style={{ background: CARD_BG }}>

            {/* Transcript area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[220px] max-h-[320px]">
              <AnimatePresence mode="wait">

                {status === 'connecting' && (
                  <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-4 py-12">
                    <div className="relative w-20 h-20">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="absolute inset-0 rounded-full animate-ping opacity-20"
                          style={{ background: primaryColor, animationDelay: `${i * 0.4}s`, animationDuration: '2s', transform: `scale(${1 + i * 0.3})` }} />
                      ))}
                      <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}20`, border: `2px solid ${primaryColor}40` }}>
                        <Mic className="w-8 h-8" style={{ color: primaryColor }} />
                      </div>
                    </div>
                    <p className="text-white/60 text-sm font-medium">Connecting your call...</p>
                    <p className="text-white/30 text-xs">Establishing secure connection</p>
                  </motion.div>
                )}

                {status === 'active' && (
                  <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                    {transcript.length === 0 && (
                      <div className="flex flex-col items-center gap-3 py-8">
                        {/* Audio visualizer bars */}
                        <div className="flex items-end gap-1 h-10">
                          {[3, 6, 4, 8, 5, 10, 7, 5, 9, 6, 4, 7].map((h, i) => (
                            <div
                              key={i}
                              className="w-1 rounded-full"
                              style={{
                                height: isAgentSpeaking ? `${h * 3}px` : '4px',
                                background: primaryColor,
                                opacity: isAgentSpeaking ? 0.8 : 0.3,
                                transition: `height 0.${2 + (i % 4)}s ease`,
                                animationDelay: `${i * 0.05}s`,
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-white/50 text-xs font-medium">
                          {isAgentSpeaking ? 'Agent is speaking...' : 'Listening — speak now'}
                        </p>
                      </div>
                    )}
                    {transcript.map((t, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${t.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {t.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5" style={{ background: primaryColor }}>
                            <Mic className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[78%]"
                          style={{
                            background: t.role === 'user' ? 'rgba(255,255,255,0.08)' : primaryColor,
                            color: 'white',
                            borderRadius: t.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          }}
                        >
                          {t.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={transcriptEndRef} />
                  </motion.div>
                )}

                {status === 'ended' && (
                  <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.15)', border: '2px solid rgba(52,211,153,0.3)' }}>
                      <span className="text-2xl text-emerald-400">✓</span>
                    </div>
                    <div>
                      <p className="font-black text-white text-base">Call Ended</p>
                      <p className="text-white/50 text-xs mt-1 max-w-[200px]">Thanks for testing the demo. Switch to Text Chat to continue the conversation.</p>
                    </div>
                    <button onClick={() => setActiveTab('chat')}
                      className="text-xs font-bold px-4 py-2 rounded-xl cursor-pointer border-none transition-all hover:opacity-80"
                      style={{ background: `${primaryColor}25`, color: primaryColor, border: `1px solid ${primaryColor}40` }}>
                      Continue in Text Chat
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.3)' }}>
                      <PhoneOff className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <p className="font-black text-white text-base">Connection Failed</p>
                      <p className="text-white/50 text-xs mt-1 max-w-[220px]">
                        {micError
                          ? 'Microphone access denied. Please allow mic permissions and try again.'
                          : (errorMsg || 'Could not reach the agent. Try Text Chat instead.')}
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('chat')}
                      className="text-xs font-bold px-4 py-2 rounded-xl cursor-pointer border-none transition-all hover:opacity-80"
                      style={{ background: `${primaryColor}25`, color: primaryColor, border: `1px solid ${primaryColor}40` }}>
                      Switch to Text Chat
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Voice controls */}
            <div className="shrink-0 px-5 py-4 flex items-center justify-center gap-4" style={{ borderTop: `1px solid ${BORDER}`, background: DARK_BG }}>
              {(status === 'active' || status === 'connecting') && (
                <>
                  {status === 'active' && (
                    <button onClick={toggleMute}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer border-none"
                      style={{
                        background: isMuted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)',
                        border: `1.5px solid ${isMuted ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)'}`,
                        color: isMuted ? '#f87171' : 'rgba(255,255,255,0.7)',
                      }}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  )}
                  <button onClick={handleEndCall}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer border-none"
                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 8px 24px rgba(239,68,68,0.4)' }}>
                    <PhoneOff className="w-6 h-6 text-white" />
                  </button>
                </>
              )}
              {(status === 'ended' || status === 'error') && (
                <button onClick={onClose}
                  className="px-8 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 cursor-pointer border-none"
                  style={{ background: primaryColor }}>
                  Close
                </button>
              )}
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0" style={{ background: CARD_BG }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px] max-h-[380px]">
              {chatMessages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mb-0.5 text-[9px] font-black text-white" style={{ background: primaryColor }}>
                      AI
                    </div>
                  )}
                  <div
                    className="px-4 py-3 text-sm leading-relaxed max-w-[80%]"
                    style={{
                      background: msg.role === 'user' ? 'rgba(255,255,255,0.08)' : primaryColor,
                      color: 'white',
                      borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isSending && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-black text-white" style={{ background: primaryColor }}>AI</div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5" style={{ background: primaryColor }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <div className="shrink-0 px-4 py-4" style={{ borderTop: `1px solid ${BORDER}`, background: DARK_BG }}>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)', border: `1.5px solid rgba(255,255,255,0.1)` }}>
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); } }}
                  placeholder={`Ask anything about ${businessName}...`}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 border-none outline-none"
                  disabled={isSending}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!chatInput.trim() || isSending}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none disabled:opacity-30"
                  style={{ background: chatInput.trim() && !isSending ? primaryColor : 'rgba(255,255,255,0.08)' }}
                >
                  {isSending ? <Loader2 size={14} className="text-white animate-spin" /> : <Send size={14} className="text-white" />}
                </button>
              </div>
              <p className="text-[10px] text-white/25 text-center mt-2">Press Enter to send</p>
            </div>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
};
