import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type UserRole = 'agency_admin' | 'location_admin' | 'location_user';

export interface Permissions {
  operations: boolean;
  growth: boolean;
  automations: boolean;
  aiStudio: boolean;
  settings: boolean;
  requireUpgrade: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
  permissions: Permissions;
  businessName: string;
  businessLogo: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginAsAdmin: () => Promise<void>;
  loginAsEmployee: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserPermissions: (newPermissions: Permissions) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to determine default permissions based on location/plan
function getDefaultPermissions(locationId: string | null, role: string | null): Permissions {
  // If they are an agency admin, they get everything
  if (role === 'agency_admin') {
    return { operations: true, growth: true, automations: true, aiStudio: true, settings: true, requireUpgrade: false };
  }
  
  // Example for specific manual clients like Automotive Art
  // Replace this ID with the actual locationId for Automotive Art once known.
  const AUTOMOTIVE_ART_LOCATION_ID = 'automotive_art_demo_id';
  if (locationId === AUTOMOTIVE_ART_LOCATION_ID) {
    return { operations: true, growth: true, automations: true, aiStudio: true, settings: true, requireUpgrade: false };
  }

  // Default for all other new users
  return { operations: false, growth: false, automations: false, aiStudio: false, settings: false, requireUpgrade: true };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Securely check for authentication parameters injected by GoHighLevel
  useEffect(() => {
    const fetchUserAndPermissions = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const roleParam = params.get('role') as UserRole || 'location_user';
        const userId = params.get('userId') || params.get('user_id');
        const locationId = params.get('locationId') || params.get('location_id');
        
        // For local dev fallback if no userId is passed
        if (!userId) {
           if (roleParam === 'agency_admin') {
             setUser({
               id: 'admin_123', name: 'NWS Super Admin', email: 'admin@noveltywebsolutions.com', role: 'agency_admin',
               permissions: { operations: true, growth: true, automations: true, aiStudio: true, settings: true, requireUpgrade: false },
               businessName: 'Business OS', businessLogo: '/business_os_logo.png'
             });
           } else if (roleParam === 'location_user') {
             setUser({
               id: 'emp_456', name: 'John Doe', email: 'john@clientbusiness.com', role: 'location_user', clientId: 'client_acct_abc',
               permissions: { operations: true, growth: false, automations: false, aiStudio: false, settings: false, requireUpgrade: true },
               businessName: 'Business OS', businessLogo: '/business_os_logo.png'
             });
           } else {
             setUser(null);
           }
           setIsLoading(false);
           return;
        }

        // Fetch user permissions from Supabase
        const { data, error } = await supabase
          .from('user_permissions')
          .select('*')
          .eq('ghl_user_id', userId)
          .single();

        let permissions: Permissions;

        if (error && error.code === 'PGRST116') {
          // No rows found, create one with defaults
          permissions = getDefaultPermissions(locationId, roleParam);
          await supabase.from('user_permissions').insert({
            ghl_user_id: userId,
            role: roleParam,
            location_id: locationId,
            operations: permissions.operations,
            growth: permissions.growth,
            automations: permissions.automations,
            ai_studio: permissions.aiStudio,
            settings: permissions.settings,
            require_upgrade: permissions.requireUpgrade
          });
        } else if (data) {
          permissions = {
            operations: data.operations,
            growth: data.growth,
            automations: data.automations,
            aiStudio: data.ai_studio,
            settings: data.settings,
            requireUpgrade: data.require_upgrade !== undefined ? data.require_upgrade : true
          };
        } else {
          // Fallback if there was another DB error
          permissions = getDefaultPermissions(locationId, roleParam);
        }

        let businessName = "Business OS";
        let businessLogo = "/business_os_logo.png";

        if (locationId) {
          try {
            const res = await fetch(`/api/ghl/location?locationId=${locationId}`);
            if (res.ok) {
              const locData = await res.json();
              businessName = locData.name || businessName;
              businessLogo = locData.logoUrl || businessLogo;
            }
          } catch (e) {
            console.warn("Failed to fetch location data", e);
          }
        }

        setUser({
          id: userId,
          name: params.get('name') || 'GHL User',
          email: params.get('email') || '',
          role: roleParam,
          clientId: locationId || undefined,
          permissions,
          businessName,
          businessLogo
        });

      } catch (err) {
        console.error('Failed to load user permissions:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndPermissions();
  }, []);

  const loginAsAdmin = async () => {
    console.warn("Direct login disabled in production. Authenticate via GHL SSO.");
  };

  const loginAsEmployee = async () => {
    console.warn("Direct login disabled in production. Authenticate via GHL SSO.");
  };

  const logout = async () => {
    setUser(null);
  };

  const updateUserPermissions = async (newPermissions: Permissions) => {
    if (user) {
      // Optimistic update in UI
      setUser({ ...user, permissions: newPermissions });
      
      // Update in Supabase
      if (user.id !== 'admin_123' && user.id !== 'emp_456') {
        await supabase.from('user_permissions').update({
          operations: newPermissions.operations,
          growth: newPermissions.growth,
          automations: newPermissions.automations,
          ai_studio: newPermissions.aiStudio,
          settings: newPermissions.settings,
          require_upgrade: newPermissions.requireUpgrade,
          updated_at: new Date().toISOString()
        }).eq('ghl_user_id', user.id);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginAsAdmin, loginAsEmployee, logout, updateUserPermissions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
