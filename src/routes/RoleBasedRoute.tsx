import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Paths } from './paths';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('student' | 'teacher')[];
  redirectTo?: string;
}

export const RoleBasedRoute = ({ children, allowedRoles, redirectTo }: RoleBasedRouteProps) => {
  const { user, isLoading } = useAuth();

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

  if (!user) {
    return <Navigate to={`/${Paths.login}`} replace />;
  }

  const userRole = user.role as 'student' | 'teacher';
  
  if (!allowedRoles.includes(userRole)) {
    const defaultRedirect = userRole === 'teacher' ? Paths.teacherStats : Paths.studentStats;
    return <Navigate to={`/${redirectTo || defaultRedirect}`} replace />;
  }

  return <>{children}</>;
};
