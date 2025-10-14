const express = require('express');
const registration = require('./middlewares/registration.js');
const login = require('./middlewares/login.js');
const profile = require('./middlewares/profile.js');
const verification = require('./middlewares/verification');
const signOut = require('./middlewares/signOut');
const {
  registrationValidator,
  loginValidator,
  authenticationValidator,
  verificationValidator,
  signOutValidator
} = require('./validators');

const router = express.Router();

router.get('/profile', authenticationValidator, profile);

router.post('/register', registrationValidator, registration);

router.post('/login', loginValidator, login);

router.patch('/verify', verificationValidator, verification);

router.patch('/sign-out', signOutValidator, signOut);

module.exports = router;
