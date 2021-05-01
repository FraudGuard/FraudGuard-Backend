import { AdsFromEbaySchema, AdsModel, AdsSchema } from '../../models';
import {
  analyzeBeschreibung,
  analyzeKonto,
  analyzeMetadaten,
  analyzePreis,
  analyzeSonstiges,
  analyzeTitel,
} from './';
import { logger } from '../../shared';

export const analyze = (ad: AdsFromEbaySchema): Promise<AdsSchema> =>
  new Promise((resolve, reject) => {
    logger.info('start analyze');
    const resultingAd = new AdsModel();
    resultingAd.fraud_score = 0;
    Promise.all([
      analyzeBeschreibung(ad, resultingAd),
      analyzeKonto(ad, resultingAd),
      analyzeMetadaten(ad, resultingAd),
      analyzePreis(ad, resultingAd),
      analyzeSonstiges(ad, resultingAd),
      analyzeTitel(ad, resultingAd),
    ])
      .then((_res) => {
        logger.info('all analyze done');
        resolve(resultingAd);
      })
      .catch((error) => {
        logger.error('error in analyze');
        logger.error(error);
        reject(error);
      });
  });
