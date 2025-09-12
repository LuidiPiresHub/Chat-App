import { User } from '@prisma/client';
import { prisma } from '../config/prisma';
import { IService } from '../interfaces/service';
import { IPrismaError } from '../interfaces/prisma';

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

const updateNickname = async (nickname: string, user: User): Promise<IService<User | string>> => {
  if (nickname === user.nickname) {
    return { type: 'BAD_REQUEST', message: 'Você já está usando esse Nickname.' };
  }

  const data = await prisma.user.update({ data: { nickname }, where: { id: user.id } });
  return { type: 'OK', message: data };
};

const sendFriendRequest = async (username: string, id: string): Promise<IService<string>> => {
  try {
    const friendData = await prisma.user.findUnique({ where: { username } });

    if (!friendData) {
      return { type: 'NOT_FOUND', message: 'Amigo não encontrado' };
    }

    if (friendData.id === id) {
      return { type: 'BAD_REQUEST', message: 'Você não pode se adicionar como amigo!' };
    }

    const existFriendShip = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userAId: id, userBId: friendData.id },
          { userAId: friendData.id, userBId: id },
        ],
      },
    });

    if (existFriendShip) {
      return { type: 'BAD_REQUEST', message: 'Vocês já são amigos!' };
    }

    const inverseRequest = await prisma.friendRequest.findFirst({
      where: {
        senderId: friendData.id,
        receiverId: id,
      },
    });

    if (inverseRequest) {
      await prisma.$transaction([
        prisma.friendship.create({
          data: { userAId: id, userBId: friendData.id },
        }),
        prisma.friendRequest.delete({ where: { id: inverseRequest.id } }),
      ]);

      return { type: 'OK', message: `Você e ${username} agora são amigos!` };
    }

    await prisma.friendRequest.create({
      data: {
        senderId: id,
        receiverId: friendData.id,
      },
    });

    return { type: 'OK', message: `Você enviou um pedido de amizade para: ${username}` };
  } catch (err) {
    const error = err as IPrismaError;

    if (error.code === 'P2002') {
      return { type: 'CONFLICT', message: 'Pedido de amizade já enviado!' };
    }

    throw err;
  }
};

const getFriendsRequests = async (id: string): Promise<IService<null | Array<Pick<User, 'id' | 'nickname'>>>> => {
  const friendsRequests = await prisma.friendRequest.findMany({ where: { receiverId: id } });

  const data = (await Promise.all(friendsRequests.map(async ({ id, senderId }) => {
    const userData = await prisma.user.findUnique({
      where: { id: senderId },
      select: {
        id: true,
        nickname: true,
        createdAt: true
      }
    });

    if (!userData) return null;

    return { ...userData, friendRequestId: id };
  })))
    .filter((users) => users !== null)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  if (!data.length) {
    return { type: 'OK', message: null };
  }

  return { type: 'OK', message: data };
};

const denyFriendRequest = async (friendRequestId: string): Promise<IService<string>> => {
  await prisma.friendRequest.delete({ where: { id: friendRequestId } });
  return { type: 'OK', message: 'Pedido de amizade deletado com sucesso' };
};

const acceptFriendRequest = async (friendRequestId: string, id: string, friendId: string): Promise<IService<string>> => {
  await prisma.$transaction([
    prisma.friendship.create({ data: { userAId: id, userBId: friendId } }),
    prisma.friendRequest.delete({ where: { id: friendRequestId } })
  ]);
  return { type: 'OK', message: 'Pedido de amizade aceito com sucesso' };
};

export default {
  getUserById,
  updateNickname,
  sendFriendRequest,
  getFriendsRequests,
  denyFriendRequest,
  acceptFriendRequest
};
