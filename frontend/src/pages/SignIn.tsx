import { Mail, Lock, EyeIcon, EyeOff, Loader } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISignInForm, signInSchema } from '../schemas/signIn';
import { useAuthMutation } from '../hooks/useAuthMutation';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signInSchema) });
  const { mutate: userSignIn, isPending } = useAuthMutation<ISignInForm>({
    mutationKey: 'signIn',
    url: '/auth/sign-in',
    tituloErro: 'Não foi possível fazer login',
  });

  const changePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <main className='min-h-dvh bg-[url("assets/bgMobile.png")] bg-no-repeat bg-cover bg-fixed md:bg-[url("assets/bgDesktop.png")] flex flex-col items-center justify-center p-4'>
      <section className='bg-gray-700 p-8 sm:p-12 rounded-3xl flex flex-col gap-8'>
        <h1 className='text-5xl font-bold mb-4'>Sign In</h1>
        <form onSubmit={handleSubmit((signInData) => userSignIn(signInData))} className='flex flex-col gap-4 select-none'>
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
              type={showPassword ? 'text' : 'password'}
              placeholder='Senha'
              {...register('password')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
            {showPassword ? (
              <EyeOff onClick={changePasswordVisibility} className='absolute right-4 cursor-pointer' />
            ) : (
              <EyeIcon onClick={changePasswordVisibility} className='absolute right-4 cursor-pointer' />
            )}
          </label>
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
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
          <span className='text-gray-400'>Não tem uma conta?</span>
          <Link to='/sign-up' className='text-indigo-400 hover:text-indigo-500 transition-colors'>Cadastre-se</Link>
        </section>
      </section>
    </main>
  )
}
