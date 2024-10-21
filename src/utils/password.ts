import bcrypt = require('bcrypt');

export function passwordToHash(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function confirmPassword(password, passwordHash) {
  return bcrypt.compareSync(password, passwordHash);
}
