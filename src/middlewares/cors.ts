import crs = require("cors");

const corsWhitelist = [
  'http://localhost:8080',
  'http://localhost'
];

const corsOptions = {
  origin(origin, callback) {
    console.log('Request origin:', origin);
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

export const cors = crs(corsOptions);
