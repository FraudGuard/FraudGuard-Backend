import { Request } from 'express';
import { serverConfig } from './config';

/**
 * Funktion welche die BaseUri aus dem Request ausliest
 * @param {req} req - Eingehender Request welcher umgewandelt wird
 * @return {string} - returns BaseUri
 */
export const getBaseUri = (req: Request) => {
  const { protocol, hostname, baseUrl } = req;
  return `${protocol}://${hostname}${serverConfig.port}${baseUrl}`;
};
