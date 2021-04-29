import { AdsFromEbayModel as Ads } from '../models/adsFromEbay';
import { HttpStatus, logger } from '../../shared';
import { Request, Response } from 'express';

// Get findById
// lookup in DB if ad is there
// if its there then get the scam score and send it back
export const findOneToReview = async (_req: Request, res: Response) => {
  try {
    Ads.findOne({ toReview:true })
      .exec()
      .then((ad) => {
        if (ad) {
          res.status(HttpStatus.OK).json({
            ad,
          });
        } else {
          res.status(HttpStatus.NOT_FOUND).json({
            msg: 'No valid entry found',
          });
        }
      });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
