import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Paths } from './paths';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#083344] mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={`/${Paths.login}`} replace />;
  }
  // Render protected content if authenticated
  return <>{children}</>;
};