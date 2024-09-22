import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123', 10);

  // Create initial users
  const root = await prisma.user.upsert({
    where: { email: 'root@zoftify.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'root@zoftify.com',
      isAdmin: true,
      password: hashedPassword,
    },
  });
  console.log({ root });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
