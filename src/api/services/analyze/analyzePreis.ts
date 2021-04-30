import { AdsFromEbaySchema, AdsSchema } from '../../models';
import { logger } from '../../../shared';

export const analyzePreis = (ad: AdsFromEbaySchema, resultingAd: AdsSchema) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Preis');
    resultingAd.scam += 0.1;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
