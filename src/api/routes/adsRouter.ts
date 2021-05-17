import { findById } from '../controllers';
import express, { Router } from 'express';
import { transform } from '../controllers/ads/transform';
import { transformEvaluate } from '../controllers/ads/transformEvaluate';

// eslint-disable-next-line new-cap
const adsRouter: Router = express.Router();

// TODO SWAGGER.io doc
adsRouter.route('/transform/evaluate').get(transformEvaluate);
adsRouter.route('/transform').get(transform);
adsRouter.route('/:id').get(findById);

export { adsRouter };
