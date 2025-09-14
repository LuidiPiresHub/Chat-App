import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reset() {
  // Ordem importa se tem foreign keys
  await prisma.friendRequest.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.user.deleteMany();

  console.log('🔥 Banco resetado!');
}

reset()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
