import { analyze } from '../../../services/analyze';
import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { AdsFromEbayModel, AdsFromEbaySchema, AdsModel } from '../../models';

/**
 * Funktion welche alle Anzeigen aus der Datenbank analysiert und speichert
 * @param {req} _ - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const transform = async (_: Request, res: Response) => {
  try {
    logger.info('transform');
    run(6500);
    res.status(HttpStatus.OK).json({ result: true });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};

const run = async (skip = 0) => {
  const limit = 200;
  const items = await AdsFromEbayModel.find({ labeled: true })
    .skip(skip)
    .limit(limit);
  console.log('items', items.length);

  const promises: Promise<any>[] = [];
  items.forEach(async (ad, i) => {
    // for (const ad of items) {
    promises.push(single(ad, i));
  });
  const data = await Promise.all(promises);
  await AdsModel.bulkWrite(data.filter((x) => x));
  if (items.length === limit) {
    run(skip + limit);
  } else {
    console.log('🎉🎉🎉🎉🎉🎉🎉🎉 FERTIG 🎉🎉🎉🎉🎉🎉🎉🎉 ');
  }
};

const single = (ad: AdsFromEbaySchema, i: number) =>
  new Promise(async (resolve) => {
    const result = await analyze(ad);
    console.log('analyzed', ++i);
    resolve({
      updateOne: {
        filter: { _id: result._id },
        update: result.toObject(),
        upsert: true,
      },
    });
  });
export { transform };
