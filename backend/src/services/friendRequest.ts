import { prisma } from '@config/prisma';
import { IService } from '@interfaces/service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      const [userAId, userBId] = [id, friendData.id].sort();
      await prisma.$transaction([
        prisma.friendship.create({
          data: { userAId, userBId },
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
    const error = err as PrismaClientKnownRequestError;

    if (error.code === 'P2002') {
      return { type: 'CONFLICT', message: 'Pedido de amizade já enviado!' };
    }

    throw err;
  }
};

const denyFriendRequest = async (friendRequestId: string): Promise<IService<string>> => {
  await prisma.friendRequest.delete({ where: { id: friendRequestId } });
  return { type: 'OK', message: 'Pedido de amizade deletado com sucesso' };
};

const acceptFriendRequest = async (friendRequestId: string, id: string, friendId: string): Promise<IService<string>> => {
  const [userAId, userBId] = [id, friendId].sort();
  await prisma.$transaction([
    prisma.friendship.create({ data: { userAId, userBId } }),
    prisma.friendRequest.delete({ where: { id: friendRequestId } })
  ]);
  return { type: 'OK', message: 'Pedido de amizade aceito com sucesso' };
};

export default {
  sendFriendRequest,
  denyFriendRequest,
  acceptFriendRequest
};
