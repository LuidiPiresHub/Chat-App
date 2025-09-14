import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { api } from '../config/axios';
import { UseFormReset } from 'react-hook-form';
import { IPendingFriends, IUsername } from '../interfaces/userData';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

interface ISendFriendRequest {
  username: string
  reset: UseFormReset<IUsername>
}

export const useFriendRequest = () => {
  const auth = useAuth();
  const user = auth.user!;
  const queryClient = useQueryClient();

  const sendFriendRequest = useMutation({
    mutationKey: ['sendFriendRequest'],
    mutationFn: async ({ username }: ISendFriendRequest) => {
      const { data } = await api.post<{ message: string }>('/user/friend-request', { username });
      return data.message;
    },
    onSuccess: (serverResponse, { reset }) => {
      Swal.fire({
        title: 'Pedido de amizade enviado',
        text: serverResponse,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#7C3AED',
        background: '#1E1B4B',
        color: '#E0E7FF',
        iconColor: '#F472B6',
        showCloseButton: true,
      });
      reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      toast(errorMessage, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  interface IAcceptFriendRequest {
    friendId: string
    friendRequestId: string
  }

  const acceptFriendRequest = useMutation({
    mutationKey: ['acceptFriendRequest'],
    onMutate: async ({ friendRequestId }) => {
      const previousData = queryClient.getQueryData<IPendingFriends[]>(['pendingFriend', user.id]);
      queryClient.setQueryData<IPendingFriends[]>(['pendingFriend', user.id], (old) => {
        return old?.filter((req) => req.friendRequestId !== friendRequestId) ?? [];
      });
      return { previousData };
    },
    mutationFn: async ({ friendId, friendRequestId }: IAcceptFriendRequest) => {
      const { data } = await api.post<{ message: string }>(`/user/friend-request/${friendRequestId}/accept`, { friendId });
      return data.message;
    },
    onError: (error: AxiosError<{ message: string }>, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['pendingFriend', user.id], context.previousData);
      }
      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      toast(errorMessage, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  const denyFriendRequest = useMutation({
    mutationKey: ['acceptFriendRequest'],
    onMutate: async (friendRequestId) => {
      const previousData = queryClient.getQueryData<IPendingFriends[]>(['pendingFriend',user.id]);
      queryClient.setQueryData<IPendingFriends[]>(['pendingFriend', user.id], (old) => {
        return old?.filter((req) => req.friendRequestId !== friendRequestId) ?? [];
      });
      return { previousData };
    },
    mutationFn: async (friendRequestId: string) => {
      const { data } = await api.delete<{ message: string }>(`/user/friend-request/${friendRequestId}/deny`);
      return data.message;
    },
    onError: (error: AxiosError<{ message: string }>, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['pendingFriend', user.id], context.previousData);
      }
      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      toast(errorMessage, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  return { sendFriendRequest, acceptFriendRequest, denyFriendRequest };
};
