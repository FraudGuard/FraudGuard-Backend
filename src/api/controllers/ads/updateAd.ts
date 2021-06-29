import { AdsFromEbayModel as Ads, AdsFromEbaySchema } from '../../models';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';

/**
 * Funktion zum Aktualisieren einer Anzeige
 * @param {req} req - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const updateAd = async (req: Request, res: Response) => {
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
      logger.info('updated', ad ? 'yes' : 'no');
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
  } catch (err:any) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};

export { updateAd };
