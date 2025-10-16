const crs = require("cors");

const corsWhitelist = [
  'http://localhost:8000',
  'http://localhost',
  'https://localhost:8000',
  'https://localhost',
];

const cors = crs(
  {
    origin(origin, callback) {
      console.log('Request origin:', origin);
      if (origin && corsWhitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
);

module.exports = cors;
