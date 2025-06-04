import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../config/axios';
import { IUserResponse } from '../../interfaces/userData';

interface IAuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isLoading, data: user } = useQuery({
    queryKey: ['auth'],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await api.get<IUserResponse>('/auth/me');
      setIsAuthenticated(true);
      return data.message;
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
}
