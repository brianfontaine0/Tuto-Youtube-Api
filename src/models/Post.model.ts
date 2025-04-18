import { getPrismaClient } from '../lib/prisma.js';
// import prisma from '../lib/prisma.js';

class PostModel {
  private dataBase: ReturnType<typeof getPrismaClient>;

  constructor(env: { DATABASE_URL: string }) {
    this.dataBase = getPrismaClient(env);
  }

  public async getAllPosts() {
    return this.dataBase.posts.findMany();
  }

  public async getPostById(id: string) {
    return this.dataBase.posts.findUnique({ where: { id } });
  }
}

export default PostModel;
