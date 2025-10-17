const bcrypt = require('bcrypt');

function passwordToHash(password) {
  const saltRounds = 10;
  console.log('password', password)
  return bcrypt.hashSync(password, saltRounds);
}

function confirmPassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
  passwordToHash,
  confirmPassword,
};
