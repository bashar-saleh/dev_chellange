import JwtRepository from "./jwt.repository";

class JWTMemory {
  private blackList: Array<any> = [];

  public addToBlackList(jti) {
    this.blackList.push(jti);
  }

  public removeFromBlackList(jti) {
    this.blackList = this.blackList.filter(t => t != jti);
  }

  public isInBlackList(jti) {
    return this.blackList.find(t => t == jti);
  }

  public getBlackList() {
      return this.blackList;
  }
}


export const JwtMemory = new JWTMemory();

export const initBlackList = async () => {
  const jwts = await JwtRepository.getAll();
  jwts.forEach(jwt => {
    JwtMemory.addToBlackList(jwt.jti);
  });
}