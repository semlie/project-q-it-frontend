import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession, setSession as saveSession, removeSession } from '../auth/auth.utils';
import { loginByToken } from '../services/auth.service';
import { UserType } from '../types/userType';

// interface User {
//   userId: number;
//   userName: string;
//   userEmail: string;
//   role: string;
//   schoolId: number;
//   userImageUrl?: string;
//   userPassword?: string;
// }

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

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      console.log('AuthContext: Loading user from token...');
      try {
        const token = getSession();
        console.log('AuthContext: Token from localStorage:', token ? 'Token exists' : 'No token');
        if (token) {
          const userData = await loginByToken(token);
          console.log('AuthContext: User data loaded:', userData);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user from token:', error);
        removeSession();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);
  const login = (userData: UserType, token: string) => {
    console.log('AuthContext login called with:', { userData, token });
    saveSession(token);
    console.log('Token saved to localStorage');
    console.log('Setting user in context:', userData);
    setUser(userData);
    console.log('User set in context. Current user state:', userData);
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
