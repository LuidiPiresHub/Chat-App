import { prisma } from '@config/prisma';
import { ISafeUserData } from '@interfaces/auth';
import { IService } from '@interfaces/service';
import { User } from '@prisma/client';
import { toSafeUser, userInclude } from '@utils/toSafeUser';

const getUserById = async (userId: string): Promise<IService<ISafeUserData | string>> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: userInclude
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'Usuário não encontrado' };
  }

  const userData = toSafeUser(user);

  return { type: 'OK', message: userData };
};

const updateNickname = async (nickname: string, user: User): Promise<IService<User | string>> => {
  if (nickname === user.nickname) {
    return { type: 'BAD_REQUEST', message: 'Você já está usando esse Nickname.' };
  }

  const data = await prisma.user.update({ data: { nickname }, where: { id: user.id } });
  return { type: 'OK', message: data };
};

export default {
  getUserById,
  updateNickname
};
