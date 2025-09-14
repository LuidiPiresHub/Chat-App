import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../config/axios';
import { toast } from 'react-toastify';
import { IUserResponse } from '../interfaces/userData';
import { zodResolver } from '@hookform/resolvers/zod';
import { userNicknameSchema } from '../schemas/nickname';
import { AxiosError } from 'axios';

interface IUpdateNickname {
  nickname: string;
}

export default function Settings() {
  const auth = useAuth();
  const user = auth.user!;
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUpdateNickname>({ resolver: zodResolver(userNicknameSchema) });
  const queryClient = useQueryClient();

  const { mutate: updateNickname } = useMutation({
    mutationKey: ['updateNickname'],
    mutationFn: async (nickname: IUpdateNickname) => {
      const { data } = await api.put<IUserResponse>('/user/nickname', nickname );
      return data.message;
    },
    onSuccess: (updatedUser) => {
      toast('Nickname atualizado com sucesso!', {
        type: 'success',
        theme: 'colored'
      });
      queryClient.setQueryData(['auth'], updatedUser);
      reset();
    },
    onError: ({ response }: AxiosError<{ message: string }>) => {
      const errorMessage = response?.data.message || 'Erro Interno do servidor';
      toast(`Erro ao atualizar Nickname! \n ${errorMessage}`, {
        type: 'error',
        theme: 'colored'
      });
    }
  });

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-dvh p-4 bg-[#141428] text-white"
    >
      <div className='flex items-center gap-4 mb-12'>
        <MoveLeft className='cursor-pointer' onClick={() => navigate('/')} />
        <h1 className="text-2xl font-semibold">Configurações da Conta</h1>
      </div>
      <section className="max-w-md mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-medium">{user.username}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <section className="bg-neutral-800 rounded p-4 space-y-2">
          <p><span className="text-gray-400">ID:</span> {user.id}</p>
          <p><span className="text-gray-400">Nickname:</span> {user.nickname}</p>
          <p><span className="text-gray-400">Criado em:</span> {formatDate(user.createdAt)}</p>
          <p><span className="text-gray-400">Atualizado em:</span> {formatDate(user.updatedAt)}</p>
        </section>
        <form onSubmit={handleSubmit((updateData) => updateNickname(updateData))} className='flex gap-4'>
          <input type="text" placeholder='Novo Nickname' {...register('nickname')} className='bg-gray-700 rounded px-4 py-2 flex-1 outline-none' />
          <button type='submit' className='bg-blue-700 hover:bg-blue-800 rounded px-4 py-2 cursor-pointer'>Atualizar</button>
        </form>
        {errors.nickname && <span className='text-red-600 text-center'>{errors.nickname.message}</span>}
        <button
          type='button'
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
          onClick={() => logout()}
        >
          Logout
        </button>
      </section>
    </motion.main>
  );
}
