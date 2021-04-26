import { createServer } from 'https';
import { connectDB, logger, populateDB, serverConfig } from '../src/shared';
import type { AddressInfo } from 'net';
import type { RequestListener } from 'http';
import type { Server } from 'http';
import { app } from '../src/app';

const { host, dev } = serverConfig;
let server: Server;

export const createTestserver = async () => {
  await populateDB(dev);
  await connectDB();

  server = createServer(app as RequestListener).listen(() => {
    logger.info(`Node ${process.version}`);
    const address = server.address() as AddressInfo;
    if (address !== null && typeof address !== 'string') {
      logger.info(`Testserver started on: https://${host}:${address.port}`);
    }
    server.emit('testServerStarted');
  });
  return server;
};

// export enum HttpMethod {
//   GET = 'get',
//   POST = 'post',
//   PUT = 'put',
//   PATCH = 'patch',
//   DELETE = 'delete',
// }
