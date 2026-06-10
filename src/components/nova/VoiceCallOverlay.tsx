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
        // 1. Pre-flight Mic Check
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (micErr) {
          console.error("Microphone permission denied:", micErr);
          setStatus('error');
          setMicError(true);
          // Don't set generic errorMsg, the UI will handle micError specially
          return;
        }

        // 2. Ask backend to provision a Vapi agent and get the web call URL
        const res = await fetch(`${apiBase}/api/demo-agent/start-call`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ demo_id: demoId }),
        });

        const data = await res.json();
        if (data.status !== 'success' || !data.assistant_id || !data.public_key) {
          throw new Error(data.message || 'Failed to provision agent');
        }

        // Resolve Vapi class constructor safely to handle Vite/Rollup module interop issues
        const VapiClass = (Vapi as any).default || Vapi;
        const vapi = new VapiClass(data.public_key);
        vapiRef.current = vapi;

        vapi.on('call-start', () => {
          setStatus('active');
          vapi.setMuted(false); // Force unmute
          setIsMuted(false);
          timerRef.current = setInterval(() => setElapsedSeconds(p => p + 1), 1000);
        });

        vapi.on('call-end', () => {
          setStatus('ended');
          if (timerRef.current) clearInterval(timerRef.current);
        });

        vapi.on('speech-start', () => {/* could animate mic */});

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
          console.error('Vapi error:', err);
          setStatus('error');
          setErrorMsg(err.message || 'Unknown error');
          if (timerRef.current) clearInterval(timerRef.current);
        });

        await vapi.start(data.assistant_id);
      } catch (e: unknown) {
        console.error('Call init error:', e);
        setStatus('error');
        setErrorMsg(e instanceof Error ? e.message : 'Failed to start call');
      }
    };

    initCall();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
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
    if (isMuted) {
      vapiRef.current.setMuted(false);
    } else {
      vapiRef.current.setMuted(true);
    }
    setIsMuted(p => !p);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-sm bg-background/95 border border-border backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col text-foreground"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div 
          className="w-full pt-10 pb-8 px-6 flex flex-col items-center justify-center relative shrink-0"
          style={{ background: primaryColor }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center mb-4 ring-4 ring-white/20">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain rounded-sm" />
            ) : (
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <h3 className="text-white font-black text-2xl tracking-tight relative z-10 text-center">{businessName}</h3>
          <span className="text-white/70 text-sm font-medium mt-1 relative z-10">AI Receptionist</span>
          {status === 'active' && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">{formatTime(elapsedSeconds)}</span>
            </div>
          )}
        </div>

        {/* Center: Mic animation */}
        <div className="flex flex-col items-center py-10 px-6 gap-4">
          <AnimatePresence mode="wait">
            {status === 'connecting' && (
              <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: primaryColor }} />
                  <div className="absolute inset-2 rounded-full animate-ping opacity-20 animation-delay-200" style={{ background: primaryColor }} />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}22` }}>
                    <Mic className="w-10 h-10" style={{ color: primaryColor }} />
                  </div>
                </div>
                <p className="text-muted-foreground font-medium text-sm">Connecting to Nova...</p>
              </motion.div>
            )}

            {status === 'active' && (
              <motion.div key="active" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 w-full">
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: primaryColor }}
                  />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}22` }}>
                    {isMuted
                      ? <MicOff className="w-10 h-10" style={{ color: primaryColor }} />
                      : <Mic className="w-10 h-10" style={{ color: primaryColor }} />
                    }
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 font-bold text-sm">Connected</span>
                </div>

                {/* Transcript */}
                {transcript.length > 0 && (
                  <div className="w-full max-h-36 overflow-y-auto flex flex-col gap-2 mt-2 px-1">
                    {transcript.map((t, i) => (
                      <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                            t.role === 'user'
                              ? 'text-white rounded-br-sm'
                              : 'bg-muted border border-border text-foreground rounded-bl-sm'
                          }`}
                          style={t.role === 'user' ? { background: primaryColor } : {}}
                        >
                          {t.text}
                        </div>
                      </div>
                    ))}
                    <div ref={transcriptEndRef} />
                  </div>
                )}
              </motion.div>
            )}

            {status === 'ended' && (
              <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="font-black text-foreground">Call Ended</p>
                <p className="text-muted-foreground text-xs">Thank you for testing the demo</p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center mb-2">
                  <PhoneOff className="w-8 h-8" />
                </div>
                <h4 className="text-foreground font-bold text-lg">Connection Failed</h4>
                {micError ? (
                  <div className="text-sm text-muted-foreground text-center max-w-[250px]">
                    Microphone access was denied. Please allow microphone permissions in your browser to test the voice agent.
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm text-center max-w-[200px]">{errorMsg || "Could not reach the AI agent."}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div className="pb-8 px-6 flex items-center justify-center gap-4">
          {status === 'active' && (
            <button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}

          {(status === 'active' || status === 'connecting') && (
            <button
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:scale-105 cursor-pointer"
              title="End call"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          )}

          {(status === 'ended' || status === 'error') && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-white transition-all hover:opacity-90 cursor-pointer"
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
