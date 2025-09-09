import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'O username deve ter pelo menos 3 caracteres')
    .regex(/^[^\d].*$/, 'Usuário não pode começar com número')
    .regex(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/, 'Use "_" entre palavras, sem espaços ou caracteres especiais'),
});
