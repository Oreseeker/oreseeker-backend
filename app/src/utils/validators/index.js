const client = load('@/database');
const { invitationCodeExistsAndFree } = load('@/modules/users/model.js');

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
  return invitationCodeCorrect; 
}

async function isPasswordValid() {
  const query = `
    SELECT
      VALUE
    FROM
      SYSTEM_CONFIG
    WHERE
      KEY = 'passwordRegex'
  `;

  const res = await client.query(query);
  return res.rows[0].VALUE;
}

module.exports = {
  isEmailValid,
  isUsernameValid,
  isInvitationCodeValid,
  isPasswordValid,
}
