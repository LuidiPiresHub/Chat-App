import { useForm } from 'react-hook-form';
import { IUsername } from '../../interfaces/userData';
import { zodResolver } from '@hookform/resolvers/zod';
import { usernameSchema } from '../../schemas/username';
import { useFriendRequest } from '../../hooks/useFriendRequest';
import { Search } from 'lucide-react';
import FormError from '../FormError';

export default function AddFriendTab() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IUsername>({ resolver: zodResolver(usernameSchema) });
  const { sendFriendRequest } = useFriendRequest();

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold text-white'>Adicionar amigo</h1>
        <p className='text-sm text-gray-400'>
          Você pode adicionar amigos com o nome de usuário e tag. Exemplo: <span className='font-mono'>Username#1234</span>
        </p>
      </div>
      <form onSubmit={handleSubmit(({ username }) => sendFriendRequest.mutate({ username, reset }))} className='flex gap-2 items-center'>
        <label htmlFor='addFriend' className='relative flex-1'>
          <input
            id='addFriend'
            type="text"
            autoComplete='off'
            placeholder='Digite o nick e tag do amigo...'
            className='bg-gray-700 w-full py-2 px-3 rounded-lg outline-none pr-13'
            {...register('username')}
          />
          <Search className='absolute size-5 right-4 top-1/2 transform -translate-y-1/2' />
        </label>
        <button type='submit' className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition cursor-pointer'>
          Enviar
        </button>
      </form>
      <FormError fieldError={errors.username} />
    </div>
  );
}
