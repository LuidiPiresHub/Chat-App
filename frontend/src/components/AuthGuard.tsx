import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../pages/LoadingScreen';

interface IAuthGuardProps {
  isProtected?: boolean;
}

export default function AuthGuard({ isProtected = false }: IAuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { state, pathname } = useLocation();

  const from = state?.from || '/';

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isProtected) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" state={{ from: pathname }} replace={true} />;
  }

  return isAuthenticated ? <Navigate to={from} replace={true} /> : <Outlet />;
}
