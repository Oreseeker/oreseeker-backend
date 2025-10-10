const registration = load("./middlewares/registration.js");
const login = load("./middlewares/login.js");
const profile = load("./middlewares/profile.js");
const verification = load("./middlewares/verification");
const signOut = load("./middlewares/signOut");
const {
  registrationValidator,
  loginValidator,
  authenticationValidator,
  verificationValidator,
  signOutValidator
} = load('./validators');

router.get('/profile', authenticationValidator, profile);

router.post('/register', registrationValidator, registration);

router.post('/login', loginValidator, login);

router.patch('/verify', verificationValidator, verification);

router.patch('/sign-out', signOutValidator, signOut);

module.exports = router;
