import express, { Router } from 'express';
import { countToLabel } from '../controllers/label/countToLabel';
import { findOneForLabel } from '../controllers/label/findOneForLabel';
import { findOneToReview } from '../controllers/label/findOneForReview';
import { updateAd } from '../controllers/ads/updateAd';

// eslint-disable-next-line new-cap
const labelRouter: Router = express.Router();

// TODO SWAGGER.io doc
labelRouter.route('/get').get(findOneForLabel);
labelRouter.route('/getToReview').get(findOneToReview);
labelRouter.route('/count').get(countToLabel);
labelRouter.route('/update').post(updateAd);

export { labelRouter };
