import { prisma } from '@config/prisma';
import { IService } from '@interfaces/service';

const deleteFriend = async (userId: string, friendId: string): Promise<IService<string>> => {
  await prisma.friendship.deleteMany({
    where: {
      OR: [
        { userAId: userId, userBId: friendId },
        { userAId: friendId, userBId: userId }
      ]
    }
  });

  return { type: 'OK', message: 'Amizade removida com sucesso' };
};

export default {
  deleteFriend
};
