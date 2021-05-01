import { AdsFromEbaySchema, AdsModel, AdsSchema } from '../../api/models';
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
  new Promise(async (resolve, reject) => {
    logger.info('start analyze');

    const resultingAd = new AdsModel();
    resultingAd.fraud_score = 0;

    await Promise.all([
      analyzeBeschreibung(ad),
      analyzeKonto(ad),
      analyzeMetadaten(ad),
      analyzePreis(ad),
      analyzeSonstiges(ad),
      analyzeTitel(ad),
    ]).catch((error) => {
      logger.error('error in analyze');
      logger.error(error);
      reject(error);
    });

    logger.info('all analyze done');
    // Todo Regelwerk läuft durch
    return resolve(resultingAd);
  });
