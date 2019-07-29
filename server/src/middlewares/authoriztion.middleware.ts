import { verifyToken } from "../utils/jwt";
import { JwtMemory } from "../data/jwt.memory";

export default (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const payload: any = verifyToken(token);
    const tokenIsBanned = JwtMemory.isInBlackList(payload.jti);
    if (tokenIsBanned)
      return res.status(401).send("Access denied. User is Banned.");
    req.user = payload;
    return next();
  } catch (error) {
    res.status(400).send("Invalid Token.");
  }
};
