import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BrainMessage {
  id: string;
  role: 'user' | 'brain';
  text: string;
  toolsExecuted?: any[];
}

interface PortalBrainContextType {
  isCommandBarOpen: boolean;
  isChatPanelOpen: boolean;
  messages: BrainMessage[];
  isLoading: boolean;
  openCommandBar: () => void;
  closeCommandBar: () => void;
  openChatPanel: () => void;
  closeChatPanel: () => void;
  closeAll: () => void;
  sendCommand: (text: string) => Promise<void>;
  clearHistory: () => void;
}

const PortalBrainContext = createContext<PortalBrainContextType | undefined>(undefined);

export function PortalBrainProvider({ children }: { children: React.ReactNode }) {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [messages, setMessages] = useState<BrainMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load from session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('portal_brain_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to session storage on change
  useEffect(() => {
    sessionStorage.setItem('portal_brain_history', JSON.stringify(messages));
  }, [messages]);

  // Global hotkey for Command Bar (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandBarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCommandBar = () => setIsCommandBarOpen(true);
  const closeCommandBar = () => setIsCommandBarOpen(false);
  const openChatPanel = () => setIsChatPanelOpen(true);
  const closeChatPanel = () => setIsChatPanelOpen(false);
  
  const closeAll = () => {
    setIsCommandBarOpen(false);
    setIsChatPanelOpen(false);
  };

  const clearHistory = () => setMessages([]);

  const sendCommand = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMsg: BrainMessage = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // If sending from command bar, auto-switch to chat panel to see results
    if (isCommandBarOpen) {
      setIsCommandBarOpen(false);
      setIsChatPanelOpen(true);
    }

    try {
      const formattedHistory = messages.map(m => ({
        role: m.role === 'brain' ? 'model' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/brain/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationHistory: formattedHistory })
      });

      const data = await res.json();

      const brainMsg: BrainMessage = {
        id: (Date.now() + 1).toString(),
        role: 'brain',
        text: data.reply || "Done.",
        toolsExecuted: data.toolsExecuted || []
      };

      setMessages(prev => [...prev, brainMsg]);
    } catch (err) {
      console.error('Brain error:', err);
      const errorMsg: BrainMessage = {
        id: (Date.now() + 1).toString(),
        role: 'brain',
        text: 'Sorry, I encountered an error executing that command.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PortalBrainContext.Provider value={{
      isCommandBarOpen, isChatPanelOpen, messages, isLoading,
      openCommandBar, closeCommandBar, openChatPanel, closeChatPanel, closeAll,
      sendCommand, clearHistory
    }}>
      {children}
    </PortalBrainContext.Provider>
  );
}

export const usePortalBrain = () => {
  const context = useContext(PortalBrainContext);
  if (context === undefined) {
    throw new Error('usePortalBrain must be used within a PortalBrainProvider');
  }
  return context;
};
