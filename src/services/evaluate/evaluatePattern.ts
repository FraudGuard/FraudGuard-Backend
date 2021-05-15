import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const evaluatePattern = async (resultingAd: AdsSchema) => {
  logger.info('evaluate Pattern');

  resultingAd.pattern_score = 0;
  resultingAd.pattern_gesamtscore = 0;
  resultingAd.pattern_anzahl_zutreffend = 0;
  resultingAd.pattern_anzahl_gesamt = 0;

  // BEISPIEL

  // addToScore(resultingAd immer eingeben, bedingung wann addiert werden soll, score)
  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_ueberweisung === 1,
    5,
  );

  // BEISPIEL ENDE

  // Michelle

  // Jana

  // Jessi

  return resultingAd;
};

const addToScore = (
  resultingAd: AdsSchema,
  condition: boolean,
  score: number,
): void => {
  if (score < 1 || score > 5) {
    throw new Error('Score not in Range');
  }

  if (condition) {
    resultingAd.pattern_score += score;
    resultingAd.pattern_anzahl_zutreffend += 1;
  }
  resultingAd.pattern_gesamtscore += score;
  resultingAd.pattern_anzahl_gesamt += 1;
};
