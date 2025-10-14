const { register } = require('../model.js');

async function registrationController(req, res, next) {
  const { username, password, email } = req.body;

  const status = await register(username, email, password);

  if (status) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(409);
}

module.exports = registrationController;
