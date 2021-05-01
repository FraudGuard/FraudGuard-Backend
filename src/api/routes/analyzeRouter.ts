import express, { Router } from 'express';
import { analyzeFromApi } from '../controllers/analyze/analyzeFromApi';
import { analyzeFromDb } from '../controllers/analyze/analyzeFromDb';

// eslint-disable-next-line new-cap
const analyzeRouter: Router = express.Router();

// TODO SWAGGER.io doc
analyzeRouter.route('/:id').get(analyzeFromApi);
analyzeRouter.route('/fromDb/:id').get(analyzeFromDb);

export { analyzeRouter };
