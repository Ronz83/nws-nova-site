import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// NWS default widget IDs (shown on the public site only)
export const NWS_VOICE_WIDGET_ID = '6914a81b33e99255993705fa';
export const NWS_CHAT_WIDGET_ID = '6a556b66d166a8719f167972';

interface SamanthaContextType {
  isVoiceOpen: boolean;
  isChatOpen: boolean;
  openVoice: () => void;
  closeVoice: () => void;
  openChat: () => void;
  closeChat: () => void;
  closeAll: () => void;
  // Dynamic widget IDs — overridden when a client is logged in
  chatWidgetId: string;
  voiceWidgetId: string;
  setChatWidgetId: (id: string) => void;
  setVoiceWidgetId: (id: string) => void;
}

const SamanthaContext = createContext<SamanthaContextType | undefined>(undefined);

export function SamanthaProvider({ children }: { children: ReactNode }) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatWidgetId, setChatWidgetId] = useState(NWS_CHAT_WIDGET_ID);
  const [voiceWidgetId, setVoiceWidgetId] = useState(NWS_VOICE_WIDGET_ID);

  const openVoice = () => {
    setIsVoiceOpen(true);
    setIsChatOpen(false);
  };

  const closeVoice = () => setIsVoiceOpen(false);

  const openChat = () => {
    setIsChatOpen(true);
    setIsVoiceOpen(false);
  };

  const closeChat = () => setIsChatOpen(false);

  const closeAll = () => {
    setIsVoiceOpen(false);
    setIsChatOpen(false);
  };

  return (
    <SamanthaContext.Provider value={{
      isVoiceOpen, isChatOpen,
      openVoice, closeVoice,
      openChat, closeChat, closeAll,
      chatWidgetId, voiceWidgetId,
      setChatWidgetId, setVoiceWidgetId,
    }}>
      {children}
    </SamanthaContext.Provider>
  );
}

export function useSamantha() {
  const context = useContext(SamanthaContext);
  if (context === undefined) {
    throw new Error('useSamantha must be used within a SamanthaProvider');
  }
  return context;
}
