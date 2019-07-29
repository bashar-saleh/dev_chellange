import UserRepository from "../data/user.repository";
import uuidv1 = require("uuid/v1");
import bcrypt = require("bcrypt");
import { sign } from "../utils/jwt";

const login = async dataFromClient => {
  const user = await UserRepository.findUserByUsername(dataFromClient.username);

  if (!user)
    return {
      error: {
        msg: "invalid username or password."
      }
    };

  const validPassoword = await bcrypt.compare(
    dataFromClient.password,
    user.password
  );

  if (!validPassoword)
    return {
      error: {
        msg: "invalid username or password."
      }
    };

  const jti = uuidv1();
  const token = sign({ id: user.id, jti: jti, isAdmin: user.isAdmin });
  const userUpdated = await UserRepository.updateUser(user.id, { jti: jti });
  if (!userUpdated[0]) throw Error("User not updated.");

  return { access_token: token };
};

const registerUser = async dataFromClient => {
  const user = await UserRepository.createUser(dataFromClient);
  return user;
};

export default {
  login,
  registerUser
};
