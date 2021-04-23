import { Request } from 'express';
import { serverConfig } from './config';

export const getBaseUri = (req: Request) => {
  const { protocol, hostname, baseUrl } = req;
  return `${protocol}://${hostname}${serverConfig.port}${baseUrl}`;
};
