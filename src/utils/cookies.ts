import process = require('process');
const { divideString } = require("./strings.js");
import type { Response, Request } from 'express';

export function setAccessToken(accessToken: string, res: Response) {
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

export function getAccessToken(req: Request) {
  const { accessTokenOne, accessTokenTwo } = getCookies(req);
  if (!accessTokenOne || !accessTokenTwo) return null;
  return accessTokenOne + accessTokenTwo;
}

export function getCookies(req: Request) {
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
