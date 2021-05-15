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
  /* addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_ueberweisung === 1,
    5,
  ); */

  // BEISPIEL ENDE

  // Michelle

  // Jana
  // Titel
  addToScore(resultingAd, resultingAd.titel_enthaelt_neu === 1, 2);

  addToScore(resultingAd, resultingAd.titel_enthaelt_ovp === 1, 3);

  addToScore(resultingAd, resultingAd.titel_enthaelt_verschweißt === 1, 1);

  addToScore(resultingAd, resultingAd.titel_enthaelt_ungeoeffnet === 1, 4);

  addToScore(resultingAd, resultingAd.titel_enthaelt_zeichen === 1, 3);

  // Beschreibung
  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_ueberweisung === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_versand === 1, 2);

  addToScore(
    resultingAd,
    resultingAd.beschreibung_ist_kopiert_unternehmen === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_neu === 1, 2);

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_ovp === 1, 2);

  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_versiegelt === 1,
    3,
  );

  addToScore(
    resultingAd,
    resultingAd.beschreibung_ist_kopiert_anzeige === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_whatsapp === 1, 4);

  // Konto
  addToScore(resultingAd, resultingAd.konto_name_enthaelt_unueblich === 1, 3);

  addToScore(resultingAd, resultingAd.konto_anzeigen_ueber_100 >= 2, 1);

  // addToScore(resultingAd, resultingAd.konto_anzeigen_betrugsrate === 1, 3);

  addToScore(resultingAd, resultingAd.konto_anzeigen_gleich >= 0, 5);

  // Jessi
  // Score Kategorie Preis
  if (resultingAd.preis_waehrung_eur == 1) {
    addToScore(resultingAd, resultingAd.preis_unter_marktwert === 1, 2);
  }

  if (resultingAd.preis_abweichung_marktwert <= -0.5) {
    addToScore(resultingAd, true, 4);
  }

  // Score Kategorie Sonstiges
  addToScore(resultingAd, resultingAd.sonstiges_anzeige_kopiert === 1, 4);

  // Score Kombinationen
  if (resultingAd.ap_beschreibung_enthaelt_abholung === 1 && 
    resultingAd.beschreibung_enthaelt_ueberweisung === 1)
    addToScore(resultingAd, true, 4);

  if (resultingAd.konto_anzeigen_gleich === 1 && 
    resultingAd.konto_privat === 1)
    addToScore(resultingAd, true, 3)

  if (resultingAd.titel_enthaelt_ovp === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 || 
    resultingAd.beschreibung_enthaelt_ovp === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 )
    addToScore(resultingAd, true, 4)

  if (resultingAd.titel_enthaelt_neu === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 || 
    resultingAd.beschreibung_enthaelt_neu === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 )
    addToScore(resultingAd, true, 5) 
    
  if (resultingAd.titel_enthaelt_verschweißt === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 ||
    resultingAd.titel_enthaelt_ungeoeffnet === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 ||
    resultingAd.beschreibung_enthaelt_versiegelt === 1 && resultingAd.preis_abweichung_marktwert <= -0.3 )
    addToScore(resultingAd, true, 5)

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
