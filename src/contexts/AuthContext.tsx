import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'agency_admin' | 'location_admin' | 'location_user';

export interface Permissions {
  operations: boolean;
  growth: boolean;
  automations: boolean;
  aiStudio: boolean;
  settings: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
  permissions: Permissions;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginAsAdmin: () => Promise<void>;
  loginAsEmployee: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserPermissions: (newPermissions: Permissions) => void;
}

const mockAdmin: User = {
  id: 'admin_123',
  name: 'NWS Super Admin',
  email: 'admin@noveltywebsolutions.com',
  role: 'agency_admin',
  permissions: {
    operations: true,
    growth: true,
    automations: true,
    aiStudio: true,
    settings: true
  }
};

const mockEmployee: User = {
  id: 'emp_456',
  name: 'John Doe',
  email: 'john@clientbusiness.com',
  role: 'location_user',
  clientId: 'client_acct_abc',
  permissions: {
    operations: true,
    growth: false,
    automations: false,
    aiStudio: false,
    settings: false
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockAdmin);
  const [isLoading, setIsLoading] = useState(false);

  const loginAsAdmin = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    setUser(mockAdmin);
    setIsLoading(false);
  };

  const loginAsEmployee = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 400));
    // When switching to employee, we use the permissions they currently hold
    // Since we'll let the admin edit the mockEmployee's permissions for demo, we'll store them in a ref or just use state.
    setUser(mockEmployee);
    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
  };

  const updateUserPermissions = (newPermissions: Permissions) => {
    if (user) {
      setUser({ ...user, permissions: newPermissions });
    }
    // Update the mock so it persists when switching back and forth
    mockEmployee.permissions = newPermissions;
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
