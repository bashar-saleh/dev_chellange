import adminService from "../services/admin.service";
import asyncHandler from "../middlewares/handler.middleware";

const ban = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  await adminService.banJwt(userId);
  return res.status(200).send(`User with ID: ${userId} has been banned.`);
});

const removeBan = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  await adminService.removeJwtBan(userId);
  return res.status(200).send(`User with ID: ${userId} has been  permitted.`);
});

export default {
  ban,
  removeBan
};
