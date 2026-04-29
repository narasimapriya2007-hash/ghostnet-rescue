import React, { createContext, useContext, useState, useEffect } from 'react';
import { GhostNetAPI } from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ghostnet_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await GhostNetAPI.login(email, password);
      const userObj: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as any
      };
      setUser(userObj);
      localStorage.setItem('ghostnet_user', JSON.stringify(userObj));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const guestLogin = async () => {
    const guestUser: User = {
      id: 'guest_' + Math.random().toString(36).substr(2, 5),
      name: 'Emergency Guest',
      email: 'guest@ghostnet.rescue',
      role: 'citizen'
    };
    setUser(guestUser);
    localStorage.setItem('ghostnet_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ghostnet_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, guestLogin, logout, isLoading }}>
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
