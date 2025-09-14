import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve',
  'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
  'Mallory', 'Niaj', 'Olivia', 'Peggy', 'Rupert',
  'Sybil', 'Trent', 'Victor', 'Walter', 'Xena'
];

async function createUsers() {
  const myUser = await prisma.user.upsert({
    where: { email: 'luidipiresdev@gmail.com' },
    update: {},
    create: {
      username: 'LuidiPiresHub',
      nickname: 'Luídi_dev',
      email: 'luidipiresdev@gmail.com',
      password: await bcrypt.hash('1234567891011', 10)
    }
  });

  const usersData = await Promise.all(userNames.map(async (name) => ({
    username: name.toLowerCase(),
    nickname: name,
    email: `${name.toLowerCase()}@example.com`,
    password: await bcrypt.hash('1234567891011', 10)
  })));

  await prisma.user.createMany({ data: usersData });

  const allUsers = await prisma.user.findMany({
    where: { email: { not: myUser.email } }
  });

  return { myUser, allUsers };
}

async function createFriendships(myUser: User, friends: User[]) {
  const friendships = friends.map(user => {
    const [userAId, userBId] = [myUser.id, user.id].sort();
    return { userAId, userBId };
  });

  await prisma.friendship.createMany({ data: friendships });
  console.log('✅ Amizades criadas!');
}

async function createFriendRequests(myUser: User, receivedUsers: User[], sentUsers: User[]) {
  const receivedRequests = receivedUsers.map(user => ({
    senderId: user.id,
    receiverId: myUser.id
  }));

  const sentRequests = sentUsers.map(user => ({
    senderId: myUser.id,
    receiverId: user.id
  }));

  await prisma.friendRequest.createMany({ data: [...receivedRequests, ...sentRequests] });
  console.log('✅ Pedidos de amizade criados!');
}

async function main() {
  const { myUser, allUsers } = await createUsers();

  const half = Math.floor(allUsers.length / 2);
  const friends = allUsers.slice(0, half);

  const nonFriends = allUsers.slice(half);
  const mid = Math.floor(nonFriends.length / 2);
  const receivedRequestsUsers = nonFriends.slice(0, mid);
  const sentRequestsUsers = nonFriends.slice(mid);

  await createFriendships(myUser, friends);
  await createFriendRequests(myUser, receivedRequestsUsers, sentRequestsUsers);

  console.log('🎉 Seed finalizado!');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
