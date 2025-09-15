import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import LoadingScreen from '@pages/LoadingScreen';
import { useEffect, useState } from 'react';

interface IAuthGuardProps {
  isProtected?: boolean;
}

export default function AuthGuard({ isProtected = false }: IAuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return showLoading && <LoadingScreen />;
  }

  if (isProtected) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
  }

  return isAuthenticated ? <Navigate to="/" replace={true} /> : <Outlet />;
}
