import { getDataById } from '../controllers';
import express, { Router } from 'express';

// eslint-disable-next-line new-cap
const adRouter: Router = express.Router();

// TODO SWAGGER.io doc
adRouter.route('/api/ads').post(getDataById);

export default adRouter;
