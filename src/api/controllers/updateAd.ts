import { AdsFromEbayModel as Ads } from '../models/adsFromEbay';
import { HttpStatus, logger } from '../../shared';
import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { AdsFromEbaySchema } from 'src/shared/adsFromEbay';

// Get findById
// lookup in DB if ad is there
// if its there then get the scam score and send it back
export const updateAd = async (req: Request, res: Response) => {
  try {
    const { id, labeledDecision, toReview } = req.body;

    if (!id) {
      throw new Error('No valid id ');
    }
    let update: UpdateQuery<AdsFromEbaySchema>;
    if (toReview) {
      update = { toReview };
    } else {
      update = {
        labeled: true,
        labeledDecision,
        toReview: false,
      };
    }

    Ads.findByIdAndUpdate({ _id: id.toString() }, update).then((ad) => {
      logger.log('updated', ad ? 'yes' : 'no');
      if (ad) {
        res.status(HttpStatus.OK).json({
          ad,
        });
      } else {
        res.status(HttpStatus.INTERNAL_ERROR).json({
          msg: 'Error while updating',
        });
      }
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
