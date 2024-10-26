import process = require('process');
import { divideString } from './strings';
import type { Response, Request } from 'express';

type Cookies = {
  accessTokenOne: string;
  accessTokenTwo: string;
}

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

export function getCookies(req: Request): Record<string, any> {
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
  }, {} as Record<string, unknown>);

  return cookies;
}
