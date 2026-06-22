import { useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useSamantha } from '../../context/SamanthaContext';
import { VoiceCallOverlay } from './VoiceCallOverlay';

export function GlobalSamantha() {
  const { isChatOpen, openChat, closeChat, isVoiceOpen, closeVoice } = useSamantha();
  const voiceContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ensure loader script exists only once
    if (!document.querySelector('script[src="https://beta.leadconnectorhq.com/loader.js"]')) {
      const script = document.createElement('script');
      script.src = "https://beta.leadconnectorhq.com/loader.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // 2. Inject Voice Widget inside our fixed container
    if (voiceContainerRef.current && !voiceContainerRef.current.querySelector('chat-widget')) {
      const voiceWidget = document.createElement('chat-widget');
      voiceWidget.setAttribute('data-widget-id', '6914a81b33e99255993705fa');
      voiceContainerRef.current.appendChild(voiceWidget);
    }

    // 3. Inject Chat Widget inside our fixed container
    if (chatContainerRef.current && !chatContainerRef.current.querySelector('chat-widget')) {
      const chatWidget = document.createElement('chat-widget');
      chatWidget.setAttribute('data-widget-id', '6a2f1df4e20523fdce316b75');
      // Force inline style so it fills our container
      chatWidget.setAttribute('style', 'width: 100%; height: 100%; border: none;');
      chatContainerRef.current.appendChild(chatWidget);
    }

    return () => {
      // Cleanup custom elements on unmount
      const voice = voiceContainerRef.current?.querySelector('chat-widget');
      if (voice) voice.remove();
      const chat = chatContainerRef.current?.querySelector('chat-widget');
      if (chat) chat.remove();
    };
  }, []);

  return (
    <>
      {/* Call Feature - Fixed Bottom Right */}
      <div 
        ref={voiceContainerRef} 
        className="fixed bottom-6 right-6 z-[9999]"
      ></div>

      {/* Message Feature - Fixed Bottom Left */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4 pointer-events-none">
        
        {/* Chat Window Container */}
        <div 
          className={`transition-all duration-300 origin-bottom-left pointer-events-auto ${
            isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute bottom-20'
          }`}
          style={{ width: '360px', height: '600px', maxHeight: '80vh' }}
        >
          {/* We use a container to crop/style the GHL widget iframe */}
          <div ref={chatContainerRef} className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"></div>
        </div>

        {/* Custom Chat Toggle Button */}
        <button 
          onClick={() => isChatOpen ? closeChat() : openChat()}
          className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xl hover:bg-sky-500 transition-all hover:scale-105 pointer-events-auto"
          aria-label="Toggle Chat"
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>

      </div>

      {isVoiceOpen && (
        <VoiceCallOverlay
          demoId="global-samantha"
          businessName="Novelty Web Solutions"
          primaryColor="#0284c7"
          apiBase="/api/demo-agent/start-call"
          onClose={closeVoice}
        />
      )}
    </>
  );
}
