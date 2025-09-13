import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../config/axios';
import { IUserData } from '../../interfaces/userData';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthResponse {
  message: {
    isAuthenticated: boolean;
    user: IUserData | null;
  }
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isLoading, data: user } = useQuery({
    queryKey: ['auth'],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data: { message } } = await api.get<IAuthResponse>('/auth/me');
      const { isAuthenticated, user } = message;
      setIsAuthenticated(isAuthenticated);
      return user!;
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}
