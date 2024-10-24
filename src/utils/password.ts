import bcrypt = require('bcrypt');

export function passwordToHash(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function confirmPassword(password: string, passwordHash: string) {
  return bcrypt.compareSync(password, passwordHash);
}
