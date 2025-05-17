import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type ILoginForm = z.infer<typeof loginSchema>;