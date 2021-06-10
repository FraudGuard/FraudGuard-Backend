import { AdsSchema } from '../../api/models';

/**
 * Funktion zur Anwendung des Regelwerkes nach Antipattern.
 * Die einzelnen Scores wurden zunächst subjektiv erstellt und zu einem gesammten Antipattern Score zusammenaddiert.
 * Der Wertebereich der einzelnen Scores liegt zwischen 1 und 5. Der Wertebereich wurde frei gewählt.
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird, um die Referenzen setzen zu können.
 * @return {Promise<AdsSchema>} Gibt das Referenzobjekt zurück.
 */
const evaluateAntipattern = async (resultingAd: AdsSchema) => {
  resultingAd.antipattern_score = 0;
  resultingAd.antipattern_gesamtscore = 0;
  resultingAd.antipattern_anzahl_zutreffend = 0;
  resultingAd.antipattern_anzahl_gesamt = 0;

  // BEISPIEL

  // wenn pattern zutrifft -> bedingung wahr

  // addToScore(resultingAd immer eingeben, bedingung wann addiert werden soll, score)
  /* addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1,
    5,
  ); */
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

  // Beschreibung
  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1,
    5,
  );

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_gebraucht === 1,
    5,
  );

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_abholung === 1,
    1,
  );

  addToScore(
    resultingAd,
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung === 1,
    4,
  );

  addToScore(resultingAd, resultingAd.ap_beschreibung_enthaelt_kilo === 1, 3);

  // Konto
  addToScore(resultingAd, resultingAd.ap_konto_name_natuerlich === 1, 2);

  // addToScore(resultingAd, resultingAd.weitere_anzeigen_gebraucht)

  // Jessi

  // Score Kategorie Sonstiges
  addToScore(resultingAd, resultingAd.ap_sonstiges_anzeige_zeit_tag === 1, 5);

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
export { evaluateAntipattern };
