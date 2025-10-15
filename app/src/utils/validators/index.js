const client = load('@/database');

function isEmailValid(value) {
  return typeof value === 'string' && string.includes('@');
}

function isUsernameValid(value) {
  return typeof value === 'string' && value.length >= 3 && value.length <= 15;
}

function isInvitationCodeValid(value) {
  return typeof value === 'string'; 
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
}
