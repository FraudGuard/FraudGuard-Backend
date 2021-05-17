import { AdsSchema, ProductModel, AdsFromEbayModel } from '../../api/models';
import { logger } from '../../shared';

export const analyzeBeschreibung = (
  ad: any,
  resultingAd: AdsSchema,
): Promise<AdsSchema> =>
  new Promise(async (resolve, reject) => {
    logger.info('start analyze Beschreibung');
    const beschreibung = ad['description']?.value?.toLowerCase();
    // prüfen auf Überweisung
    const ueberweisung_signalwoerter = [
      'überweisung',
      'ueberweisung',
      'sepa-überweisung',
      'sepa-ueberwesiung',
      'überweisen',
      'ueberweisen',
      'sepa',
    ];
    const ueberweisung_signalwoerter_gegenteil = [
      'keine überweisung',
      'keine ueberweisung',
      'keine sepa-überweisung',
      'keine sepa-ueberwesiung',
      'nicht überweisen',
      'nicht ueberweisen',
      'kein sepa',
    ];
    let enthaelt_signalwort = 0;
    for (const signalwort of ueberweisung_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of ueberweisung_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.beschreibung_enthaelt_ueberweisung = enthaelt_signalwort;

    // Prüfen auf Versand
    const versand_signalwoerter = [
      'versand',
      'versandgebuehren',
      'dhl',
      'hermes',
      'versendet',
      'versenden',
      'delivery',
    ];
    const versand_signalwoerter_gegenteil = [
      'kein versand',
      'keine versandgebuehren',
      'kein dhl',
      'kein hermes',
      'nicht versendet',
      'nicht versenden',
      'kein delivery',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of versand_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of versand_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.beschreibung_enthaelt_versand = enthaelt_signalwort;

    // Prüfen auf neu
    const neu_signalwoerter = [
      'neu',
      'new',
      'unbenutzt',
      'nie ausgepackt',
      'ungeoeffnet',
      'nicht benutzt',
    ];
    const neu_signalwoerter_gegenteil = [
      'nicht neu',
      'nicht new',
      'nicht unbenutzt',
      'nicht nie ausgepackt',
      'nicht ungeoeffnet',
      'neuwertig',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of neu_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of neu_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.beschreibung_enthaelt_neu = enthaelt_signalwort;

    // Prüfen auf ovp
    const ovp_signalwoerter = [
      'ovp',
      'original',
      'originalverpackt',
      'originalverpackung',
    ];
    const ovp_signalwoerter_gegenteil = [
      'nicht ovp',
      'nicht original',
      'nicht originalverpackt',
      'nicht die originalverpackung',
      'keine originalverpackung',
      'keine ovp',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of ovp_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of ovp_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.beschreibung_enthaelt_ovp = enthaelt_signalwort;

    // Prüfen auf Versiegelung
    const versiegelt_signalwoerter = [
      'versiegelt',
      'verschweißt',
      'versiegelung',
      'siegel',
    ];
    const versiegelt_signalwoerter_gegenteil = [
      'nicht versiegelt',
      'nicht verschweißt',
      'keine versiegelung',
      'kein siegel',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of versiegelt_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of versiegelt_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.beschreibung_enthaelt_versiegelt = enthaelt_signalwort;

    // Prüfen auf Whatsapp
    const whatsapp_signalwoerter = [
      'whatsapp',
      'whats-app',
      'welche app',
      'what app',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of whatsapp_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    resultingAd.beschreibung_enthaelt_whatsapp = enthaelt_signalwort;

    // prüfen auf kopierte Anzeigenbeschreibung

    const res = await AdsFromEbayModel.find({
      'description.value': ad.description.value,
    });
    // res ist array mit Ads
    if (res) {
      resultingAd.beschreibung_ist_kopiert_anzeige = res.length > 1 ? 1 : 0;
    }

    // prüfen auf kopierte Unternehmensbeschreibung
    enthaelt_signalwort = 0;
    const produktbeschreibungen = await ProductModel.find(
      {},
      { beschreibung: 1 },
    );
    for (const produktbeschreibung of produktbeschreibungen) {
      if (
        beschreibung.includes(
          produktbeschreibung.beschreibung.toLocaleLowerCase(),
        ) &&
        produktbeschreibung.beschreibung.length > 1
      ) {
        enthaelt_signalwort = 1;
      }
    }
    resultingAd.beschreibung_ist_kopiert_unternehmen = enthaelt_signalwort;

    // Antipattern
    // Prüfen auf Barzahlung
    const barzahlung_signalwoerter = ['barzahlung', 'bar', 'bezahlung vor ort'];
    const barzahlung_signalwoerter_gegenteil = [
      'keine barzahlung',
      'nicht bar',
      'keine bezahlung vor ort',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of barzahlung_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of barzahlung_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_barzahlung = enthaelt_signalwort;

    // Prüfen, ob Artikel gebraucht ist
    const gebraucht_signalwoerter = [
      'gebrauchsspuren',
      'benutzt',
      'gebraucht',
      'aufgebaut',
      'zusammengebaut',
    ];
    const gebraucht_signalwoerter_gegenteil = [
      'keine gebrauchsspuren',
      'nicht benutzt',
      'nicht gebraucht',
      'nie aufgebaut',
      'nie zusammengebaut',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of gebraucht_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of gebraucht_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_gebraucht = enthaelt_signalwort;

    // Prüfen auf Tausch
    const tausch_signalwoerter = [
      ' tausch ',
      ' tausche ',
      'tauschangebot',
      ' tauschen ',
    ];
    const tausch_signalwoerter_gegenteil = [
      'kein tausch',
      'tausche nicht',
      'kein tauschangebot',
      'nicht tauschen',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of tausch_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of tausch_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_tausch = enthaelt_signalwort;

    // Prüfen auf Abholung
    const abholung_signalwoerter = [
      'abholung',
      'nur abholung',
      'selbstabholer',
      'abholen',
      'abgeholt',
    ];
    const abholung_signalwoerter_gegenteil = [
      'keine abholung',
      'keine abholung',
      'kein selbstabholer',
      'nicht abholen',
      'nicht abgeholt',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of abholung_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of abholung_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_abholung = enthaelt_signalwort;

    // Prüfen auf Suche
    const suche_signalwoerter = ['suche', 'gesucht'];
    const suche_signalwoerter_gegenteil = ['keine suche', 'nicht gesucht'];
    enthaelt_signalwort = 0;
    for (const signalwort of suche_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of suche_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_suche = enthaelt_signalwort;

    // Prüfen auf Sammlungsauflösung
    const sammleraufloesung_signalwoerter = [
      'sammlerauflösung',
      'sammlungsauflösung',
      'sammlung',
      'löse sammlung auf',
      'löse meine sammlung auf',
      'konvult',
      'konvolut',
    ];
    const sammleraufloesung_signalwoerter_gegenteil = [
      'keine sammlerauflösung',
      'keine sammlungsauflösung',
      'keine sammlung',
      'löse sammlung nicht auf',
      'löse meine sammlung nicht auf',
    ];
    enthaelt_signalwort = 0;
    for (const signalwort of sammleraufloesung_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    for (const signalwort of sammleraufloesung_signalwoerter_gegenteil) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 0;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung =
      enthaelt_signalwort;

    // Prüfen auf Verkauf mit Kiloangabe
    const kilo_signalwoerter = ['kilo', ' kg ', 'kilogramm'];

    enthaelt_signalwort = 0;
    for (const signalwort of kilo_signalwoerter) {
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_kilo = enthaelt_signalwort;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(resultingAd);
  });
