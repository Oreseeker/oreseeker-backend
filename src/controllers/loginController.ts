import { Handler } from "express";

import { User } from '../models/User.model';
import { setAccessToken } from '../utils/cookies';

export const loginController: Handler = async (req, res, next) => {
  const { email, password } = req.body;
  const userAgent = req.header('User-Agent');
  const ipAddress = req.headers['x-real-ip'] as string;

  const data = await User.logIn(email, password, userAgent, ipAddress);

  if (data === false) {
    res.sendStatus(404);
    return;
  }

  const { id, accessToken, username } = data;

  res.cookie('userId', id, { httpOnly: true, secure: true });
  setAccessToken(accessToken, res);

  res.send({ id, username });
}

module.exports = loginController;
