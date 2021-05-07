import { app } from '../src/app';
import { connectDB, logger, serverConfig } from '../src/shared';
import { createServer } from 'https';
import type { Server } from 'http';

const { host } = serverConfig;
let server: Server;

export const createTestserver = async () => {
  await connectDB();

  server = createServer(app).listen(() => {
    logger.info(`Node ${process.version}`);
    const address = server.address();
    if (address !== null && typeof address !== 'string') {
      logger.info(`Testserver started on: http://${host}:${address.port}`);
    }
    server.emit('testServerStarted');
  });
  return server;
};
