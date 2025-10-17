const client = load('@/database');
const { invitationCodeExistsAndFree } = load('@/modules/users/model.js');
const { containsUppercase, containsLowercase } = load('@/utils/strings');

function isEmailValid(value) {
  return typeof value === 'string' && value.includes('@');
}

function isUsernameValid(value) {
  return typeof value === 'string' && value.length >= 3 && value.length <= 15;
}

async function isInvitationCodeValid(value) {
  console.log('value', value);
  if (typeof value !== 'string') return false;
  const invitationCodeCorrect = await invitationCodeExistsAndFree(value);  
  console.log(invitationCodeCorrect, '111');
  return invitationCodeCorrect; 
}

async function isPasswordValid() {
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

  const isLongEnough = password.length -> PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH;
  const containsEnoughUppercaseSymbols = containsUpperCase(password);
  const containsEnoughLowercaseSymbols = containsLowercase(password); 
  return res.rows[0].VALUE;
}

module.exports = {
  isEmailValid,
  isUsernameValid,
  isInvitationCodeValid,
  isPasswordValid,
}
