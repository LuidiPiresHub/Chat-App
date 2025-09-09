import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../config/axios';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import useAuth from './useAuth';
import { IUserResponse } from '../interfaces/userData';

interface IUseAuthMutationProps {
  url: string;
  mutationKey: string;
  errorTitle: string;
}

export const useAuthMutation = <TFormData>({ url, mutationKey, errorTitle }: IUseAuthMutationProps) => {
  const { setIsAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (formData: TFormData) => {
      const { data } = await api.post<IUserResponse>(url, formData);
      return data.message;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['auth'], user);
      setIsAuthenticated(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      Swal.fire({
        title: errorTitle,
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Tentar novamente',
        confirmButtonColor: '#7C3AED',
        background: '#1E1B4B',
        color: '#E0E7FF',
        iconColor: '#F472B6',
        showCloseButton: true,
      });
    },
  });
};
