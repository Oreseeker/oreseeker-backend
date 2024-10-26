import { DataTypes } from 'sequelize';
import Generator = require("uid-generator");
import {BeforeCreate, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from './User.model';

@Table
export class UserSession extends Model {
  @Column({
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  userId: number;

  @Column({
    type: DataTypes.TEXT
  })
  userAgent: string;

  @Column({
    type: DataTypes.TEXT
  })
  ipAddress: string;

  @Column({
    type: DataTypes.TEXT
  })
  accessToken: string;

  @BeforeCreate
  static generateToken(userSession: UserSession) {
    userSession.accessToken = new Generator().generateSync();
  }
}

export default UserSession;

// UserSession.sync();

