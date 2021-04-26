import { AdsModel as Ads } from '../models/ads';
import { HttpStatus } from '../../shared';
import { logger } from '../../shared';
import { Request, Response } from 'express';

// Get findById
// lookup in DB if ad is there
// if its there then get the scam score and send it back
export const findById = async (req: Request, res: Response) => {
  try {
    // TODO is it really a id?? validation, also sanitize input
    const { id } = req.params;
    logger.info(req.params);
    logger.info(id);

    Ads.findById(id)
      .select('scam')
      .exec()
      .then((ad) => {
        if (ad) {
          res.status(HttpStatus.OK).json({
            ad,
          });
        } else {
          res.status(HttpStatus.NOT_FOUND).json({
            msg: 'No valid entry found for provided ID',
          });
        }
      });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
