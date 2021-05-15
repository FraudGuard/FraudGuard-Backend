import { analyze } from '../../../services/analyze';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { AdsFromEbayModel, AdsModel } from '../../models';

export const transform = async (_req: Request, res: Response) => {
  try {
    logger.info('transform');
    // const skip = 17964
    const items = await AdsFromEbayModel.find({})
      // .skip(skip)
      .limit(100);
    console.log('items', items.length);
    let i = 0;
    items.forEach(async (ad) => {
      // for (const ad of items) {
      const result = await analyze(ad);
      console.log('analyzed', ++i);
      await AdsModel.findOneAndUpdate({ _id: result.id }, result, {
        upsert: true,
      });
    });

    res.status(HttpStatus.OK).json({ result: true });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};
