import { z } from 'zod';

export const userSignInSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

export const userSignUpSchema = userSignInSchema.extend({
  username: z.string().min(3, 'Usuário deve ter pelo menos 3 caracteres').regex(/^[^\d].*$/, 'Usuário não pode começar com número')
});

