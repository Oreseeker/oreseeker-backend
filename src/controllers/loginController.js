const User = require('../models/User.model');
const { setAccessToken } = require('../utils/cookies');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const userAgent = req.header('User-Agent');
  const ipAddress = req.headers['x-real-ip'];

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
