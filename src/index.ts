import { app } from './app';
import { createServer } from 'http';
import { disconnectDB, connectDB } from './shared';
import { logger } from './shared';
import { printBanner } from './shared';
import { Server } from 'net';
import { serverConfig } from './shared';

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}

const { port } = serverConfig;

const shutdown = async () => {
  logger.info('Server is being shutdown');
  disconnectDB();
  process.exit(0);
};

const startServer = () => {
  const server: Server = createServer(app);
  server.listen(port, printBanner);

  // <CTRL>C
  process.on('SIGINT', shutdown);

  process.on('unhandledRejection', (err) => {
    logger.error('unhandled rejection', err);
  });
};

(async () => {
  try {
    startServer();
    connectDB();
    // dbPopulate();
  } catch (err: unknown) {
    logger.error(`Error while starting Server: ${err}`);
  }
})();
