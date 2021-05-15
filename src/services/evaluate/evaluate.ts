import { AdsSchema } from "../../api/models";
import { logger } from "../../shared";
import { evaluateAntipattern, evaluatePattern } from "./";


export const evaluate = (resultingAd: AdsSchema): Promise<AdsSchema> =>
  new Promise(async (resolve, _reject) => {
    logger.info('start evaluate');

    // await Promise.all([
      evaluatePattern(resultingAd)
      evaluateAntipattern(resultingAd)
    // ]).catch((error) => {
    //   logger.error('error in evaluate');
    //   logger.error(error);
    //   reject(error);
    // });

    logger.info('evaluated')
    console.log(resultingAd)
    resolve(resultingAd)
  })