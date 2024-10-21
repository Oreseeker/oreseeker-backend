const process = require('process');
const { divideString } = require("./strings.js");

export function setAccessToken(accessToken, res) {
  const [ac1, ac2] = divideString(accessToken);
  const secure = process.env.NODE_ENV !== 'development';

  res.cookie('accessTokenOne', ac1, {
    secure
  });

  res.cookie('accessTokenTwo', ac2, {
    secure,
    httpOnly: true,
  });
}

export function getAccessToken(req) {
  const { accessTokenOne, accessTokenTwo } = getCookies(req);
  if (!accessTokenOne || !accessTokenTwo) return null;
  return accessTokenOne + accessTokenTwo;
}

export function getCookies(req) {
  const rawCookies = req.headers.cookie;
  if (!rawCookies) return {};
  const cookies = rawCookies.split('; ').reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split('=');
    if (!isNaN(+value)) {
      accumulator[key] = +value;
    } else {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});

  const { accessTokenOne, accessTokenTwo } = cookies;

  if (accessTokenOne && accessTokenTwo) {
    cookies.accessToken = accessTokenOne + accessTokenTwo;
  }

  return cookies;
}
