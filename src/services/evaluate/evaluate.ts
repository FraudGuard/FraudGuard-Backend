import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';
import { evaluateAntipattern, evaluatePattern } from './';
import { evaluateExclusions } from './evaluateExclusions';
/**
 * Funktion zur Berechnung des Scores einer Anzeige.
 * Dabei werden die Scores (Patternscore und Antipatternscore) miteinander verrechnet und normiert.
 * Die Normierung ist wichtig, um bei der Ergänzung oder Entfernung von Merkmalen im Wertebereich von -100 bis 100 zu liegen.
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird um die Referenzen setzen zu können.
 * @return {Promise<AdsSchema>} Gibt das Referenzobjekt zurück.
 */
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
    const  ausschlusskriterium_erfuellt =  evaluateExclusions(resultingAd);

    if (ausschlusskriterium_erfuellt === 1) {
      resultingAd.fraud_score = -100;
    }
    else {

      const pattern_score =
        (resultingAd.pattern_score / resultingAd.pattern_gesamtscore) * 100;
      const antipattern_score =
        (resultingAd.antipattern_score / resultingAd.antipattern_gesamtscore) *
        100;

      resultingAd.fraud_score =
        Math.round((pattern_score - antipattern_score) * 100) / 100;
    }
    resolve(resultingAd);
  });
