import { findById } from '../controllers';
import express, { Router } from 'express';

// eslint-disable-next-line new-cap
const adsRouter: Router = express.Router();

// TODO SWAGGER.io doc
adsRouter.route('/:id').get(findById);

export { adsRouter };
