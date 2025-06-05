import { Mail, Lock, EyeIcon, EyeOff, Loader, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISignUpForm, signUpSchema } from '../schemas/signUp';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { motion } from 'framer-motion';
import { createContainer, createItem } from '../utils/motionVariants';

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
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='bg-gray-700 p-8 sm:p-12 rounded-3xl flex flex-col gap-8'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='text-5xl font-bold mb-4'>Sign Up</motion.h1>
        <motion.form
          onSubmit={handleSubmit((signUpData) => userSignUp(signUpData))}
          className='flex flex-col gap-4 select-none'
          variants={createContainer(0.08)}
          initial="hidden"
          animate="show"
        >
          <motion.label
            htmlFor="username"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
            whileHover={{ scale: 1.01 }}
            variants={createItem(20)}
          >
            <UserCircle2 className='absolute left-4' />
            <input
              id='username'
              type="text"
              placeholder='Usuário Fixo'
              {...register('username')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
          </motion.label>
          {errors.username && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500'
            >
              {errors.username.message}
            </motion.span>
          )}
          <motion.label
            htmlFor="email"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
            whileHover={{ scale: 1.01 }}
            variants={createItem(20)}
          >
            <Mail className='absolute left-4' />
            <input
              id='email'
              type="email"
              placeholder='Email'
              {...register('email')}
              className='py-4 px-14 w-full outline-none placeholder:text-white'
            />
          </motion.label>
          {errors.email && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500'
            >
              {errors.email.message}
            </motion.span>
          )}
          <motion.label
            htmlFor="password"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
            whileHover={{ scale: 1.01 }}
            variants={createItem(20)}
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
          </motion.label>
          {errors.password && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500'
            >
              {errors.password.message}
            </motion.span>
          )}
          <motion.label
            htmlFor="confirmPassword"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
            whileHover={{ scale: 1.01 }}
            variants={createItem(20)}
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
          </motion.label>
          {errors.confirmPassword && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-red-500'
            >
              {errors.confirmPassword.message}
            </motion.span>
          )}
          <motion.button
            type='submit'
            disabled={isPending}
            className='cursor-pointer bg-indigo-500 py-4 rounded-lg text-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center'
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            variants={createItem(20)}
          >
            {isPending ? <Loader className='animate-spin h-7 w-7' /> : 'Entrar'}
          </motion.button>
        </motion.form>
        <hr className='border-gray-500' />
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='flex flex-wrap justify-center items-center gap-2'>
          <span className='text-gray-400'>Já tem uma conta?</span>
          <Link to='/sign-in' className='text-indigo-400 hover:text-indigo-500 transition-colors'>Fazer Login</Link>
        </motion.section>
      </motion.section>
    </main>
  );
}
