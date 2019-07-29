import JwtModel from "./jwt.model";

class JwtRepository {
  async getAll() {
    return await JwtModel.findAll();
  }
  async remove(userJti) {
    return await JwtModel.destroy({ where: { jti: userJti } });
  }
  async add(userJti) {
    return await JwtModel.create({ jti: userJti });
  }
}

export default new JwtRepository();
