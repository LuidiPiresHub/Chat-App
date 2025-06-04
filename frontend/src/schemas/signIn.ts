import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type ISignInForm = z.infer<typeof signInSchema>;
