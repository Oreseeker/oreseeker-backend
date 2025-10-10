const { logInByToken } = load('../model.js');
const cookies = load('@/utils/cookies.js');

async function profileController(req, res, next) {
  const accessToken = cookies.getAccessToken(req);

  const user = await logInByToken(accessToken);

  if (!user) return res.sendStatus(401);

  res.send(user);
}

module.exports = profileController;
