import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SamanthaContextType {
  isVoiceOpen: boolean;
  isChatOpen: boolean;
  openVoice: () => void;
  closeVoice: () => void;
  openChat: () => void;
  closeChat: () => void;
  closeAll: () => void;
}

const SamanthaContext = createContext<SamanthaContextType | undefined>(undefined);

export function SamanthaProvider({ children }: { children: ReactNode }) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    <SamanthaContext.Provider value={{ isVoiceOpen, isChatOpen, openVoice, closeVoice, openChat, closeChat, closeAll }}>
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
