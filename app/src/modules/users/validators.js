const { checkSchema } = require('express-validator');
const { getAccessToken, getCookies } = load('@/utils/cookies');
const { validateSession } = require('./model.js');
const { isEmailValid, isUsernameValid, isInvitationCodeValid, isPasswordValid } = load('@/utils/validators');

const registrationValidator = async (req, res, next) => {
  const { username, email, invitationCode, password } = req.body;
  console.log('validator!!!');
  console.log(username);
  console.log(isUsernameValid(email));
  const isValid = isEmailValid(email)
     && isUsernameValid(username)
     && await isInvitationCodeValid(invitationCode)
     && isPasswordValid(password);

  if (!isValid) {
    res.status(400).send({ message: 'Invalid payload' });
    return;
  }

  next();
}

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  const isValid = isEmailValid(email) && isPasswordValid(password);

  if (!isValid) {
    res.status(400).send({ message: 'Invalid email or password' });
    return;
  }

  next();
}

const authenticationValidator = async (req, res, next) => {
  const accessToken = getAccessToken(req);
  const { userId } = getCookies(req);

  if (!userId || !accessToken) {
    res.sendStatus(401);
    return;
  }

  const isSessionValid = await validateSession(userId, accessToken);

  if (isSessionValid) {
    next();
    return;
  }


  res.sendStatus(401);
}

async function verificationValidator(req, res, next) {
  const { verificationToken } = req.body; 
  const isValid = isVerificationTokenValid(verificationToken);
  if (!isValid) {
    res.status(400).send({ message: 'verificationToken must be a string' });
    return;
  }

  next();
}

function signOutValidator(req, res, next) {
  const accessToken = getAccessToken(req);

  if (!accessToken) {
    res.send(400);
    return;
  }

  next();
}

module.exports = {
  registrationValidator,
  loginValidator,
  authenticationValidator,
  verificationValidator,
  signOutValidator,
}
