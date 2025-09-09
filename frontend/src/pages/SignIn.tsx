import { Mail, Lock, EyeIcon, EyeOff, Loader } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISignInForm, signInSchema } from '../schemas/signIn';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { motion } from 'framer-motion';
import { createContainer, createItem } from '../utils/motionVariants';
import FormError from '../components/FormError';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signInSchema) });
  const { mutate: userSignIn, isPending } = useAuthMutation<ISignInForm>({
    mutationKey: 'signIn',
    url: '/auth/sign-in',
    errorTitle: 'Não foi possível fazer login',
  });

  const changePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <main className='min-h-dvh bg-[url("assets/bgMobile.png")] bg-no-repeat bg-cover bg-fixed md:bg-[url("assets/bgDesktop.png")] flex flex-col items-center justify-center p-4'>
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0 }}
        className='bg-gray-700 p-8 sm:p-12 rounded-3xl flex flex-col gap-8'
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='text-5xl font-bold mb-4'
        >
          Sign In
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit((signInData) => userSignIn(signInData))}
          className='flex flex-col gap-4 select-none'
          variants={createContainer(0.1)}
          initial="hidden"
          animate="show"
        >
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
              className='py-4 px-14 w-full outline-none placeholder:text-white bg-transparent'
            />
          </motion.label>
          <FormError fieldError={errors.email} />
          <motion.label
            htmlFor="password"
            className='relative flex items-center gap-4 bg-indigo-400 rounded-lg'
            whileHover={{ scale: 1.01 }}
            variants={createItem(20)}
          >
            <Lock className='absolute left-4' />
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Senha'
              {...register('password')}
              className='py-4 px-14 w-full outline-none placeholder:text-white bg-transparent'
            />
            {showPassword ? (
              <EyeOff onClick={changePasswordVisibility} className='absolute right-4 cursor-pointer' />
            ) : (
              <EyeIcon onClick={changePasswordVisibility} className='absolute right-4 cursor-pointer' />
            )}
          </motion.label>
          <FormError fieldError={errors.password} />
          <motion.button
            type='submit'
            disabled={isPending}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            variants={createItem(20)}
            className='cursor-pointer bg-indigo-500 py-4 rounded-lg text-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center'
          >
            {isPending ? <Loader className='animate-spin h-7 w-7' /> : 'Entrar'}
          </motion.button>
        </motion.form>
        <hr className='border-gray-500' />
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='flex flex-wrap justify-center items-center gap-2'
        >
          <span className='text-gray-400'>Não tem uma conta?</span>
          <Link to='/sign-up' className='text-indigo-400 hover:text-indigo-500 transition-colors'>Cadastre-se</Link>
        </motion.section>
      </motion.section>
    </main>
  );
}
