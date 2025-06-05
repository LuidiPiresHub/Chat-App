import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { IService } from '../interfaces/service';

const getUserById = async (userId: string): Promise<IService<Omit<User, 'password'> | string>> => {
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
};

const updateDisplayName = async (displayName: string, id: string): Promise<IService<User>> => {
  const data = await prisma.user.update({ data: { displayName }, where: { id }});
  return { type: 'OK', message: data };
};

export default {
  getUserById,
  updateDisplayName
};
