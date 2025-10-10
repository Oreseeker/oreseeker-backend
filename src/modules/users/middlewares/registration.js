const { register } = load('../model.js');
const { successfulRegistrationHook } = load('@/utils/hooks');

async function registrationController(req, res, next) {
  const { username, password, email } = req.body;

  const status = await register(username, email, password);

  if (status) {
    res.sendStatus(200);
    successfulRegistrationHook.execute()
    return;
  }

  res.sendStatus(409);
}

module.exports = registrationController;
