import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';

export const evaluateAntipattern = async (resultingAd: AdsSchema) => {
  logger.info('evaluate Antipattern');

  resultingAd.antipattern_score = 0;
  resultingAd.antipattern_gesamtscore = 0;
  resultingAd.antipattern_anzahl_zutreffend = 0;
  resultingAd.antipattern_anzahl_gesamt = 0;

  // BEISPIEL

  // wenn pattern zutrifft -> bedingung wahr

  // addToScore(resultingAd immer eingeben, bedingung wann addiert werden soll, score)
  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1,
    5,
  );
  // gleich wie
  // if (resultingAd.ap_beschreibung_enthaelt_barzahlung === 1) {
  //     addToScore(resultingAd, false, 5)
  // }else{
  //     addToScore(resultingAd, false, 5)
  // }

  // wenn höhere Werte möglich sind
  // if(resultingAd.konto_bewertung >5){
  //     addToScore(resultingAd, true, 5)
  // }else if(resultingAd.konto_bewertung >3){
  //     addToScore(resultingAd, true, 4)
  // }else if(resultingAd.konto_bewertung >1){
  //     addToScore(resultingAd, true, 1)
  // }else if(resultingAd.konto_bewertung >2){
  //     addToScore(resultingAd, false, 1)
  // }

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
    resultingAd.antipattern_score += score;
    resultingAd.antipattern_anzahl_zutreffend += 1;
  }
  resultingAd.antipattern_gesamtscore += score;
  resultingAd.antipattern_anzahl_gesamt += 1;
};
