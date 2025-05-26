import { z } from 'zod';
import { signInSchema } from './signIn';

export const signUpSchema = signInSchema.extend({
  username: z
    .string()
    .min(3, 'Usuário deve ter pelo menos 3 caracteres')
    .regex(/^[^\d].*$/, 'Usuário não pode começar com número')
    .regex(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/, 'Use "_" entre palavras, sem espaços ou caracteres especiais'),
  confirmPassword: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type ISignUpForm = z.infer<typeof signUpSchema>;