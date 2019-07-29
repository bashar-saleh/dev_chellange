import authService from "../services/auth.service";
import asyncHandler from "../middlewares/handler.middleware";

const signup = asyncHandler(async (req, res) => {
  const dataFromClient = req.body;
  const user = await authService.registerUser(dataFromClient);
  return res.status(200).send(user);
});

const login = asyncHandler(async (req, res) => {
  const dataFromClient = req.body;
  const result = await authService.login(dataFromClient);
  if (result.error)
    return res.status(400).send({ errors: { msg: result.error.msg } });

  return res.status(200).send({ access_token: result.access_token });
});

export default {
  signup,
  login
};
