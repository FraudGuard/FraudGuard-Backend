import { logger } from './logger';
import { release, type } from 'os';
import { serverConfig } from './config/server';
import { version } from '../../package.json';
import ip from 'ip';
const stripIndent = require('strip-indent');

const { host, port } = serverConfig;

/**
 * Funktion die bei Serverstart das Banner und die Versionen der genutzten Software druckt.
 */
export const printBanner = () => {
  const banner = `

      8888888888                            888  .d8888b.                                888
      888                                   888 d88P  Y88b                               888
      888                                   888 888    888                               888
      8888888 888d888 8888b.  888  888  .d88888 888        888  888  8888b.  888d888 .d88888
      888     888P"      "88b 888  888 d88" 888 888  88888 888  888     "88b 888P"  d88" 888
      888     888    .d888888 888  888 888  888 888    888 888  888 .d888888 888    888  888
      888     888    888  888 Y88b 888 Y88b 888 Y88b  d88P Y88b 888 888  888 888    Y88b 888
      888     888    "Y888888  "Y88888  "Y88888  "Y8888P88  "Y88888 "Y888888 888     "Y88888
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
