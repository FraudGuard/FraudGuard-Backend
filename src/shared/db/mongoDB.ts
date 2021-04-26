import { MongoClient } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';
import { dbConfig } from '../config/db';
import { logger } from '../../shared/logger';

export const connectMongoDB = async () => {
  const { dbName, url } = dbConfig;
  logger.debug(`mongodb.connectMongoDB(): url=${url}`);
  const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = new MongoClient(url, options);
  await client.connect();
  logger.debug('mongodb.connectMongoDB(): DB-Client geoeffnet');
  const db = client.db(dbName);

  return { db, client };
};

// NICHT: async, weil die Funktion fuer Request-Events beim Hochladen und
// fuer GridFS-Events beim Herunterladen verwendet wird
export const closeMongoDBClient = (client: MongoClient): void => {
  // IIFE (= Immediately Invoked Function Expression) wegen await
  // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
  // https://github.com/typescript-eslint/typescript-eslint/issues/647
  // https://github.com/typescript-eslint/typescript-eslint/pull/1799
  (async () => {
    try {
      await client.close();
    } catch (err: unknown) {
      logger.error(`mongodb.closeDbClient(): ${JSON.stringify(err)}`);
      return;
    }

    logger.debug('mongodb.closeDbClient(): DB-Client wurde geschlossen');
  })();
};
