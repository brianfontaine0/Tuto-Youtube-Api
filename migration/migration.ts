import { faker } from '@faker-js/faker';
import {getPrismaClient} from '../src/lib/prisma.js';

const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
};
const prisma = getPrismaClient(env);

const generateFakeData = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const user = await prisma.users.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number(),
        adress: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
      }
    })

    const post = await prisma.posts.create({
      data: {
        title: faker.book.title(),
        content: faker.lorem.paragraphs(3),
        authorId: user?.id,
        published: faker.datatype.boolean(),
      }
    })
  }
};

const main = async () => {
  const count = 10; // Nombre d'entrées à générer
  await generateFakeData(count);
  console.log(`✅ ${count} utilisateurs et ${count} posts générés avec succès !`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }
  )
  .finally(async () => {
    await prisma.$disconnect();
  });



