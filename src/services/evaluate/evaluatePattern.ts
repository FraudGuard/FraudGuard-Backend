import { AdsSchema } from '../../api/models';

/**
 * Funktion zur Anwendung des Regelwerkes nach Pattern.
 * Die einzelnen Scores wurden zunächst subjektiv erstellt und zu einem gesamten Patternscore zusammenaddiert.
 * Der Wertebereich der einzelnen Scores liegt zwischen 1 und 5. Der Wertebereich wurde frei gewählt.
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird um die Referenzen setzen zu können
 * @return {AdsSchema} Gibt das Referenzobjekt zurück
 */
const evaluatePattern = (resultingAd: AdsSchema) => {
  resultingAd.pattern_score = 0;
  resultingAd.pattern_gesamtscore = 0;
  resultingAd.pattern_anzahl_zutreffend = 0;
  resultingAd.pattern_anzahl_gesamt = 0;

  // Titel
  addToScore(resultingAd, resultingAd.titel_enthaelt_neu === 1, 1);

  addToScore(resultingAd, resultingAd.titel_enthaelt_ovp === 1, 1);

  addToScore(resultingAd, resultingAd.titel_enthaelt_verschweißt === 1, 1);

  addToScore(resultingAd, resultingAd.titel_enthaelt_ungeoeffnet === 1, 1);

  addToScore(resultingAd, resultingAd.titel_enthaelt_zeichen === 1, 2);

  // Beschreibung
  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_sepa === 1, 5);

  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_ueberweisung === 1,
    2,
  );

  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_paypal_freunde === 1,
    2,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_versand === 1, 1);

  addToScore(
    resultingAd,
    resultingAd.beschreibung_ist_kopiert_unternehmen === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_neu === 1, 1);

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_ovp === 1, 1);

  addToScore(
    resultingAd,
    resultingAd.beschreibung_enthaelt_versiegelt === 1,
    1,
  );

  addToScore(
    resultingAd,
    resultingAd.beschreibung_ist_kopiert_anzeige === 1,
    5,
  );

  addToScore(resultingAd, resultingAd.beschreibung_enthaelt_whatsapp === 1, 4);

  // Konto
  addToScore(resultingAd, resultingAd.konto_name_enthaelt_unueblich === 1, 3);

  addToScore(
    resultingAd,
    resultingAd.konto_anzeigen_ueber_100 / resultingAd.konto_anzeigen_anzahl >=
      0.2,
    1,
  );

  if (resultingAd.konto_anzeigen_betrugsrate >= 40) {
    addToScore(resultingAd, true, 4);
  } else {
    addToScore(resultingAd, false, 4);
  }
  if (
    (resultingAd.konto_anzeigen_betrugsrate < 40 &&
      resultingAd.konto_anzeigen_betrugsrate >= 20) ||
    resultingAd.konto_anzeigen_betrugsrate >= 40
  ) {
    addToScore(resultingAd, true, 2);
  } else {
    addToScore(resultingAd, false, 2);
  }

  addToScore(resultingAd, resultingAd.konto_anzeigen_gleich > 0, 5);

  addToScore(resultingAd, resultingAd.konto_anzeigen_verschiedene_orte > 1, 4);

  // Score Kategorie Preis
  if (resultingAd.preis_waehrung_eur == 1) {
    addToScore(resultingAd, resultingAd.preis_unter_marktwert === 1, 2);
  } else {
    addToScore(resultingAd, false, 2);
  }

  if (resultingAd.preis_abweichung_marktwert <= -0.5) {
    addToScore(resultingAd, true, 4);
  } else {
    addToScore(resultingAd, false, 4);
  }

  // Score Kategorie Sonstiges
  addToScore(resultingAd, resultingAd.sonstiges_anzeige_kopiert === 1, 4);

  addToScore(resultingAd, resultingAd.sonstiges_kategorie_unpassend === 1, 4);

  // Score Kombinationen
  if (
    resultingAd.ap_beschreibung_enthaelt_abholung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 0
  )
    addToScore(resultingAd, true, 1);
  else addToScore(resultingAd, false, 1);

  if (
    (resultingAd.titel_enthaelt_ovp === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_ovp === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  )
    addToScore(resultingAd, true, 5);
  else addToScore(resultingAd, false, 5);

  if (
    (resultingAd.titel_enthaelt_neu === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_neu === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  )
    addToScore(resultingAd, true, 4);
  else addToScore(resultingAd, false, 4);

  if (
    resultingAd.konto_privat === 1 &&
    resultingAd.konto_name_enthaelt_gmbh === 1
  )
    addToScore(resultingAd, true, 4);
  else addToScore(resultingAd, false, 4);

  if (
    (resultingAd.beschreibung_enthaelt_neu === 1 &&
      resultingAd.beschreibung_enthaelt_whatsapp === 1) ||
    (resultingAd.titel_enthaelt_neu === 1 &&
      resultingAd.beschreibung_enthaelt_whatsapp === 1)
  )
    addToScore(resultingAd, true, 3);
  else addToScore(resultingAd, false, 3);

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.beschreibung_ist_kopiert_anzeige === 1
  )
    addToScore(resultingAd, true, 2);
  else addToScore(resultingAd, false, 2);

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.sonstiges_anzeige_kopiert === 1
  )
    addToScore(resultingAd, true, 2);
  else addToScore(resultingAd, false, 2);

  if (
    resultingAd.titel_enthaelt_ovp === 0 &&
    resultingAd.beschreibung_enthaelt_ovp === 0 &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  )
    addToScore(resultingAd, true, 3);
  else addToScore(resultingAd, false, 3);

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.ap_beschreibung_enthaelt_abholung === 0 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  )
    addToScore(resultingAd, true, 4);
  else addToScore(resultingAd, false, 4);

  // Kombinationen aus Assoziationsanalyse

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.beschreibung_enthaelt_ovp === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versiegelt === 1
  )
    addToScore(resultingAd, true, 2);
  else addToScore(resultingAd, false, 2);

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1
  )
    addToScore(resultingAd, true, 3);
  else addToScore(resultingAd, false, 3);

  if (
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  )
    addToScore(resultingAd, true, 3);
  else addToScore(resultingAd, false, 3);

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_neu === 1
  )
    addToScore(resultingAd, true, 5);
  else addToScore(resultingAd, false, 5);

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
export { evaluatePattern };
