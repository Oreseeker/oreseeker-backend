import { Handler } from 'express';

export const acceptOnlyJSONBody: Handler = (req, res, next) => {
  if (req.method === 'GET') {
    next();
    return;
  }

  const isJSON = req.headers['content-type'] === 'application/json';
  if (!isJSON) {
    res.sendStatus(400);
    return;
  }
  next();
}
