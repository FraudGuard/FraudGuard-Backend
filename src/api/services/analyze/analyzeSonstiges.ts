import { AdsSchema } from '../../models/schemas/ads';
import { AdsFromEbaySchema } from 'src/api/models/schemas/adsFromEbay';
import { logger } from '../../../shared';

export const analyzeSonstiges = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Sonstiges');
    resultingAd.scam += 0.1;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
