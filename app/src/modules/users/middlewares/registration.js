const { register } = require('../model.js');

async function registrationController(req, res, next) {
  const { username, password, email, invitationCode } = req.body;
  console.log('password', password)

  const status = await register({ username, email, password, invitationCode });

  if (status) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(409);
}

module.exports = registrationController;
