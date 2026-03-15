import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth, logout, updateUser, loginUser } from '../store/slices/authSlice';
import { UserType } from '../types/userType';

interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: { userEmail: string; userPassword: string }) => void;
  logout: () => void;
  updateUser: (user: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogin = (credentials: { userEmail: string; userPassword: string }) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateUser = (userData: UserType) => {
    dispatch(updateUser(userData));
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    error,
    login: handleLogin,
    logout: handleLogout,
    updateUser: handleUpdateUser,
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

export { AuthContext };
