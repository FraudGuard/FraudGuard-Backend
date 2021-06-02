import { AdsFromEbayModel as Ads } from '../../models';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

/**
 * Funktion welche eine zufällige Anzeige zum Labeln zurück gibt
 * @param {req} req - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const findOneForLabel = async (req: Request, res: Response) => {
  try {
    Ads.findOne({ labeled: { $ne: true } })
      .skip(Math.round(Math.random() * 1000))
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
export { findOneForLabel };
