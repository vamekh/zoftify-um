import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { configDotenv } from 'dotenv';

const prisma = new PrismaClient();
configDotenv();

async function main() {
  const rootEmail = process.env.ADMIN_EMAIL || 'admin@zoftify.com';
  const rootPassword = process.env.ADMIN_PASSWORD || '123';
  const hashedPassword = await bcrypt.hash(rootPassword, 10);

  // Create initial users
  await prisma.user.upsert({
    where: { email: rootEmail },
    update: {},
    create: {
      firstName: 'Zoftify',
      lastName: 'Root User',
      email: rootEmail,
      isAdmin: true,
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
