import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('123456', 10);

  const tenant = await prisma.tenant.create({
    data: {},
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        name: 'Administrador',
        password,
        telephone: '88888888',
        role: 'ADMIN',
        tenantId: tenant.id,
      },
      {
        email: 'user@example.com',
        name: 'Usuario',
        password,
        telephone: '87777777',
        role: 'USER',
        tenantId: tenant.id,
      },
    ],
  });

  console.log('Datos insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });