import { app } from './app';
import { createServer } from 'http';
import {
  disconnectDB,
  connectDB,
  printBanner,
  serverConfig,
  logger,
} from './shared';
import { Server } from 'net';

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}

const { port } = serverConfig;

/**
 * Trennt die Verbindung der MongoDB und beendet den Serverprozess.
 */
const shutdown = async () => {
  logger.info('Server is being shutdown');
  disconnectDB();
  process.exit(0);
};

/**
 * Startet den Server auf den gegebenen Port in der .env-Datei und injeziert ein Express app-Objekt durch Construktor Injection.
 * Legt fest dass der Server durch einen 'SIGNINT' Event die shutdown Funktion aufruft.
 */
const startServer = () => {
  const server: Server = createServer(app);
  server.listen(port, printBanner);

  // <CTRL>C
  process.on('SIGINT', shutdown);

  process.on('unhandledRejection', (err) => {
    logger.error('unhandled rejection', err);
  });
};

/**
 * IIFE (Immediately Invoked Function Expression), die ausgeführt wird, sobald sie definiert wird.
 */
(async () => {
  try {
    startServer();
    await connectDB();
  } catch (err: unknown) {
    logger.error(`Error while starting Server: ${err}`);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
