import type { ConnectionOptions } from 'mongoose';
import { connect, connection } from 'mongoose';
import { dbConfig } from '../config';
import { logger } from '../logger';

const { url } = dbConfig;

const useNewUrlParser = true;

const useFindAndModify = false;
const useCreateIndex = true;
const useUnifiedTopology = true;

/**
 * Funktion die eine Verbindung zur MongoDB mit den gegebenen Verbindungsoptionen erstellt.
 */
const connectDB = async () => {
  logger.info(
    `URL for mongoose: ${url
      .replace(/\/\/.*:/u, '//USERNAME:@')
      .replace(/:[^:]*@/u, ':***@')}`,
  );

  const options: ConnectionOptions = {
    useNewUrlParser,
    useFindAndModify,
    useCreateIndex,
    useUnifiedTopology,
  };

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
