import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import {passwordToHash, confirmPassword} from "../utils/password";
import {DataTypes} from "sequelize";
import { UserSession } from './UserSession.model';

@Table
export class User extends Model {
  @Column({
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  })
  username: string;

  @Column({
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  passwordHash: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @Column({
    type: DataTypes.TEXT,
  })
  verificationToken: string;

  @HasMany(() => UserSession, { foreignKey: 'userId' })
  session: UserSession;

  set password(p: string) {
    this.setDataValue('passwordHash', passwordToHash(p))
  }

  static async isUserRegistered(username: string, email: string) {
    const data = await User.findOne({
      attributes: ['id'],
      where: {
        username,
        email,
      }
    });

    return !!data;
  }

  static async register(username: string, email: string, password: string) {
    const isRegistered = await User.isUserRegistered(username, email);

    if (isRegistered) return false;

    const user = User.build({
      username,
      password,
      email,
    });

    await user.save();

    return true;
  };

  static async logIn(email: string, password: string, userAgent: string | undefined, ipAddress: string) {
    const usr = await User.findOne({
      attributes: [
        'id',
        'username',
        'passwordHash',
      ],
      where: {
        email,
      }
    });

    if (!usr) return false;

    if (!confirmPassword(password, usr.passwordHash)) return false;

    const res = await UserSession.create({
      userId: usr.id,
      userAgent,
      ipAddress
    });

    return { id: usr.id, accessToken: res.dataValues.accessToken, username: usr.username };
  }

  static async logInByToken(accessToken: string) {
    return await User.findOne({
      attributes: [
        'id',
        'username',
      ],
      include: [
        {
          model: UserSession,
          attributes: [],
          where: {
            accessToken
          },
        }
      ],
    });
  }
}

User.sync();
