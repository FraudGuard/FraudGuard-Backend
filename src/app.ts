import { corsHandler } from './security';
import { helmetHandlers } from './security';
import { loggerProfiles } from './shared';
import { serverConfig } from './shared';
import adRouter from './api/routes/ads';
import compression from 'compression';
import express, { Express as IExpress } from 'express';
import pino, { Logger } from 'pino';

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}
const ExpressPinoLogger = require('express-pino-logger')({
  serializers: {
    req: (req: { method: any; url: any }) => ({
      method: req.method,
      url: req.url,
    }),
    res: (res: { statusCode: any }) => ({
      statusCode: res.statusCode,
    }),
  },
});

export const PATH = 'api/ads/';

/**
 * Create App Object with pino logger.
 * @param {IExpress} app Express App-Object.
 * @param {Logger} logger
 */
class App {
  readonly app: IExpress = express();
  logger!: Logger;

  /**
   * Constructor for App class
   */
  constructor() {
    this.config();
    this.routes();
  }

  /**
   * initializes settings/middleware for App-Object.
   */
  private config() {
    // Logging
    if (serverConfig.dev) {
      this.logger = pino(loggerProfiles.get('dev'));
    } else {
      this.logger = pino(loggerProfiles.get('info'));
    }

    this.app.use(
      express.urlencoded({ extended: false }),
      express.json(),
      compression(),
      ...helmetHandlers,
      corsHandler,
      ExpressPinoLogger,
    );
  }

  /**
   * loads routes for the paths.
   */
  private routes() {
    this.app.use(PATH, adRouter);
    // this.app.get('*', notFound);
    // this.app.use(internalError);

    this.app.get('/', (_, res) => {
      res.send('Hello World on "/" => GET');
    });
  }
}

export const { app } = new App();
