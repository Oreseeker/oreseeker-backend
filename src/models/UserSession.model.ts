import { sequelize } from '../database';
import { DataTypes } from 'sequelize';
import Generator = require("uid-generator");
import {Column, ForeignKey, Model} from 'sequelize-typescript';
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
}

// UserSession.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     userId: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//     },
//     userAgent: {
//       type: DataTypes.TEXT,
//     },
//     ipAddress: {
//       type: DataTypes.TEXT,
//     },
//     accessToken: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     sequelize,
//     hooks: {
//       beforeCreate(user, options) {
//         user.accessToken = new Generator().generateSync();
//       }
//     }
//   }
// );

