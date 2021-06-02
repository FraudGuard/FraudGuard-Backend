import { AdsSchema } from '../../api/models';

const generateBeschreibung = (resultingAd: AdsSchema) => {
  resultingAd.beschreibung = '';

  if (
    resultingAd.ap_titel_enthaelt_gebraucht === 1 ||
    resultingAd.ap_beschreibung_enthaelt_gebraucht === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil es sich um einen gebrauchten Artikel handelt</li>';
  }

  if (
    resultingAd.ap_titel_enthaelt_tausche === 1 ||
    resultingAd.ap_beschreibung_enthaelt_tausch === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil "tausche" im Titel oder der Beschreibung steht und solche Anzeigen in der Regel keine Betrugsmuster darstellen.</li>';
  }

  if (
    resultingAd.ap_titel_enthaelt_suche === 1 ||
    resultingAd.ap_beschreibung_enthaelt_suche === 1 ||
    resultingAd.ap_sonstiges_anzeige_suche === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil es sich hierbei um eine Suchanzeige handelt.</li>';
  }

  if (resultingAd.ap_titel_enthaelt_kilo === 1) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil "kilo" im Titel steht.</li>';
  }

  if (resultingAd.ap_titel_enthaelt_sammlung === 1) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil Sammlungen sehr selten Betrug darstellen.</li>';
  }

  if (resultingAd.ap_preis_ist_leer === 1) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil kein Preis angegeben ist.</li>';
  }

  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung !== 1 &&
    resultingAd.beschreibung_enthaelt_sepa
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil der Artikel direkt abgeholt und Bar bezahlt werden kann.</li>';
  }

  if (resultingAd.beschreibung.length > 0) {
    resultingAd.beschreibung =
      '<b>Folgende Gründe haben wir für die Analyse herangezogen: </b><ul>' +
      resultingAd.beschreibung +
      '</ul>';
  }
};
export { generateBeschreibung };
