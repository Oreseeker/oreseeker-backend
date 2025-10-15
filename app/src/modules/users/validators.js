const { checkSchema } = require('express-validator');
const { getAccessToken, getCookies } = load('@/utils/cookies');
const { validateSession } = require('./model.js');
const { isEmailValid, isUsernameValid, isInvitationCodeValid, isPasswordValid } = load('@/utils/validators');

const registrationValidator = async (req, res, next) => {
  const { username, email, invitationCode, password } = req.body;
  const isUsernameValid = typeof username === 'string' && username.length >= 3 && username.length <= 15;
  const isEmailValid
  const result = await checkSchema({
    username
      isString: {
        errorMessage: 'Username is required',
      },
      isLength: {
        options: {
          min: 3,
          max: 30,
        },
        errorMessage: 'Username must be greater than 3 characters and less than 30 characters',
      },
      in: 'body'
    },
    email: {
      isEmail: true,
      in: 'body'
    },
    invitationCode: {
      isString: {
        errorMessage: 'Invitation code is required',
      },
      in: 'body'
    },
    password: {
      custom: {
        options(value) {
          return new RegExp(process.env.PASSWORD_REGEX).test(value);
        }
      },
      in: 'body'
    }
  }).run(req);

  const isError = !result.every(i => i.isEmpty())

  if (isError) {
    const rs = result.reduce((acc, value) => {
      if (!value.errors.length) return acc;
      // TODO приватное свойство, надо поменять
      acc.push(value.errors);
      return acc;
    }, []);
    res.status(400).send(rs);
    return;
  }

  next();
}

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;

  const isEmailValid = typeof email === 'string' && email.includes('@');
  const isPasswordValid = typeof password === 'string' && !!password.length;
  
  const isValid = isEmailValid && isPasswordValid;

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
  const isValid = !!verificationToken && typeof verificationToken === 'string';

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
