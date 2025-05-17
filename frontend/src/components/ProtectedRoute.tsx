import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

interface IProtectedRouteProps {
  isProtected?: boolean;
}

export default function ProtectedRoute({ isProtected = false }: IProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isAuthenticated && !isProtected) {
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
