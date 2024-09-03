// prisma/seed.ts
import { PrismaClient, Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcryptjs.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' }, // Corrected email
    update: {}, // Update is empty as we are only ensuring the existence
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: Role.ADMIN, // Use Role.ADMIN enum value
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });