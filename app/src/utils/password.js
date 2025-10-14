const bcrypt = require('bcrypt');

function passwordToHash(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

function confirmPassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
  passwordToHash,
  confirmPassword,
};
