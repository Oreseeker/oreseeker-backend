const User = require("../models/User.model");

const registrationController = async (req, res, next) => {
  const { username, password, email } = req.body;

  const status = await User.register(username, email, password);

  if (status) {
    res.sendStatus(200);
    return;
  }

  res.sendStatus(409);
}

module.exports = registrationController;
