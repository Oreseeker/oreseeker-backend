const { logIn } = load('../model.js');
const cookies = load('@/utils/cookies.js');

async function loginController(req, res, next) {
  const { email, password } = req.body;
  const userAgent = req.header('User-Agent');
  const ipAddress = req.headers['x-real-ip'];

  const data = await logIn(email, password, userAgent, ipAddress);

  if (data === false) return res.sendStatus(404);
  else if (data === 'not_verified') return res.sendStatus(403);

  const { id, accessToken, username } = data;

  res.cookie('userId', id, { httpOnly: true });
  cookies.setAccessToken(accessToken, res);

  res.send({ id, username });
}

module.exports = loginController;
