import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../../shared';

export const analyzeBeschreibung = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Beschreibung');
    resultingAd.fraud_score += 0.1;
    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
