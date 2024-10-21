import {database} from "../database";

export const user= {
  async isUserRegistered(username, email) {
    return database.query(`
      SELECT EXISTS (
        SELECT 
          ''
        FROM
          USERS
        WHERE
          USERNAME = 
      )
    `);
  }

  static async register(username, email, password) {
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

  static async logIn(email, password, userAgent, ipAddress) {
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

  static async logInByToken(accessToken) {
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
} as const;
