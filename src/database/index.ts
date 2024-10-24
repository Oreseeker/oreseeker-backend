import * as path from 'node:path';

const { Sequelize } = require('sequelize-typescript');

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  models: [
    path.join(__dirname, '..', 'models')
  ]
});

