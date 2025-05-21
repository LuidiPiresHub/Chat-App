import { useMutation } from '@tanstack/react-query';
import useAuth from './useAuth';
import { api } from '../config/axios';

export default function useLogout() {
  const { setIsAuthenticated } = useAuth();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      return await api.post('/auth/logout');
    },
    onSuccess: () => {
      setIsAuthenticated(false);
    }
  });
}
