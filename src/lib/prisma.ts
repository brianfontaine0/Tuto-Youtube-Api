import { de } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

export const getPrismaClient = (env: { DATABASE_URL: string }): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }
  return prisma;
};

// const prisma = new PrismaClient()

// export default prisma;