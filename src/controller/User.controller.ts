import type { UsersType } from "../interfaces/types.js";
import UserModel from "../models/User.model.js";

class UserController {
  private UserModel: UserModel;
  constructor() {
    this.UserModel = new UserModel();
  }

  public getAllUsers(): UsersType[] {
    const data = this.UserModel.getAllUsers();
    return data;
  }

  public getUserById(id: string) {
    const data = this.UserModel.getUserById(id);

    if (!data) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    return {
      status: 200,
      message: "User fetched successfully",
      user: data,
    };
  }
}

export default UserController;