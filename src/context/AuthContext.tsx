import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession, setSession as saveSession, removeSession } from '../auth/auth.utils';
import { loginByToken } from '../services/auth.service';
import { UserType } from '../types/userType';

interface AuthContextType {
  user:UserType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: UserType, token: string) => void;
  logout: () => void;
  updateUser: (user: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = getSession();
        if (token) {
          const userData = await loginByToken(token);
          setUser(userData);
        }
      } catch (error) {
        removeSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData: UserType, token: string) => {
    saveSession(token);
    setUser(userData);
  };

  const logout = () => {
    removeSession();
    setUser(null);
  };

  const updateUser = (userData: UserType) => {
    setUser(userData);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
