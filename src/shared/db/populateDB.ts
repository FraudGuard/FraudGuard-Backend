import type { Collection, Db } from 'mongodb';
import { dbConfig } from '../config';
import { logger } from '../logger';
import { ads } from './ads';
import { connectMongoDB } from './mongoDB';

const createCollection = async (db: Db) => {
  // http://mongodb.github.io/node-mongodb-native/3.5/api/Db.html#dropCollection
  const collectionName = 'Ads';
  logger.warn(`The collection "${collectionName}" is being deleted...`);
  let dropped = false;
  try {
    dropped = await db.dropCollection(collectionName);
  } catch (err: any) {
    // If the error isn't caused by dropping the collection
    if (err.name !== 'MongoError') {
      logger.error(`Error when reloading Database ${db.databaseName}`);
      return;
    }
  }
  if (dropped) {
    logger.warn(`The collection "${collectionName}" is deleted.`);
  }

  // http://mongodb.github.io/node-mongodb-native/3.5/api/Db.html#createCollection
  logger.warn(`The collection "${collectionName}" is being created...`);
  const collection = await db.createCollection(collectionName);
  logger.warn(`The collection "${collectionName}" is created.`);

  // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#insertMany
  const result = await collection.insertMany(ads);
  logger.warn(`${result.insertedCount} data set where inserted.`);

  return collection;
};

const createIndex = async (collection: Collection) => {
  logger.warn(
    `Indexes for "${collection.collectionName}" are being created...`,
  );

  // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#createIndex
  // Warning: the options for createIndexes() apply to all indexes
  // TODO auf was machen wir indexes? nach was soll man suchen können? discuss after 14.05
  let index = await collection.createIndex('scam', { sparse: true });
  logger.warn(`The index ${index} was created.`);
  index = await collection.createIndex('userId', { sparse: true });
  logger.warn(`The index ${index} was created.`);
};

export const populateDB = async (dev?: boolean) => {
  let devMode = dev;
  if (devMode === undefined) {
    devMode = dbConfig.dbPopulate;
  }
  logger.info(`populateDB(): devMode=${devMode}`);

  if (!devMode) {
    return;
  }
  const { db } = await connectMongoDB();

  const collection = await createCollection(db);
  if (collection === undefined) {
    return;
  }

  await createIndex(collection);
};
