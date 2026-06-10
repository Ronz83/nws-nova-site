import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';

interface Props {
  demoId: string;
  businessName: string;
  primaryColor: string;
  greetingScript: string;
  logoUrl?: string;
  apiBase: string;
  onClose: () => void;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const ChatWidget: React.FC<Props> = ({
  demoId,
  businessName,
  primaryColor,
  greetingScript,
  logoUrl,
  apiBase,
  onClose,
}) => {
  const greeting = greetingScript || `Hi there! Thanks for reaching out to ${businessName}. How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greeting },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/demo-agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demo_id: demoId,
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.status === 'success' && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: "I'm sorry, I had trouble responding. Please try again!" },
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Connection issue — please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[560px] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-background/95 border border-border backdrop-blur-xl text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Chat header */}
      <div
        className="px-4 py-3.5 flex items-center gap-3 text-white flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${primaryColor}f0, ${primaryColor})` }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-full" />
          ) : (
            <Bot className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight truncate">{businessName}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-[11px] font-medium">AI Receptionist · Online</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0 bg-background/40">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {msg.role === 'assistant' && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
                  style={{ background: `${primaryColor}22` }}
                >
                  <Bot className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                </div>
              )}
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-muted border border-border text-foreground rounded-bl-sm'
                }`}
                style={msg.role === 'user' ? { background: primaryColor } : {}}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-end gap-2"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${primaryColor}22` }}
              >
                <Bot className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              </div>
              <div className="bg-muted border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="px-3 py-3 bg-background/80 border-t border-border flex items-center gap-2 flex-shrink-0">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 bg-muted border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60"
          style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
          style={{ background: primaryColor }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
