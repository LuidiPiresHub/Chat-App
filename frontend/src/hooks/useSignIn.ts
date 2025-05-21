import { useMutation } from '@tanstack/react-query';
import { ISignInForm } from '../schemas/signIn';
import { api } from '../config/axios';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2'
import useAuth from './useAuth';
import { IUserData } from '../interfaces/userData';

interface ISignInError {
  message: string;
}

export default function useSignIn() {
  const { setIsAuthenticated } = useAuth();
  return useMutation({
    mutationKey: ['signIn'],
    mutationFn: async (loginData: ISignInForm) => {
      const { data } = await api.post<IUserData>('/auth/sign-in', loginData);
      return data.message;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error: AxiosError<ISignInError>) => {
      const errorMessage = error.response?.data.message;
      Swal.fire({
        title: 'Não foi possível entrar',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Tentar novamente',
        confirmButtonColor: '#7C3AED',
        background: '#1E1B4B',
        color: '#E0E7FF',
        iconColor: '#F472B6',
        showCloseButton: true,
        customClass: {
          popup: 'rounded-xl shadow-2xl',
          title: 'text-lg font-bold',
          confirmButton: 'px-5 py-2',
        },
      });
    }
  });
}

