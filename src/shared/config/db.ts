import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}

const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_POPULATE } = process.env;

const dbName = DB_NAME ?? 'name';
const host = DB_HOST ?? 'cluster0.mongodb.net';
const user = DB_USER ?? 'admin';
const pass = DB_PASS ?? 'p';
const dbPopulate = DB_POPULATE !== undefined;

const url = `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority`;
const adminUrl = `mongodb://${user}:${pass}@${host}/admin`;

export const dbConfig = {
  url,
  adminUrl,
  dbName,
  host,
  user,
  pass,
  dbPopulate,
};
