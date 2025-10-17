const client = load('@/database');
const { invitationCodeExistsAndFree } = load('@/modules/users/model.js');
const {
  containsUppercase,
  containsLowercase,
  containsDigits,
  containsSpecialSymbols
} = load('@/utils/strings');

function isEmailValid(value) {
  return typeof value === 'string' && value.includes('@');
}

async function isUsernameValid(value) {
  const query = `
    SELECT
      KEY,
      VALUE
    FROM
      SYSTEM_CONFIG
    WHERE
      KEY LIKE 'USERNAME%'
  `;

  const res = await client.query(query);
  const usernameObj = res.rows.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});

  const {
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH
  } = usernameObj;
  
  return typeof value === 'string' && value.length >= USERNAME_MIN_LENGTH && value.length <= USERNAME_MAX_LENGTH;
}

async function isInvitationCodeValid(value) {
  if (typeof value !== 'string') return false;
  const invitationCodeCorrect = await invitationCodeExistsAndFree(value);  
  console.log(invitationCodeCorrect, '111');
  return invitationCodeCorrect; 
}

async function isPasswordValid(password) {
  const query = `
    SELECT
      KEY,
      VALUE
    FROM
      SYSTEM_CONFIG
    WHERE
      KEY LIKE 'PASSWORD%'
  `;

  const res = await client.query(query);
  const passwordObj = res.rows.reduce((acc, { key, value }) => {
    acc[key] = +value;
    return acc;
  }, {});

  const {
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_NUMBER_OF_UPPERCASE_LETTERS,
    PASSWORD_MIN_NUMBER_OF_LOWERCASE_LETTERS,
    PASSWORD_MIN_NUMBER_OF_SPECIAL_SYMBOLS,
    PASSWORD_MIN_NUMBER_OF_DIGITS,
  } = passwordObj;

  const isLongEnough = password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH;
  const containsEnoughUppercaseSymbols = containsUppercase(password, PASSWORD_MIN_NUMBER_OF_UPPERCASE_LETTERS);
  const containsEnoughLowercaseSymbols = containsLowercase(password, PASSWORD_MIN_NUMBER_OF_LOWERCASE_LETTERS);
  const containsSpecSymbols = containsSpecialSymbols(password, PASSWORD_MIN_NUMBER_OF_SPECIAL_SYMBOLS);
  const containsDigs = containsDigits(password, PASSWORD_MIN_NUMBER_OF_DIGITS); 
  return isLongEnough && containsEnoughUppercaseSymbols && containsEnoughLowercaseSymbols && containsSpecSymbols && containsDigs;
}

module.exports = {
  isEmailValid,
  isUsernameValid,
  isInvitationCodeValid,
  isPasswordValid,
}
