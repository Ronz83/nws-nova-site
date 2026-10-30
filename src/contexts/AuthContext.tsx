import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'agency_admin' | 'location_admin' | 'location_user' | 'super_admin' | 'portal_admin' | 'portal_user';

export interface Permissions {
  operations: boolean;
  growth: boolean;
  automations: boolean;
  aiStudio: boolean;
  settings: boolean;
  requireUpgrade: boolean;
  primaryColor?: string;
  secondaryColor?: string;
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
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginAsAdmin: () => Promise<void>;
  loginAsEmployee: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserPermissions: (newPermissions: Permissions) => Promise<void>;
  isStaff: () => boolean;
  hasPortalAccess: (minRole: 'super_admin' | 'admin' | 'user') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Identity comes ONLY from the server session (HttpOnly cookie issued by /api/auth/sso or /api/auth/login).
  // URL params such as userId/role/email are never trusted.
  const loadSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/session', { credentials: 'same-origin' });
      const data = res.ok ? await res.json() : { user: null };
      const u: User | null = data.user || null;
      if (u && u.clientId) {
        try {
          const locRes = await fetch(`/api/ghl/location?locationId=${encodeURIComponent(u.clientId)}`);
          if (locRes.ok) {
            const loc = await locRes.json();
            u.businessName = loc.name || u.businessName;
            u.businessLogo = loc.logoUrl || u.businessLogo;
          }
        } catch (e) {
          console.warn('Failed to fetch location data', e);
        }
      }
      setUser(u);
    } catch (err) {
      console.error('Failed to load session:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const loginAsAdmin = async () => {
    console.warn('Direct login disabled in production. Authenticate via GHL SSO.');
  };

  const loginAsEmployee = async () => {
    console.warn('Direct login disabled in production. Authenticate via GHL SSO.');
  };

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to authenticate.');
    }
    await loadSession();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
    setUser(null);
  };

  const updateUserPermissions = async (newPermissions: Permissions) => {
    if (!user) return;
    const res = await fetch('/api/auth/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ userId: user.id, permissions: newPermissions }),
    });
    // Server enforces admin-only; only reflect the change if it was accepted.
    if (res.ok) setUser({ ...user, permissions: newPermissions });
  };

  const isStaff = () => {
    return user?.role === 'super_admin' || user?.role === 'portal_admin' || user?.role === 'portal_user';
  };

  const hasPortalAccess = (minRole: 'super_admin' | 'admin' | 'user') => {
    if (!isStaff()) return false;
    if (minRole === 'user') return true;
    if (minRole === 'admin') return user?.role === 'super_admin' || user?.role === 'portal_admin';
    if (minRole === 'super_admin') return user?.role === 'super_admin';
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginAsAdmin, loginAsEmployee, logout, updateUserPermissions, isStaff, hasPortalAccess }}>
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
