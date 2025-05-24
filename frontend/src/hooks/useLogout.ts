import { useMutation } from '@tanstack/react-query';
import useAuth from './useAuth';
import { api } from '../config/axios';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      navigate('/');
      return await api.post('/auth/logout');
    },
    onSuccess: () => {
      setIsAuthenticated(false);
    }
  });
}
