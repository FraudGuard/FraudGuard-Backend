import { findById as findByIdInMongo } from '../../../services/mongo';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';

export const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info(req.params);
    logger.info(id);

    findByIdInMongo(id).then((ad: any) => {
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
