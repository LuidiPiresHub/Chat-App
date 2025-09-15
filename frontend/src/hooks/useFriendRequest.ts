import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { api } from '@config/axios';
import { UseFormReset } from 'react-hook-form';
import { IUserData, IUsername } from '@interfaces/userData';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ISendFriendRequest {
  username: string
  reset: UseFormReset<IUsername>
}

export const useFriendRequest = () => {
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
      const previousData = queryClient.getQueryData<IUserData>(['auth']);
      queryClient.setQueryData<IUserData>(['auth'], (old) => {
        if (!old) return old;
        return {
          ...old,
          receivedRequests: old.receivedRequests.filter(req => req.id !== friendRequestId),
          friends: [
            ...old.friends,
            old.receivedRequests.find((req) => req.id === friendRequestId)!.sender
          ]
        };
      });

      return { previousData };
    },
    mutationFn: async ({ friendId, friendRequestId }: IAcceptFriendRequest) => {
      const { data } = await api.post<{ message: string }>(`/user/friend-request/${friendRequestId}/accept`, { friendId });
      return data.message;
    },
    onError: (error: AxiosError<{ message: string }>, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['auth'], context.previousData);
      }
      const errorMessage = error.response?.data.message || 'Erro Interno do servidor';
      toast(errorMessage, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  interface IDenyFriendRequest {
    friendRequestId: string;
    type: 'received' | 'sent';
  }

  const denyFriendRequest = useMutation({
    mutationKey: ['denyFriendRequest'],
    onMutate: async ({ friendRequestId, type }) => {
      const previousData = queryClient.getQueryData<IUserData>(['auth']);
      queryClient.setQueryData<IUserData>(['auth'], (old) => {
        if (!old) return old;

        if (type === 'received') {
          return {
            ...old,
            receivedRequests: old.receivedRequests.filter((req) => req.id !== friendRequestId),
          };
        }

        return {
          ...old,
          sentRequests: old.sentRequests.filter((req) => req.id !== friendRequestId)
        };
      });
      return { previousData };
    },
    mutationFn: async ({ friendRequestId }: IDenyFriendRequest) => {
      const { data } = await api.delete<{ message: string }>(`/user/friend-request/${friendRequestId}/deny`);
      return data.message;
    },
    onError: (error: AxiosError<{ message: string }>, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['auth'], context.previousData);
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
