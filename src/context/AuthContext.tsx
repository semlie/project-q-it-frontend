/**
 * Context לניהול אימות המשתמש
 * משתמש ב-Redux לניהול מצב האימות
 */
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth, logout, updateUser, loginUser } from '../store/slices/authSlice';
import { UserType } from '../types/userType';

/**
 * ממשק ה-Context לאימות
 */
interface AuthContextType {
  user: UserType | null;           // פרטי המשתמש המחובר
  isLoading: boolean;               // האם יש טעינה בתהליך
  isAuthenticated: boolean;        // האם המשתמש מאומת
  error: string | null;            // הודעת שגיאה אם יש
  login: (credentials: { userEmail: string; userPassword: string }) => void;  // פונקציית התחברות
  logout: () => void;               // התנתקות
  updateUser: (user: UserType) => void;  // עדכון פרטי משתמש
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider לאימות - עוטף את האפליקציה ומספק גישה לפונקציות אימות
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated, error } = useAppSelector((state) => state.auth);

  // בדיקת אימות בטעינת האפליקציה
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

/**
 * Hook לשימוש באימות בקומפוננטות
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
