import bodyParser = require('body-parser');
import express = require('express');
import { acceptOnlyJSONBody } from "./src/middlewares";
import { cors } from './src/middlewares/cors';

function createApp() {
  const app = express();

  app.use(cors);
  app.use(acceptOnlyJSONBody);
  app.use(bodyParser());

  return app;
}

module.exports = { createApp };
