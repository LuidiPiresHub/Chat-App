import { FriendRequest, Friendship, Prisma, User } from '@prisma/client';
import { ISafeUserData } from '@interfaces/auth';

export const userInclude = {
  friendshipsA: { include: { userB: true } },
  friendshipsB: { include: { userA: true } },
  receivedRequests: { include: { sender: true } },
  sentRequests: { include: { receiver: true } },
};

export type UserWithRelations = Prisma.UserGetPayload<{ include: typeof userInclude }>;

export const toSafeUser = (user: UserWithRelations): ISafeUserData => {
  const { password: _, friendshipsA, friendshipsB, receivedRequests, sentRequests, ...rest } = user;

  const friends = [
    ...friendshipsA.map((f: Friendship & { userB: User }) => {
      const { password: _, ...friend } = f.userB;
      return friend;
    }),
    ...friendshipsB.map((f: Friendship & { userA: User }) => {
      const { password: _, ...friend } = f.userA;
      return friend;
    }),
  ];

  const safeReceived = receivedRequests.map((r: FriendRequest & { sender: User }) => {
    const { password: _, ...sender } = r.sender;
    return { ...r, sender };
  });

  const safeSent = sentRequests.map((r: FriendRequest & { receiver: User }) => {
    const { password: _, ...receiver } = r.receiver;
    return { ...r, receiver };
  });

  return {
    ...rest,
    friends,
    receivedRequests: safeReceived,
    sentRequests: safeSent,
  };
};
