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
    resultingAd._id = ad._id;
    resultingAd.labeled = ad.labeled?1:0;
    resultingAd.labeledDecision = ad.labeledDecision?1:0;
    resultingAd.lego = ad.searchQuery === 'lego' ? 1 : 0;

    // await analyzeBeschreibung(ad, resultingAd).then
    // await analyzeKonto(ad, resultingAd)
    // await analyzeMetadaten(ad, resultingAd)
    // await analyzePreis(ad, resultingAd)
    // await analyzeSonstiges(ad, resultingAd)
    // await analyzeTitel(ad, resultingAd)
    //  |--
    //     |--
    //         |--––
    //               |---
    //                   |----| -> weiter

    // |--     |
    // |-----  |
    // |--     |
    // |-------|->weiter
    await Promise.all([
      analyzeBeschreibung(ad, resultingAd),
      analyzeKonto(ad, resultingAd),
      analyzeMetadaten(ad, resultingAd),
      analyzePreis(ad, resultingAd),
      analyzeSonstiges(ad, resultingAd),
      analyzeTitel(ad, resultingAd),
    ]).catch((error) => {
      logger.error('error in analyze');
      logger.error(error);
      reject(error);
    });

    logger.info('all analyze done');
    // Todo Regelwerk läuft durch
    return resolve(resultingAd);
  });
