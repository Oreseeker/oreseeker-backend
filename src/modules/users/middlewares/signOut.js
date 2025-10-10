const { signOut } = load('../model.js');
const { getAccessToken } = load('@/utils/cookies');

async function signOutController(req, res) {
  const accessToken = getAccessToken(req);

  signOut(accessToken)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

module.exports = signOutController;
