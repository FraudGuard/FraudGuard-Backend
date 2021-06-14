import { AdsSchema } from '../../api/models';

/**
 * Funktion zur Anwendung des Regelwerkes
 * Die Anzeige wird auf einzelen Merkmale geprüft, die als aussagekräftige Patterns gelten
 * Sie diese erfüllt wird zum Score +30 addiert
 * @param {AdsSchema} resultingAd - Ergebnisobjekt, welches eingegeben wird um die Referenzen setzen zu können
 * @return {number} Gibt zurück, ob ein aussagekraeftiges Pattern erfüllt ist
 */
const evaluateSignificantPatterns = (resultingAd: AdsSchema) => {
  let aussagekraeftiges_Pattern_erfuellt = 0;

  if (
    (resultingAd.titel_enthaelt_verschweißt === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.titel_enthaelt_ungeoeffnet === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_versiegelt === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.beschreibung_enthaelt_whatsapp === 1 &&
    resultingAd.beschreibung_enthaelt_sepa
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.beschreibung_ist_kopiert_unternehmen === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.titel_enthaelt_neu === 0 &&
    resultingAd.beschreibung_enthaelt_neu === 0 &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.beschreibung_enthaelt_sepa === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.konto_privat === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.titel_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.beschreibung_ist_kopiert_anzeige === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_anzeige_kopiert === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.beschreibung_enthaelt_sepa === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1 &&
    resultingAd.konto_privat === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  if (
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_neu === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    aussagekraeftiges_Pattern_erfuellt = 1;
  }

  return aussagekraeftiges_Pattern_erfuellt;
};
export { evaluateSignificantPatterns };
