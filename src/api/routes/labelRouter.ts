import express, { Router } from 'express';
import { findOneForLabel } from '../controllers/findOneForLabel';
import { findOneToReview } from '../controllers/findOneForReview';
import { updateAd } from '../controllers/updateAd';

// eslint-disable-next-line new-cap
const labelRouter: Router = express.Router();

// TODO SWAGGER.io doc
labelRouter.route('/get').get(findOneForLabel);
labelRouter.route('/getToReview').get(findOneToReview);
labelRouter.route('/update').post(updateAd);

export default labelRouter;
