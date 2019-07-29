import jwt = require("jsonwebtoken");
import config from "../config";

const sign = payload => {
  const token = jwt.sign(payload, config.jwt.SECRET_KEY);
  return token;
};

const verifyToken = token => {
  return jwt.verify(token, config.jwt.SECRET_KEY);
};

export { sign, verifyToken };
