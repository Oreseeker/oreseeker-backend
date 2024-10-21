import { Client } from "node-postgres";

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

type DatabaseDb = string;
type DatabaseHost = string;
type DatabaseUser = string;
type DatabasePassword = string;

type DataBaseConstructorPayload = {
  database: DatabaseDb;
  host: DatabaseHost;
  user: DatabaseUser;
  password: DatabasePassword;
}

class Database {
  #db: DatabaseDb;
  #host: DatabaseHost;
  #user: DatabaseUser;
  #password: DatabasePassword;
  #client: Client;

  constructor({ database, host, user, password }: DataBaseConstructorPayload) {
    this.#db = database;
    this.#host = host;
    this.#user = user;
    this.#password = password;
    this.#client = new Client({ database, host, user, password });
  }

  connect() {
    return this.#client.connect();
  }

  query(...q: Parameters<(typeof Client)['query']>) {
    return this.#client.query(q);
  }
}

export const database = new Database({
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});
