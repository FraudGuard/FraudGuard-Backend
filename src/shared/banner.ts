import { logger } from './logger';
import { release, type } from 'os';
import { serverConfig } from './config/server';
import { version } from '../../package.json';
import ip from 'ip';

const { host, port } = serverConfig;

// TODO ES5?
const stripIndent = require('strip-indent');

export const printBanner = () => {
  const banner = `

         d8888      888
        d88888      888
       d88P888      888
      d88P 888  .d88888 .d8888b
     d88P  888 d88" 888 88K
    d88P   888 888  888 "Y8888b.
   d8888888888 Y88b 888      X88
  d88P     888  "Y88888  88888P'
    `;

  logger.info(stripIndent(banner));
  // https://nodejs.org/api/process.html
  logger.info(`Version:           ${version}`);
  logger.info(`Node:              ${process.version}`);
  logger.info(`Hostname:          ${host}`);
  logger.info(`IP-Adress:         ${ip.address()}:${port}`);
  logger.info(`Operating system:  ${type()} ${release()}`);
  logger.info('');

  logger.info(
    `Server started on "http://localhost:${port}" : Shutdown by pressing <Ctrl>C`,
  );
};
