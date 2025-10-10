const { Client } = require('pg');
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const client = new Client({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  db: POSTGRES_DB,
});

client.connect();

module.exports = client;
