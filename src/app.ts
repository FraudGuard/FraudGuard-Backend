import { adsRouter, analyzeRouter, labelRouter } from './api/routes';
import { corsHandler, helmetHandlers } from './security';
import { loggerProfiles, serverConfig } from './shared';
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

const apiPath = '/api';
export const PATHS = {
  ads: `${apiPath}/ads`,
  analyze: `${apiPath}/analyze`,
  label: `${apiPath}/label`,
};

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
    this.app.use(PATHS.ads, adsRouter);
    this.app.use(PATHS.analyze, analyzeRouter);
    this.app.use(PATHS.label, labelRouter);
    this.app.get('/', (_, res) => {
      res.send('Hello World on "/" => GET');
    });
  }
}

export const { app } = new App();
