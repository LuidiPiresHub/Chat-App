import { ReactNode, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

interface IAuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    checkAuth();
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
