import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../pages/LoadingScreen';
import { useEffect, useState } from 'react';

interface IAuthGuardProps {
  isProtected?: boolean;
}

export default function AuthGuard({ isProtected = false }: IAuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { state, pathname } = useLocation();
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const from = state?.from || '/';

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return showLoading && <LoadingScreen />;
  }

  if (isProtected) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" state={{ from: pathname }} replace={true} />;
  }

  return isAuthenticated ? <Navigate to={from} replace={true} /> : <Outlet />;
}
