import {body} from "express-validator/check";
import UserRepository from "../data/user.repository";

export default () => {
  return [
    body("username", "username doesn't exist").trim().exists().escape(),
    body("username", "username must be only Alpha.").trim().isAlpha(),
    body("username", "username length must be between 4 and 30.").trim().isLength({min: 4, max: 30}),
    body("password", "password doesn't exist").trim().exists().escape(),
    body("password", "password must be only Alphanumeric.").trim().isAlphanumeric(),
    body("password", "password length must be between 8 and 38.").trim().isLength({min: 8, max: 38}),
    body('username', "username has been taken. Try anthor one.").custom(async username => {
      const isExist = await UserRepository.isExist(username);
      if(isExist) return false;
      return true;
    })
  ]
}