import { AdsFromEbaySchema, AdsSchema, ProductModel } from '../../models';
import { logger } from '../../shared';

export const analyzeBeschreibung = (
  ad: AdsFromEbaySchema,
  resultingAd: AdsSchema,
) =>
  new Promise((resolve, reject) => {
    logger.info('start analyze Beschreibung');

    //prüfen auf Überweisung
    var ueberweisung_signalwoerter = [
      'überweisung',
      'ueberweisung',
      'sepa-überweisung',
      'sepa-ueberwesiung',
      'überweisen',
      'ueberweisen',
      'sepa',
    ];
    var ueberweisung_signalwoerter_gegenteil = [
      'keine überweisung',
      'keine ueberweisung',
      'keine sepa-überweisung',
      'keine sepa-ueberwesiung',
      'nicht überweisen',
      ' nicht ueberweisen',
      'kein sepa',
    ];
    var enthaelt_signalwort = 0;
    var i = 0;
    for (var signalwort of ueberweisung_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(ueberweisung_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.beschreibung_enthaelt_ueberweisung = enthaelt_signalwort;

    //Prüfen auf Versand
    var versand_signalwoerter = [
      'versand',
      'versandgebuehren',
      'dhl',
      'hermes',
    ];
    var versand_signalwoerter_gegenteil = [
      'kein versand',
      'keine versandgebuehren',
      'kein dhl',
      'kein hermes',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of versand_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(versand_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.beschreibung_enthaelt_versand = enthaelt_signalwort;

    //Prüfen auf neu
    var neu_signalwoerter = [
      'neu',
      'new',
      'unbenutzt',
      'nie ausgepackt',
      'ungeoeffnet',
      'nicht benutzt',
    ];
    var neu_signalwoerter_gegenteil = [
      'nicht neu',
      'nicht new',
      'nicht unbenutzt',
      'nicht nie ausgepackt',
      'nicht ungeoeffnet',
      'nicht nicht benutzt',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of neu_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(neu_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.beschreibung_enthaelt_neu = enthaelt_signalwort;

    //Prüfen auf ovp
    var ovp_signalwoerter = [
      'ovp',
      'original',
      'originalverpackt',
      'originalverpackung',
    ];
    var ovp_signalwoerter_gegenteil = [
      'nicht ovp',
      'nicht original',
      'nicht originalverpackt',
      'nicht die originalverpackung',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of ovp_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(ovp_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.beschreibung_enthaelt_ovp = enthaelt_signalwort;

    //Prüfen auf Versiegelung
    var versiegelt_signalwoerter = [
      'versiegelt',
      'verschweißt',
      'versiegelung',
      'siegel',
    ];
    var versiegelt_signalwoerter_gegenteil = [
      'nicht versiegelt',
      'nicht verschweißt',
      'keine versiegelung',
      'kein siegel',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of versiegelt_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(versiegelt_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.beschreibung_enthaelt_versiegelt = enthaelt_signalwort;

    //Prüfen auf Whatsapp
    var whatsapp_signalwoerter = [
      'whatsapp',
      'whats-app',
      'welche app',
      'what app',
    ];
    enthaelt_signalwort = 0;
    for (var signalwort of whatsapp_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    resultingAd.beschreibung_enthaelt_whatsapp = enthaelt_signalwort;

    // prüfen auf kopierte Anzeigenbeschreibung

    //TODO

    // prüfen auf kopierte Unternehmensbeschreibung

    ProductModel.find();

    //Antipattern
    //Prüfen auf Barzahlung
    var barzahlung_signalwoerter = ['barzahlung', 'bar', 'bezahlung vor ort'];
    var barzahlung_signalwoerter_gegenteil = [
      'keine barzahlung',
      'kein bar',
      'keine bezahlung vor ort',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of barzahlung_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(barzahlung_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_barzahlung = enthaelt_signalwort;

    //Prüfen, ob Artikel gebraucht ist
    var gebraucht_signalwoerter = [
      'gebrauchsspuren',
      'benutzt',
      'gebraucht',
      'aufgebaut',
    ];
    var gebraucht_signalwoerter_gegenteil = [
      'keine gebrauchsspuren',
      'nicht benutzt',
      'nicht gebraucht',
      'nie aufgebaut',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of gebraucht_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(gebraucht_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_gebraucht = enthaelt_signalwort;

    //Prüfen auf Tausch
    var tausch_signalwoerter = [
      'tausch',
      'tausche',
      'tauschangebot',
      'tauschen',
    ];
    var tausch_signalwoerter_gegenteil = [
      'kein tausch',
      'tausche nicht',
      'kein tauschangebot',
      'nicht tauschen',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of tausch_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(tausch_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_tausch = enthaelt_signalwort;

    //Prüfen auf Abholung
    var abholung_signalwoerter = [
      'abholung',
      'nur abholung',
      'selbstabholer',
      'abholen',
    ];
    var abholung_signalwoerter_gegenteil = [
      'keine abholung',
      'keine abholung',
      'kein selbstabholer',
      'nicht abholen',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of abholung_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(abholung_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_abholung = enthaelt_signalwort;

    //Prüfen auf Suche
    var suche_signalwoerter = ['suche', 'gesucht'];
    var suche_signalwoerter_gegenteil = ['keine suche', 'nicht gesucht'];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of suche_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(suche_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_suche = enthaelt_signalwort;

    //Prüfen auf Sammlungsauflösung
    var sammleraufloesung_signalwoerter = [
      'sammlerauflösung',
      'sammlungsauflösung',
      'sammlung',
      'löse sammlung auf',
    ];
    var sammleraufloesung_signalwoerter_gegenteil = [
      'keine sammlerauflösung',
      'keine sammlungsauflösung',
      'keine sammlung',
      'löse sammlung nicht auf',
    ];
    enthaelt_signalwort = 0;
    i = 0;
    for (var signalwort of sammleraufloesung_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (
        beschreibung.includes(signalwort) &&
        !beschreibung.includes(sammleraufloesung_signalwoerter_gegenteil[i])
      ) {
        enthaelt_signalwort = 1;
      }
      i += 1;
    }
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung = enthaelt_signalwort;

    //Prüfen auf Verkauf mit Kiloangabe
    var kilo_signalwoerter = ['kilo', ' kg ', 'kilogramm'];

    enthaelt_signalwort = 0;
    for (var signalwort of kilo_signalwoerter) {
      var beschreibung = ad['description']?.value?.toLowerCase();
      if (beschreibung.includes(signalwort)) {
        enthaelt_signalwort = 1;
      }
    }
    resultingAd.ap_beschreibung_enthaelt_kilo = enthaelt_signalwort;

    if (false) {
      reject(new Error('Some Error happened'));
    }
    resolve(ad);
  });
