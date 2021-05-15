import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';
import { evaluateAntipattern, evaluatePattern } from './';

export const evaluate = (resultingAd: AdsSchema): Promise<AdsSchema> =>
  new Promise(async (resolve, _reject) => {
    logger.info('start evaluate');

    // await Promise.all([
    evaluatePattern(resultingAd);
    evaluateAntipattern(resultingAd);
    // ]).catch((error) => {
    //   logger.error('error in evaluate');
    //   logger.error(error);
    //   reject(error);
    // });

    logger.info('evaluated');

    const normalized_pattern_score = (resultingAd.pattern_score / resultingAd.pattern_gesamtscore) * 100
    const normalized_antipattern_score = (resultingAd.antipattern_score / resultingAd.antipattern_gesamtscore) * 100

    resultingAd.fraud_score =
      Math.round((normalized_pattern_score - normalized_antipattern_score) * 100) / 100


    logger.info('calculated')

    console.log(resultingAd);
    resolve(resultingAd);
  });
