import { Model, Table, Column, Default, Unique } from "sequelize-typescript";

@Table
class User extends Model<User> {
  @Unique
  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: false })
  password!: string;

  @Default(0)
  @Column
  count!: number;

  @Column({ allowNull: true })
  jti!: string;
  
  @Default(false)
  @Column
  isAdmin!: boolean;


}

export default User;
