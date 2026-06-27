import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface FeatureFlags {
  enable_ai_studio: boolean;
  enable_operations: boolean;
  enable_growth: boolean;
}

interface FeatureContextType {
  flags: FeatureFlags;
  toggleFlag: (flagName: keyof FeatureFlags) => Promise<void>;
  isLoadingFlags: boolean;
}

const defaultFlags: FeatureFlags = {
  enable_ai_studio: true,
  enable_operations: true,
  enable_growth: true,
};

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const isLoadingFlags = false;

  useEffect(() => {
    if (user?.role === 'location_user' || user?.role === 'location_admin') {
      const savedFlags = localStorage.getItem(`features_${user.clientId}`);
      if (savedFlags) {
        setFlags(JSON.parse(savedFlags));
      } else {
        setFlags({
          enable_ai_studio: false,
          enable_operations: true,
          enable_growth: true,
        });
      }
    } else if (user?.role === 'agency_admin') {
      setFlags(defaultFlags);
    }
  }, [user]);

  const toggleFlag = async (flagName: keyof FeatureFlags) => {
    setFlags((prev) => {
      const nextFlags = { ...prev, [flagName]: !prev[flagName] };
      localStorage.setItem('features_client_acct_abc', JSON.stringify(nextFlags));
      return nextFlags;
    });
  };

  return (
    <FeatureContext.Provider value={{ flags, toggleFlag, isLoadingFlags }}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
}
