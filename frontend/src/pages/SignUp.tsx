import { Mail, Lock, EyeIcon, EyeOff, Loader, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISignUpForm, signUpSchema } from '../schemas/signUp';
import { useAuthMutation } from '../hooks/useAuthMutation';

interface IShowPassord {
  password: boolean;
  confirmPassword: boolean;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<IShowPassord>({ password: false, confirmPassword: false });
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signUpSchema) });
  const { mutate: userSignUp, isPending } = useAuthMutation<ISignUpForm>({
    mutationKey: 'signUp',
    url: '/auth/sign-up',
    tituloErro: 'Não foi possível criar a conta',
  });

  const changePasswordVisibility = (key: keyof IShowPassord) => {
    setShowPassword((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  return (
    <main className='min-h-dvh bg-[url("assets/bgMobile.png")] bg-no-repeat bg-cover bg-fixed md:bg-[url("assets/bgDesktop.png")] flex flex-col items-center justify-center p-4'>
      <section className='bg-gray-700 p-8 sm:p-12 rounded-3xl flex flex-col gap-8'>
        <h1 className='text-5xl font-bold mb-4'>Sign Up</h1>
        <form onSubmit={handleSubmit((signUpData) => userSignUp(signUpData))} className='flex flex-col gap-4 select-none'>
          <label
            htmlFor="username"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
          >
            <UserCircle2 className='absolute left-4' />
            <input
              id='username'
              type="text"
              placeholder='Usuário'
              {...register('username')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
          </label>
          {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
          <label
            htmlFor="email"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
          >
            <Mail className='absolute left-4' />
            <input
              id='email'
              type="email"
              placeholder='Email'
              {...register('email')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
          </label>
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          <label
            htmlFor="password"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
          >
            <Lock className='absolute left-4' />
            <input
              id='password'
              type={showPassword.password ? 'text' : 'password'}
              placeholder='Senha'
              {...register('password')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
            {showPassword.password ? (
              <EyeOff onClick={() => changePasswordVisibility('password')} className='absolute right-4 cursor-pointer' />
            ) : (
              <EyeIcon onClick={() => changePasswordVisibility('password')} className='absolute right-4 cursor-pointer' />
            )}
          </label>
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          <label
            htmlFor="confirmPassword"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
          >
            <Lock className='absolute left-4' />
            <input
              id='confirmPassword"'
              type={showPassword.confirmPassword ? 'text' : 'password'}
              placeholder='Confirmar Senha'
              {...register('confirmPassword')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
            {showPassword.confirmPassword ? (
              <EyeOff onClick={() => changePasswordVisibility('confirmPassword')} className='absolute right-4 cursor-pointer' />
            ) : (
              <EyeIcon onClick={() => changePasswordVisibility('confirmPassword')} className='absolute right-4 cursor-pointer' />
            )}
          </label>
          {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
          <button
            type='submit'
            disabled={isPending}
            className='cursor-pointer bg-indigo-500 py-4 rounded-lg text-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center'
          >
            {isPending ? <Loader className='animate-spin h-7 w-7' /> : 'Entrar'}
          </button>
        </form>
        <hr className='border-gray-500' />
        <section className='flex flex-wrap justify-center items-center gap-2'>
          <span className='text-gray-400'>Já tem uma conta?</span>
          <Link to='/sign-in' className='text-indigo-400 hover:text-indigo-500 transition-colors'>Fazer Login</Link>
        </section>
      </section>
    </main>
  );
}
