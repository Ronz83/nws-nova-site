import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOff, Mic, MicOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface Props {
  demoId: string;
  businessName: string;
  primaryColor: string;
  apiBase: string;
  logoUrl?: string;
  onClose: () => void;
  // Pre-provisioned agent (from workbench) — skips the API call
  assistantId?: string;
  publicKey?: string;
}

type CallStatus = 'connecting' | 'active' | 'ended' | 'error';

interface Transcript {
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
}) => {
  const [status, setStatus] = useState<CallStatus>('connecting');
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [micError, setMicError] = useState(false);
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

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

        // Use pre-provisioned agent if available, otherwise call the API
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

        vapi.on('call-end', () => {
          setStatus('ended');
          if (timerRef.current) clearInterval(timerRef.current);
        });

        vapi.on('message', (msg: any) => {
          if (msg.type === 'transcript' && msg.transcriptType === 'final') {
            setTranscript(prev => [
              ...prev,
              { role: msg.role === 'assistant' ? 'assistant' : 'user', text: msg.transcript },
            ]);
            setTimeout(() => {
              transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
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
    };
  }, [demoId, apiBase]);

  const handleEndCall = () => {
    vapiRef.current?.stop();
    setStatus('ended');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const toggleMute = () => {
    if (!vapiRef.current) return;
    vapiRef.current.setMuted(!isMuted);
    setIsMuted(p => !p);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{ fontFamily: "'Inter', sans-serif", maxHeight: '90vh' }}
      >
        {/* Header — brand colour strip */}
        <div className="w-full pt-8 pb-6 px-5 flex flex-col items-center shrink-0" style={{ background: primaryColor }}>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 ring-4 ring-white/20">
            {logoUrl
              ? <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain" />
              : <Mic className="w-7 h-7 text-white" />
            }
          </div>
          <h3 className="text-white font-black text-xl tracking-tight">{businessName}</h3>
          <p className="text-white/70 text-xs font-medium mt-0.5">AI Receptionist</p>
          {status === 'active' && (
            <div className="mt-2 flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-xs font-bold text-white">{formatTime(elapsedSeconds)}</span>
            </div>
          )}
        </div>

        {/* Transcript / status area — always white */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-4 flex flex-col gap-3 min-h-[200px] max-h-[340px]">
          <AnimatePresence mode="wait">

            {/* CONNECTING */}
            {status === 'connecting' && (
              <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-3 py-8">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: primaryColor }} />
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                    <Mic className="w-7 h-7" style={{ color: primaryColor }} />
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium">Connecting to Nova…</p>
              </motion.div>
            )}

            {/* ACTIVE — chat bubbles */}
            {status === 'active' && (
              <motion.div key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2 w-full">
                {transcript.length === 0 && (
                  <div className="flex items-center justify-center gap-2 py-6 text-slate-400 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Nova is listening…</span>
                  </div>
                )}
                {transcript.map((t, i) => (
                  <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {t.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full flex-shrink-0 mr-2 flex items-center justify-center self-end mb-0.5" style={{ background: primaryColor }}>
                        <Mic className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm ${
                        t.role === 'user'
                          ? 'bg-slate-100 text-slate-800 rounded-br-sm'
                          : 'text-white rounded-bl-sm'
                      }`}
                      style={t.role === 'assistant' ? { background: primaryColor } : {}}
                    >
                      {t.text}
                    </div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </motion.div>
            )}

            {/* ENDED */}
            {status === 'ended' && (
              <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="font-black text-slate-800 text-base">Call Ended</p>
                <p className="text-slate-500 text-xs max-w-[200px]">Thanks for testing Nova. We'll follow up shortly!</p>
              </motion.div>
            )}

            {/* ERROR */}
            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
                  <PhoneOff className="w-6 h-6 text-red-400" />
                </div>
                <p className="font-bold text-slate-800">Connection Failed</p>
                {micError
                  ? <p className="text-slate-500 text-xs max-w-[220px]">Microphone access was denied. Please allow mic permissions in your browser and try again.</p>
                  : <p className="text-slate-500 text-xs max-w-[200px]">{errorMsg || 'Could not reach Nova.'}</p>
                }
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Controls — bottom bar */}
        <div className="bg-slate-50 border-t border-slate-100 px-5 py-4 flex items-center justify-center gap-4 shrink-0">
          {status === 'active' && (
            <button
              onClick={toggleMute}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border-2 ${isMuted ? 'bg-slate-200 border-slate-300 text-slate-500' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}

          {(status === 'active' || status === 'connecting') && (
            <button
              onClick={handleEndCall}
              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-200 transition-all cursor-pointer border-none"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          )}

          {(status === 'ended' || status === 'error') && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 cursor-pointer border-none"
              style={{ background: primaryColor }}
            >
              Close
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
