import { PrismaClient } from '@prisma/client/edge';
import { getPrismaClient } from '../lib/prisma.js';
// import prisma from "../lib/prisma.js";

class UserModel {
  private dataBase: ReturnType<typeof getPrismaClient>;

  constructor(env: { DATABASE_URL: string }) {
    this.dataBase = getPrismaClient(env);
  }

  public async getAllUsers() {
    return this.dataBase.users.findMany();
  }

  public async getUserById(id: string) {
    return this.dataBase.users.findUnique({
      where: { id },
      include: { Posts: true }, // Inclut les posts associés à l'utilisateur
    });
  }
}

export default UserModel;