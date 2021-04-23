import mongoose, { connection, ConnectOptions } from 'mongoose';

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}

const { DB_NAME, DB_HOST, DB_USER, DB_PASS } = process.env;

const dbName = DB_NAME ?? 'name';
const atlas = DB_HOST?.endsWith('mongodb.net') ?? false;
const host = DB_HOST ?? 'cluster0.mongodb.net';
const user = DB_USER ?? 'admin';
const pass = DB_PASS ?? 'p';

const url = `mongodb+srv://${user}:${pass}@${host}/${dbName}?retryWrites=true&w=majority`;
const adminUrl = `mongodb://${user}:${pass}@${host}/admin`;

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
};

export const disconnectDB = async () => {
  connection.close().catch(() => process.exit(0));
};

export const connectDB = async () => {
  mongoose.connect(url, options);
};

export const dbConfig = {
  atlas,
  url,
  adminUrl,
  dbName,
  host,
  user,
  pass,
};
