export class User {
  id: number;
  username: string;
  password: string;
  count: number;
  isAdmin: boolean;

  constructor(id: number, username: string, password: string, count: number, isAdmin: boolean) {
    this.id = id;
    this.count = count;
    this.password = password;
    this.username = username;
    this.isAdmin = isAdmin;
  }
}
