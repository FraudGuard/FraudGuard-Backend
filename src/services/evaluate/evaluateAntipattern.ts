import { AdsSchema } from "../../api/models";
import { logger } from "../../shared";

export const evaluateAntipattern = async (
    resultingAd: AdsSchema
) => {
    logger.info('evaluate Antipattern');

    resultingAd.antipattern_score = 0
    resultingAd.antipattern_gesamtscore = 0
    resultingAd.antipattern_anzahl_zutreffend = 0
    resultingAd.antipattern_anzahl_gesamt = 0

    // BEISPIEL

    // addToScore(resultingAd immer eingeben, bedingung wann addiert werden soll, score)
    addToScore(resultingAd, resultingAd.ap_beschreibung_enthaelt_barzahlung === 1, 5)


    // BEISPIEL ENDE





    return resultingAd;
}


const addToScore = (resultingAd: AdsSchema, condition: boolean, score: number): void => {
    if (score < 1 || score > 5) {
        throw new Error('Score not in Range')
    }

    if (condition) {
        resultingAd.antipattern_score += score
        resultingAd.antipattern_anzahl_zutreffend += 1

    }
    resultingAd.antipattern_gesamtscore += score
    resultingAd.antipattern_anzahl_gesamt += 1
}