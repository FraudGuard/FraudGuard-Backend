import { AdsFromEbayModel as Ads } from '../../models';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

/**
 * Funktion welche eine Anzeige zur Review zurück gibt
 * @param {req} _ - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const findOneToReview = async (_: Request, res: Response) => {
  try {
    Ads.findOne({ toReview: true })
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
  } catch (err: any) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
export { findOneToReview };
