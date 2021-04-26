import { findById } from '../controllers';
import express, { Router } from 'express';

// eslint-disable-next-line new-cap
const adRouter: Router = express.Router();

// TODO SWAGGER.io doc
adRouter.route('/:id').get(findById);

export default adRouter;
