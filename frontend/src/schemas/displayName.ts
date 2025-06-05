import { z } from 'zod';

export const userDisplayNameSchema = z.object({
  displayName: z.string().min(3, 'O nome de exibição precisa ter pelo menos 3 caracteres').max(20, 'O nome de exibição precisa ser menor que 20 caracteres')
});
