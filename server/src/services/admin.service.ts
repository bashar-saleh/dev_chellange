import UserRepository from "../data/user.repository";
import JwtRepository from "../data/jwt.repository";
import { JwtMemory } from "../data/jwt.memory";

const banJwt = async userId => {
  const userJti = await UserRepository.getJti(userId);
  await JwtRepository.add(userJti);
  JwtMemory.addToBlackList(userJti);
};

const removeJwtBan = async userId => {
  const userJti = await UserRepository.getJti(userId);
  const removed = await JwtRepository.remove(userJti);
  if (removed) JwtMemory.removeFromBlackList(userJti);
};

export default {
banJwt,
  removeJwtBan
};
