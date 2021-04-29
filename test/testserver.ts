import { app } from '../src/app';
import { connectDB, logger, populateDB, serverConfig } from '../src/shared';
import { createServer } from 'https';
import type { Server } from 'http';

const { host, dev } = serverConfig;
let server: Server;

export const createTestserver = async () => {
  await populateDB(dev);
  await connectDB();

  server = createServer(app).listen(() => {
    logger.info(`Node ${process.version}`);
    const address = server.address();
    if (address !== null && typeof address !== 'string') {
      logger.info(`Testserver started on: https://${host}:${address.port}`);
    }
    server.emit('testServerStarted');
  });
  return server;
};