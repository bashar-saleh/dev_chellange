import asyncHandler from "../middlewares/handler.middleware";
import UserRepository from "../data/user.repository";
import NumberRepository from "../data/number.repository";

const index = asyncHandler(async (req, res) => {
    
  const userId = req.user.id;
  const count = await UserRepository.getCount(userId);
  const magicQuote = await NumberRepository.getMagicFor(count);
  
  await UserRepository.updateUser(userId, { count: count + 1 });

  return res.status(200).send({ data: magicQuote });
});

export default {
  index
};
