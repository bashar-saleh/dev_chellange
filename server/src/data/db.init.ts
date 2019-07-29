import { Sequelize } from "sequelize-typescript";
import config from "../config";
import userRepository from "./user.repository";
import { initBlackList } from "./jwt.memory";



export const sequelize = new Sequelize(config.db);

export default () => {
  sequelize
    .sync({ force: true })
    .then(result => {
      console.log(`[DB] Connected to db: ${result.config.database}`);
      userRepository.createUser({
        username: "adminadmin",
        password: "0000abcde",
        isAdmin: true
      });

      initBlackList();
    })
    .catch(err => {
      console.log(err);
    });
};
