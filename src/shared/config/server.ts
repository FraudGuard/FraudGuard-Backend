import { hostname } from 'os';
import ip from 'ip';
import RE2 from 're2';

interface ServerConfig {
  dev: boolean;
  production: boolean;
  host: string;
  port: number;
  ip: string;
  key?: Buffer;
  cert?: Buffer;
}

const computername = hostname();
const ipAddress = ip.address();

// https://github.com/google/re2
// https://github.com/uhop/node-re2
export const userIdRegexp = new RE2('[\\0-9]{8}', 'u');

const { env } = process;
const { NODE_ENV, SERVER_PORT } = env;

let port = 3000;
if (SERVER_PORT !== undefined) {
  port = Number.parseInt(SERVER_PORT, 10);
}

export const production = NODE_ENV === 'production';
let dev = false;
if (
  NODE_ENV !== undefined &&
  (NODE_ENV.startsWith('dev') || NODE_ENV.startsWith('test'))
) {
  dev = true;
}

export const serverConfig: ServerConfig = {
  dev,
  production,
  host: computername,
  ip: ipAddress,
  port,
};
