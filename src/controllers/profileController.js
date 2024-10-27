const User = require('../models/User.model');
const { getAccessToken } = require('../utils/cookies');

const profileController = async (req, res, next) => {
  const accessToken = getAccessToken(req);
  console.log('PROFILE_CONTROLLER');

  const user = await User.logInByToken(accessToken);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  res.send(user);
}
