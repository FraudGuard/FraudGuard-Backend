import { MongoClient } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';
import { dbConfig } from '../config/db';
import { logger } from '../../shared/logger';

const connectMongoDB = async () => {
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

const closeMongoDBClient = (client: MongoClient): void => {
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
export { connectMongoDB, closeMongoDBClient };
