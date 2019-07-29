import UserModel from "./user.model";
import { User } from "../entities/user.entity";
import bcrypt = require("bcrypt");

class UserRepository {
  async getJti(userId) {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (user) return user.jti;
    throw Error("User not found");
  }

  async getCount(userId) {
    const user = await UserModel.findOne({ where: { id: userId } });
    if (user) return user.count;
    throw Error("User not found");
  }

  async updateUser(id, data) {
    return await UserModel.update({ ...data }, { where: { id: id } });
  }

  async findUserByUsername(username) {
    const user = await UserModel.findOne({ where: { username: username } });
    if (user)
      return new User(
        user.id,
        user.username,
        user.password,
        user.count,
        user.isAdmin
      );
  }

  async isExist(username: string) {
    return await UserModel.findOne({
      where: { username: username }
    });
  }

  async createUser(userData) {
    const hashedPassword = await this.hashPassword(userData.password);
    const savedUser = await UserModel.create({
      ...userData,
      password: hashedPassword
    });
    return new User(
      savedUser.id,
      savedUser.username,
      userData.password,
      savedUser.count,
      savedUser.isAdmin
    );
  }

  private async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}

export default new UserRepository();
