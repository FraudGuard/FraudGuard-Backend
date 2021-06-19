import type { ConnectionOptions } from 'mongoose';
import { connect, connection } from 'mongoose';
import { dbConfig } from '../config';
import { logger } from '../logger';

// http://mongoosejs.com/docs/connections.html
// https://github.com/mongodb/node-mongodb-native
// https://docs.mongodb.com/manual/tutorial/configure-ssl-clients

const { url } = dbConfig;

// https://mongoosejs.com/docs/deprecations.html
const useNewUrlParser = true;

// findOneAndUpdate uses findOneAndUpdate() from MongoDB instead findAndModify()
const useFindAndModify = false;

// Mongoose uses createIndex() from MongoDB instead ensureIndex()
const useCreateIndex = true;

// MongoDB hat eine neue "Server Discover and Monitoring engine"
const useUnifiedTopology = true;

// Callback: Start des Appservers, nachdem der DB-Server gestartet ist
/**
 * Funktion die eine Verbindung zur MongoDB mit den gegebenen Verbindungsoptionen erstellt.
 */
const connectDB = async () => {
  logger.info(
    `URL for mongoose: ${url
      .replace(/\/\/.*:/u, '//USERNAME:@')
      .replace(/:[^:]*@/u, ':***@')}`,
  );

  // Optional Settings, that are not usable in the connection-string
  // http://mongoosejs.com/docs/connections.html
  // http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html#.connect
  // https://mongodb.github.io/node-mongodb-native/3.5/reference/connecting/connection-settings
  const options: ConnectionOptions = {
    useNewUrlParser,
    useFindAndModify,
    useCreateIndex,
    useUnifiedTopology,
  };

  // http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
  // http://mongoosejs.com/docs/api.html#connection_Connection-open
  // http://mongoosejs.com/docs/connections.html
  // https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
  // http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html
  try {
    await connect(url, options);
  } catch (err: any) {
    logger.error(`${JSON.stringify(err)}`);
    logger.error(`ERROR while connecting to DB: ${err.message as string}\n`);
    process.exit(0);
  }

  logger.info(`DB-Connection to ${connection.db.databaseName} is established`);

  connection.on('disconnecting', () =>
    logger.info('DB-Connection is being closed...'),
  );
  connection.on('disconnected', () => logger.info('DB-Connection is closed.'));
  connection.on('error', () => logger.error('Faulty DB-Connection'));
};

/**
 * Funktion die auf das Mongoose Objekt close ruft und bei einem Error den Server gewaltsam herunterfährt
 */
const disconnectDB = () => {
  connection.close().catch(() => process.exit(0));
};

export const autoIndex = false;

export { connectDB, disconnectDB };
