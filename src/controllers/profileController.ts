import {Handler} from "express";

import { User } from '../models/User.model';
import { getAccessToken } from '../utils/cookies';

export const profileController: Handler = async (req, res, next) => {
  const accessToken = getAccessToken(req);
  console.log('PROFILE_CONTROLLER');

  const user = await User.logInByToken(accessToken);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  res.send(user);
}
