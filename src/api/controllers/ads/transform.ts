import { analyze } from '../../../services/analyze';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { AdsFromEbayModel, AdsFromEbaySchema, AdsModel } from '../../models';

export const transform = async (_req: Request, res: Response) => {
  try {
    logger.info('transform');
    // const skip = 17964

    // }
    run(0);
    res.status(HttpStatus.OK).json({ result: true });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};

const run = async (skip = 0) => {
  const items = await AdsFromEbayModel.find({}).skip(skip).limit(300);
  console.log('items', items.length);

  const promises: Promise<any>[] = [];
  items.forEach(async (ad, i) => {
    // for (const ad of items) {
    promises.push(single(ad, i));
  });
  await Promise.all(promises);
  if (items.length === 300) {
    run(skip + 300);
  }
};

const single = (ad: AdsFromEbaySchema, i: number) =>
  new Promise(async (resolve) => {
    const result = await analyze(ad);
    console.log('analyzed', ++i);
    await AdsModel.findOneAndUpdate({ _id: result.id }, result, {
      upsert: true,
    });
    resolve(true);
  });
