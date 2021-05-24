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
 *  Erstellt eine Express application. Die Funtkion express() ist eine top-level Funktion welche vom Express Modul exportiert wird.
 * @param {IExpress} app Express App Objekt
 * @param {Logger} logger Pino Logger Objekt
 */
class App {
  readonly app: IExpress = express();
  logger!: Logger;

  /**
   * Konstruktor für die Appklasse.
   */
  constructor() {
    this.config();
    this.routes();
  }

  /**
   * Initialisiert settings/middleware für das App-Object.
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
   * Initialisiert die Routes (Pfade) für das App-Object.
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
