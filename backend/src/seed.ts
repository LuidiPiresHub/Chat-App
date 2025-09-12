import { prisma } from './config/prisma';
import bcrypt from 'bcrypt';

const userNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Eve',
  'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy',
  'Mallory', 'Niaj', 'Olivia', 'Peggy', 'Rupert',
  'Sybil', 'Trent', 'Victor', 'Walter', 'Xena'
];

async function main() {
  // cria usuário principal
  const myUser = await prisma.user.upsert({
    where: { email: 'luidipiresdev@gmail.com' },
    update: {},
    create: {
      username: 'LuidiPiresHub',
      nickname: 'Luídi_dev',
      email: 'luidipiresdev@gmail.com',
      password: await bcrypt.hash('123456', 10)
    }
  });

  // cria outros usuários
  const usersData = await Promise.all(userNames.map(async (name) => {
    return {
      username: name.toLowerCase(),
      nickname: `${name}_dev`,
      email: `${name.toLowerCase()}@example.com`,
      password: await bcrypt.hash('123456', 10)
    };
  }));

  await prisma.user.createMany({
    data: usersData,
  });

  // busca todos os usuários (menos eu)
  const allUsers = await prisma.user.findMany({
    where: { email: { not: myUser.email } }
  });

  // cria amizades
  const friendships = allUsers.map((user) => {
    const [userAId, userBId] = [myUser.id, user.id].sort();
    return { userAId, userBId };
  });

  await prisma.friendship.createMany({
    data: friendships,
  });

  console.log('Seed finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
