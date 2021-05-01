import { AdsFromEbaySchema } from '../../api/models';
import { logger } from '../../shared';

export const analyzeSonstiges = async (ad: AdsFromEbaySchema) => {
  logger.info('analyze Sonstiges');

  const anzeige_kopiert = ad;
  const anzeige_zeit_minuten = ad;
  const ap_anzeige_zeit_tag = ad;
  const ap_anzeige_suche = ad;
  const ap_anzeige_nur_abholung = ad;

  const resultingAd = {
    anzeige_kopiert,
    anzeige_zeit_minuten,
    ap_anzeige_zeit_tag,
    ap_anzeige_suche,
    ap_anzeige_nur_abholung,
  };

  return resultingAd;
};
