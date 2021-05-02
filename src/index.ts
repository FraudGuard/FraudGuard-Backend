import { app } from './app';
import { createServer } from 'http';
import {
  disconnectDB,
  connectDB,
  printBanner,
  serverConfig,
  logger,
  populateDB,
} from './shared';
import { Server } from 'net';

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
  logger.info('Hallo leute');

  // <CTRL>C
  process.on('SIGINT', shutdown);

  process.on('unhandledRejection', (err) => {
    logger.error('unhandled rejection', err);
  });
};

(async () => {
  try {
    startServer();
    await connectDB();
    await populateDB();
  } catch (err: unknown) {
    logger.error(`Error while starting Server: ${err}`);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});