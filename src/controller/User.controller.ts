import UserModel from '../models/User.model.js';

class UserController {
  private userModel: UserModel;

  constructor(env: { DATABASE_URL: string }) {
    this.userModel = new UserModel(env);
  }

  public async getAllUsers() {
    return await this.userModel.getAllUsers();
  }

  public async getUserById(id: string) {
    return await this.userModel.getUserById(id);
  }
}

export default UserController;