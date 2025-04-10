import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Pour __dirname dans ESModule
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataPath = path.join(__dirname, '../data');

// Création du dossier `data` s’il n'existe pas
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

const generateFakeData = (count: number) => {
  const users = [];
  const settings = [];
  const posts = [];
  const comments = [];
  const likes = [];
  const views = [];

  for (let i = 0; i < count; i++) {
    const userId = faker.string.uuid();
    const postId = faker.string.uuid();

    const user = {
      id: userId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    };

    const setting = {
      id: faker.string.uuid(),
      userId,
      theme: faker.helpers.arrayElement(['light', 'dark']),
      language: faker.helpers.arrayElement(['en', 'fr', 'es']),
      notifications: faker.datatype.boolean(),
      privacy: faker.helpers.arrayElement(['public', 'private']),
      twoFactorAuth: faker.datatype.boolean(),
      dataSharing: faker.datatype.boolean(),
    };

    const post = {
      id: postId,
      authorId: userId,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      shares: faker.number.int({ min: 0, max: 100 }),
      tags: faker.helpers.arrayElements(['news', 'sports', 'entertainment', 'technology'], 3),
      category: faker.helpers.arrayElement(['news', 'sports', 'entertainment', 'technology']),
      image: faker.image.url(),
    };

    const comment = {
      id: faker.string.uuid(),
      postId,
      userId,
      content: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    const like = {
      id: faker.string.uuid(),
      postId,
      userId,
      createdAt: faker.date.past(),
    };

    const view = {
      id: faker.string.uuid(),
      postId,
      userId,
      createdAt: faker.date.past(),
    };

    users.push(user);
    settings.push(setting);
    posts.push(post);
    comments.push(comment);
    likes.push(like);
    views.push(view);
  }

  return { users, settings, posts, comments, likes, views };
};

const { users, settings, posts, comments, likes, views } = generateFakeData(10);

// Fonction d’écriture
const writeJSON = (fileName: string, data: unknown) => {
  fs.writeFileSync(path.join(dataPath, fileName), JSON.stringify(data, null, 2));
};

writeJSON('users.json', users);
writeJSON('settings.json', settings);
writeJSON('posts.json', posts);
writeJSON('comments.json', comments);
writeJSON('likes.json', likes);
writeJSON('views.json', views);

console.log('✅ Données générées dans le dossier /data');
