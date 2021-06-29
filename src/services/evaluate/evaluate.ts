import { AdsSchema } from '../../api/models';
import { logger } from '../../shared';
import { generateDescription } from '../analyze/generateDescription';
import { evaluateAntipattern, evaluatePattern } from './';
import { evaluateExclusions } from './evaluateExclusions';
import { evaluateSignificantPatterns } from './evaluateSignificantPatterns';
/**
 * Funktion zur Berechnung des Scores einer Anzeige.
 * Dabei werden die Scores (Patternscore und Antipatternscore) miteinander verrechnet und normiert.
 * Die Normierung ist wichtig, um bei der Ergänzung oder Entfernung von Merkmalen im Wertebereich von -100 bis 100 zu liegen.
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird um die Referenzen setzen zu können.
 * @return {Promise<AdsSchema>} Gibt das Referenzobjekt zurück.
 */

const evaluate = (resultingAd: AdsSchema): Promise<AdsSchema> =>
  new Promise((resolve, _reject) => {
    logger.info('start evaluate');

    evaluatePattern(resultingAd);
    evaluateAntipattern(resultingAd);

    const ausschlusskriterium_erfuellt = evaluateExclusions(resultingAd);
    const aussagekraeftiges_Pattern_erfuellt =
      evaluateSignificantPatterns(resultingAd);
    const zu_wenig_merkmale =
      resultingAd.pattern_anzahl_zutreffend +
        resultingAd.antipattern_anzahl_zutreffend <
      3;

    if (ausschlusskriterium_erfuellt === 1) {
      resultingAd.fraud_score = -100;
    } else if (!zu_wenig_merkmale) {
      const pattern_score =
        (resultingAd.pattern_score / resultingAd.pattern_gesamtscore) * 100;
      const antipattern_score =
        (resultingAd.antipattern_score / resultingAd.antipattern_gesamtscore) *
        100;

      resultingAd.fraud_score =
        Math.round((pattern_score - antipattern_score) * 100) / 100;

      if (aussagekraeftiges_Pattern_erfuellt === 1) {
        resultingAd.fraud_score += 40;
      }
    }

    generateDescription(resultingAd);

    if (
      (zu_wenig_merkmale && ausschlusskriterium_erfuellt !== 1) ||
      resultingAd.beschreibung_zu_klein
    ) {
      resultingAd.fraud_score = 0;
      resultingAd.keine_bewertung_moeglich = 1;
      resultingAd.beschreibung +=
        'Es kann keine Begründung abgegeben werden, da zu wenige Merkmale erkannt wurden die für oder gegen einen Betrug sprechen';
    }
    resolve(resultingAd);
  });
export { evaluate };
