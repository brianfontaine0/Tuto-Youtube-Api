import fs from 'fs';
import path from 'path';
import type { UsersType } from '../interfaces/types.js';

class UserModel {
  private filePath: string;

  constructor(){
    this.filePath = path.join('./data/users.json');
  }

  public getAllUsers() : UsersType[]{
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  public getUserById(id: string) : UsersType | null {
    const users = this.getAllUsers();
    const user = users.find((user) => user?.id == id);
    return user || null;
  }

}

export default UserModel;