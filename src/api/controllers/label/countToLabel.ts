import { AdsFromEbayModel as Ads } from '../../models';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

/**
 * Funktion die Anzeigt wieviele Anzeigen bereits gelabelt wurden
 * @param {req} req - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const countToLabel = async (req: Request, res: Response) => {
  try {
    Ads.count({ labeled: true })
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
export { countToLabel };
