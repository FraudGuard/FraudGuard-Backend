import { AdsFromEbaySchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeTitel = async (ad: AdsFromEbaySchema) => {
  logger.info('analyze Titel');

  const titel_enthaelt_neu = ad;
  const titel_enthaelt_ovp = ad;
  const titel_enthaelt_verschweißt = ad;
  const titel_enthaelt_ungeoeffnet = ad;
  const titel_enthaelt_zeichen = ad;

  const resultingAd = {
    titel_enthaelt_neu,
    titel_enthaelt_ovp,
    titel_enthaelt_verschweißt,
    titel_enthaelt_ungeoeffnet,
    titel_enthaelt_zeichen,
  };

  return resultingAd;
};
