import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface FeatureFlags {
  enable_ai_studio: boolean;
  enable_operations: boolean;
  enable_growth: boolean;
  enable_training: boolean;
}

// Granular per-feature flags from GHL Custom Values
export interface GranularFeatures {
  pipeline_management: boolean;
  contact_crm: boolean;
  advanced_analytics: boolean;
  review_automation: boolean;
  social_scheduler: boolean;
  email_campaigns: boolean;
  universal_chat_ai: boolean;
  pro_chat_ai: boolean;
  voice_ai_agent: boolean;
  router_agent: boolean;
  ai_knowledge_base: boolean;
  lead_capture_workflow: boolean;
  followup_workflow: boolean;
  booking_confirmation: boolean;
  upgrade_nudge: boolean;
  onboarding_videos: boolean;
  advanced_playbooks: boolean;
  // Promotions
  holiday_promo_banner: boolean;
  bogo_offer_widget: boolean;
  seasonal_landing_page: boolean;
  referral_program: boolean;
  flash_sale_timer: boolean;
  // Premium
  vibe_coder_access: boolean;
  white_label_branding: boolean;
  api_access: boolean;
  [key: string]: boolean;
}

interface FeatureContextType {
  flags: FeatureFlags;
  features: GranularFeatures;
  planTier: string;
  toggleFlag: (flagName: keyof FeatureFlags) => Promise<void>;
  isLoadingFlags: boolean;
}

const defaultFlags: FeatureFlags = {
  enable_ai_studio: true,
  enable_operations: true,
  enable_growth: true,
  enable_training: true,
};

const allFeaturesOff: GranularFeatures = {
  pipeline_management: false,
  contact_crm: false,
  advanced_analytics: false,
  review_automation: false,
  social_scheduler: false,
  email_campaigns: false,
  universal_chat_ai: false,
  pro_chat_ai: false,
  voice_ai_agent: false,
  router_agent: false,
  ai_knowledge_base: false,
  lead_capture_workflow: false,
  followup_workflow: false,
  booking_confirmation: false,
  upgrade_nudge: false,
  onboarding_videos: false,
  advanced_playbooks: false,
  holiday_promo_banner: false,
  bogo_offer_widget: false,
  seasonal_landing_page: false,
  referral_program: false,
  flash_sale_timer: false,
  vibe_coder_access: false,
  white_label_branding: false,
  api_access: false,
};

const allFeaturesOn: GranularFeatures = Object.fromEntries(
  Object.keys(allFeaturesOff).map((k) => [k, true])
) as GranularFeatures;

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const [features, setFeatures] = useState<GranularFeatures>(allFeaturesOff);
  const [planTier, setPlanTier] = useState<string>('growth');
  const [isLoadingFlags, setIsLoadingFlags] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Agency admins get everything — no GHL fetch needed
    if (user.role === 'agency_admin') {
      setFlags(defaultFlags);
      setFeatures(allFeaturesOn);
      setPlanTier('elite');
      return;
    }

    // If we have a locationId (client sub-account), fetch feature flags from GHL
    if (user.clientId) {
      fetchGHLFeatureFlags(user.clientId);
    } else {
      // Fallback: localStorage-based flags for local dev
      const savedFlags = localStorage.getItem(`features_${user.id}`);
      if (savedFlags) {
        setFlags(JSON.parse(savedFlags));
      } else {
        setFlags({
          enable_ai_studio: false,
          enable_operations: true,
          enable_growth: true,
          enable_training: true,
        });
      }
    }
  }, [user]);

  async function fetchGHLFeatureFlags(locationId: string) {
    setIsLoadingFlags(true);
    try {
      const res = await fetch(`/api/ghl/feature-flags?locationId=${locationId}`);
      if (!res.ok) {
        console.warn('Failed to fetch GHL feature flags, using defaults');
        return;
      }

      const data = await res.json();
      if (data.success) {
        // Set section-level flags
        setFlags({
          enable_operations: data.sections?.enable_operations ?? true,
          enable_ai_studio: data.sections?.enable_ai_studio ?? false,
          enable_growth: data.sections?.enable_growth ?? false,
          enable_training: data.sections?.enable_training ?? true,
        });

        // Set granular per-feature flags
        setFeatures({
          ...allFeaturesOff,
          ...data.features,
        });

        // Set plan tier
        if (data.planTier) {
          setPlanTier(data.planTier);
        }
      }
    } catch (err) {
      console.warn('Error fetching GHL feature flags:', err);
    } finally {
      setIsLoadingFlags(false);
    }
  }

  const toggleFlag = async (flagName: keyof FeatureFlags) => {
    setFlags((prev) => {
      const nextFlags = { ...prev, [flagName]: !prev[flagName] };
      if (user?.clientId) {
        localStorage.setItem(`features_${user.clientId}`, JSON.stringify(nextFlags));
      }
      return nextFlags;
    });
  };

  return (
    <FeatureContext.Provider value={{ flags, features, planTier, toggleFlag, isLoadingFlags }}>
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
