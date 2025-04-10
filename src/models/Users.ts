import fs from 'fs';
import path from 'path';

const usersFilePath = path.resolve(__dirname, '../data/users.json');

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UsersModel {
  static getAllUsers(): User[] {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch (error) {
      console.error('Error reading users.json:', error);
      return [];
    }
  }

  static getUserById(id: number): User | undefined {
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  static addUser(newUser: User): void {
    const users = this.getAllUsers();
    users.push(newUser);
    this.saveUsers(users);
  }

  static saveUsers(users: User[]): void {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to users.json:', error);
    }
  }
}