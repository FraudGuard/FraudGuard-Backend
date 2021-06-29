import { name, version, description } from '../../../package.json';
import express, { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// eslint-disable-next-line new-cap
export const swaggerRouter: Router = express.Router();
export const swaggerJsDocOptions = {
  swaggerDefinition: {
    info: {
      title: name,
      version,
      description,
    },
    openapi: '3.0.3',
    server: {
      url: 'http://locahost:4200/',
      description: 'development server',
    },
  },
  apis: [
    'src/api/routes/adsRouter.ts',
    'src/api/routes/analyzeRouter.ts',
    'src/api/routes/labelRouter.ts',
  ],
};

export const swaggerUiOptions = {
  explorer: true,
};

const swaggerSpec = swaggerJSDoc(swaggerJsDocOptions);
swaggerUi.setup(swaggerSpec, swaggerUiOptions);

swaggerRouter
  .use('/', swaggerUi.serve)
  .get('/', swaggerUi.setup(swaggerSpec, swaggerUiOptions));
