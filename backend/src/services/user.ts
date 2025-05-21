import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { IService } from '../interfaces/service';

export const getUserById = async (userId: string): Promise<IService<Omit<User, 'password'> | string>> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    }
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };
  }

  return { type: 'OK', message: user };
}

export default {
  getUserById,
}