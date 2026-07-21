import { useEffect, useRef } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { useSamantha, NWS_VOICE_WIDGET_ID, NWS_CHAT_WIDGET_ID } from '../../context/SamanthaContext';
import { useAuth } from '../../contexts/AuthContext';

export function GlobalSamantha() {
  const { isChatOpen, openChat, closeChat, isVoiceOpen, closeVoice, chatWidgetId, voiceWidgetId, setChatWidgetId, setVoiceWidgetId } = useSamantha();
  const { user } = useAuth();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const voiceContainerRef = useRef<HTMLDivElement>(null);

  // When a client logs in with a real locationId, fetch their specific widget IDs from GHL
  useEffect(() => {
    if (!user?.clientId) {
      setChatWidgetId(NWS_CHAT_WIDGET_ID);
      setVoiceWidgetId(NWS_VOICE_WIDGET_ID);
      return;
    }

    if (user.role === 'agency_admin') return;

    fetch(`/api/ghl/chat-widget?locationId=${user.clientId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.chatWidgetId && data.chatEnabled) setChatWidgetId(data.chatWidgetId);
          if (data.voiceWidgetId && data.voiceEnabled) setVoiceWidgetId(data.voiceWidgetId);
        }
      })
      .catch(err => console.warn('Failed to load client chat widget IDs:', err));
  }, [user?.clientId, user?.role]);

  // Load the GHL loader script once
  useEffect(() => {
    if (!document.querySelector('script[src*="leadconnectorhq.com/loader.js"]')) {
      const script = document.createElement('script');
      script.src = "https://beta.leadconnectorhq.com/loader.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Inject Chat Widget into its container
  useEffect(() => {
    if (chatContainerRef.current) {
      const existing = chatContainerRef.current.querySelector('chat-widget');
      if (existing) existing.remove();
      const chatWidget = document.createElement('chat-widget');
      chatWidget.setAttribute('data-widget-id', chatWidgetId);
      chatWidget.setAttribute('style', 'width: 100%; height: 100%; border: none;');
      chatContainerRef.current.appendChild(chatWidget);
    }
    return () => {
      const chat = chatContainerRef.current?.querySelector('chat-widget');
      if (chat) chat.remove();
    };
  }, [chatWidgetId]);

  // Inject Voice Widget into its container when modal is open
  useEffect(() => {
    if (isVoiceOpen && voiceContainerRef.current) {
      const existing = voiceContainerRef.current.querySelector('chat-widget');
      if (existing) existing.remove();
      const voiceWidget = document.createElement('chat-widget');
      voiceWidget.setAttribute('data-widget-id', voiceWidgetId);
      voiceWidget.setAttribute('style', 'width: 100%; height: 100%; border: none;');
      voiceContainerRef.current.appendChild(voiceWidget);
    }
    return () => {
      const voice = voiceContainerRef.current?.querySelector('chat-widget');
      if (voice) voice.remove();
    };
  }, [isVoiceOpen, voiceWidgetId]);

  if (user?.role === 'agency_admin') return null;

  return (
    <>
      {/* Chat Feature - Fixed Bottom Left */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4 pointer-events-none">
        <div 
          className={`transition-all duration-300 origin-bottom-left pointer-events-auto ${
            isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute bottom-20'
          }`}
          style={{ width: '360px', height: '600px', maxHeight: '80vh' }}
        >
          <div ref={chatContainerRef} className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"></div>
        </div>

        <button 
          onClick={() => isChatOpen ? closeChat() : openChat()}
          className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xl hover:bg-sky-500 transition-all hover:scale-105 pointer-events-auto"
          aria-label="Toggle Chat"
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      {/* Voice Overlay Modal */}
      {isVoiceOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeVoice}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg h-[80vh] max-h-[700px] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
              <h3 className="font-black text-sm uppercase tracking-wider text-sky-600 flex items-center gap-2">
                <Phone size={14} /> Talk to Samantha
              </h3>
              <button onClick={closeVoice} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent">
                <X size={18} className="text-slate-500" />
              </button>
            </div>
            <div ref={voiceContainerRef} className="flex-1 w-full" />
          </div>
        </div>
      )}
    </>
  );
}
