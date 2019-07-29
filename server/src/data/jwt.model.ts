import { Model, Table, Column } from "sequelize-typescript";

@Table
class Jwt extends Model<Jwt> {
  @Column({ allowNull: true })
  jti!: string;
}

export default Jwt;
