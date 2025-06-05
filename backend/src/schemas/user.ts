import { z } from 'zod';

export const userDisplayNameSchema = z.object({
  displayName: z
    .string()
    .min(3, 'O nick deve ter pelo menos 3 caracteres')
    .regex(/^[^\d].*$/, 'Usuário não pode começar com número')
    .regex(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/, 'Use "_" entre palavras, sem espaços ou caracteres especiais'),
});
