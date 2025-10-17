const client = load('@/database');
const { passwordToHash, confirmPassword } = load('@/utils/password.js');

async function isUserRegistered(username, email) {
  const query = `
    SELECT EXISTS(
      SELECT
        ID
      FROM
        USERS
      WHERE
       USERNAME = $1
       OR EMAIL = $2
    )
  `;

  const res = await client.query(query, [username, email]);
  return res.rows[0].exists;
}

async function createUser({
  username,
  password,
  email,
  verified = false,
  verificationToken = passwordToHash(new Date().getTime().toString()),
  invitationCodeId,
}) {
  const passwordHash = passwordToHash(password);

  const query = `
    INSERT INTO 
      USERS (
        USERNAME,
        PASSWORD_HASH,
        EMAIL,
        VERIFIED,
        VERIFICATION_TOKEN,
        INVITATION_CODE_ID
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
      )
  `;

  return client.query(query, [username, passwordHash, email, verified, verificationToken, invitationCodeId]);
}

async function getInvitationCodeId(invitationCode) {
 const query = `
   SELECT 
     ID
   FROM
     INVITATION_CODES
   WHERE
     VALUE = $1 
 `;

  const res = await client.query(query, [invitationCode]);
  return res.rows[0].ID;
}

async function register({ username, email, password, invitationCode }) {
  const isRegistered = await isUserRegistered(username, email);
  console.log(isRegistered);
  if (isRegistered) return false;

  const invitationCodeId = await getInvitationCodeId(invitationCode);

  return createUser({ username, email, password, invitationCode })
      .then(() => true)
      .catch((r) => console.log(r) && false);
}

async function createUserSession(userId, userAgent, ipAddress) {
  const query = `
    INSERT INTO USER_SESSIONS (
      USER_ID,
      USER_AGENT,
      IP_ADDRESS
    ) VALUES (
      $1,
      $2,
      $3
    ) 
  `;

  return client.query(query, [userId, userAgent, ipAddress]);
}

async function logIn(email, password, userAgent, ipAddress) {
  const query = `
    SELECT
      ID,
      USERNAME,
      PASSWORD_HASH,
      VERIFIED
    FROM
      USERS
    WHERE
      EMAIL = $1
  `;

  const res = await client.query(query, [email]);

  const usr = res.rows[0];

  if (!usr) return false;

  if (!usr.verified) return 'not_verified';

  if (!confirmPassword(password, usr.passwordHash)) return false;

  const userSessionRes = createUserSession({ userId: usr.id, userAgent, ipAddress });

  console.log('userSessionRes', userSessionRes);

  return { id: usr.id, accessToken: userSessionRes.accessToken, username: usr.username };
}

async function logInByToken(accessToken) {
  const query = `
    SELECT
      ID,
      USERNAME
    FROM
      USERS
    LEFT JOIN
      USER_SESSIONS
    ON
      USERS.ID = USER_SESSIONS.USER_ID
    WHERE
      ACCESS_TOKEN = $1
      AND ACTIVE = 1
  `;

  return client.query(query, [accessToken]);
}

/**
 * Function returns true if session is valid, otherwise false.
 * @param {number} userId
 * @param {AccessToken} accessToken
 * @param {UserAgent} [userAgent='']
 * @param {IpAddress} [ipAddress='']
 * @return {boolean}
 * */
async function validateSession(userId, accessToken, userAgent = '', ipAddress= '') {
  const query = `
    SELECT
      USERS.ID
    FROM 
      USERS
    LEFT JOIN
      USES_SESSIONS
    ON 
      USER_SESSIONS.USER_ID = USERS.ID
    WHERE
      USER_SESSIONS.ACCESS_TOKEN = $1
      AND USER_SESSIONS.USER_AGENT = $2
      AND USER_SESSIONS.IP_ADDRESS = $3
      AND USER_SESSIONS.ACTIVE = 1
  `;

  return client.query(query, [accessToken, userAgent, ipAddress, active])
    .then(res => !!res.rows.length)
    .catch(false);
}

async function verify(verificationToken) {
  const query = `
    UPDATE
      USERS
    SET
      VERIFIED = 1
    WHERE
      VERIFICATION_TOKEN = $1
  `;

   const res = await client.query(query, [verificationToken]);
   console.log('res', res);
   return !!res[0];
}

async function getVerificationToken(email, password) {
  const query = `
    SELECT
      VERIFICATION_TOKEN,
      PASSWORD_HASH
    FROM
      USERS
    WHERE
      EMAIL = $1
  `;

  const res = await client.query(query, [email]);

  if (!confirmPassword(password, user.passwordHash)) return null;

  return res.rows[0].verificationToken;
}

function signOut(accessToken) {
  const query = `
     UPDATE
       USER_SESSIONS
     SET
       ACTIVE = 0
     WHERE
       ACCESS_TOKEN = $1
  `;

  return client.query(query, [accessToken]);
}

async function invitationCodeExistsAndFree(value) {
  const query = `
    SELECT EXISTS (
      SELECT
         VALUE
       FROM
         INVITATION_CODES
       WHERE
         VALUE = $1
    )
  `;

  const res = await client.query(query, [value]);
  return res.rows[0].exists;
}

module.exports = {
  isUserRegistered,
  validateSession,
  getVerificationToken,
  verify,
  validateSession,
  register,
  createUserSession,
  logInByToken,
  signOut,
  createUser,
  invitationCodeExistsAndFree,
  getInvitationCodeId,
};
