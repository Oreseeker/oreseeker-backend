import { sequelize } from '../database';
import { DataTypes } from 'sequelize';
import Generator = require("uid-generator");
import {BeforeCreate, Column, ForeignKey, Model} from 'sequelize-typescript';
import {User} from './User.model';

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
  generateToken(userSession: UserSession) {
    userSession.accessToken = new Generator().generateSync();
  }
}

UserSession.sync();

