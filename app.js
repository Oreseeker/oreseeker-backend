require('./src/database');
const bodyParser = require('body-parser');
const express = require('express');
const acceptOnlyJSONBody = require('./src/middlewares/acceptOnlyJSONBody');
const cors = require('./src/middlewares/cors');
const router = require('./src/routes');

module.exports = function createApp() {
  const app = express();

  app.use(cors);
  app.use(acceptOnlyJSONBody);
  app.use(bodyParser.json());
  app.use(router);

  return app;
}
