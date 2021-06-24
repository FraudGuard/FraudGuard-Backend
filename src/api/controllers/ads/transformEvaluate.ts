import { HttpStatus, logger } from '../../../shared';
import { Request, Response } from 'express';
import { AdsModel, AdsSchema } from '../../models';
import { evaluate } from '../../../services/evaluate';

const skipValue = 1000;
/**
 * Funktion welche alle Anzeigen aus der Datenbank evaluiert und speichert
 * @param {req} _ - Express Request Objekt
 * @param {res} res - Express Response Objekt
 * @return {void}
 */
const transformEvaluate = async (_: Request, res: Response) => {
  try {
    logger.info('transformEvaluate');
    runEvaluate(0);
    res.status(HttpStatus.OK).json({ result: true });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_ERROR).json({ error: err });
    logger.error(err);
  }
};

const runEvaluate = async (skip = 0) => {
  const items = await AdsModel.find({labeled: 1}).skip(skip).limit(skipValue);
  console.log('items', items.length);

  const promises: Promise<any>[] = [];
  items.forEach(async (ad, i) => {
    // for (const ad of items) {
    promises.push(singleEvaluate(ad, i));
  });
  const data = await Promise.all(promises);
  await AdsModel.bulkWrite(data.filter((x) => x));
  logger.info('updated');
  if (items.length === skipValue) {
    console.log('analyzed', skipValue);
    runEvaluate(skip + skipValue);
  } else {
    console.log('🎉🎉🎉🎉🎉🎉🎉🎉 FERTIG 🎉🎉🎉🎉🎉🎉🎉🎉 ');
  }
};

const singleEvaluate = (ad: AdsSchema, _i: number) =>
  new Promise(async (resolve, reject) => {
    // const result = await analyze(ad);
    const result = await evaluate(ad).catch((error) => reject(error));
    if (!result) {
      return;
    }
    // console.log('analyzed', ++i);
    resolve({
      updateOne: {
        filter: { _id: result._id },
        update: result.toObject(),
        upsert: true,
      },
    });
  });
export { transformEvaluate };
