import { AdsSchema } from '../../api/models';

const generateBeschreibung = (resultingAd: AdsSchema) => {
  resultingAd.beschreibung = '';
  // Antipattern
  if (resultingAd.ap_titel_enthaelt_gebraucht === 1) {
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

  if (resultingAd.ap_beschreibung_enthaelt_paypal_kaeuferschutz === 1) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, da eine Bezahlung mit Paypal Käuferschutz angeboten wird.</li>';
  }

  if (resultingAd.ap_preis_ist_leer === 1) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil kein Preis angegeben ist.</li>';
  }
  // Kombinationen - Antipattern
  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung !== 1 &&
    resultingAd.beschreibung_enthaelt_sepa
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil der Artikel direkt abgeholt und Bar bezahlt werden kann.</li>';
  }

  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 0
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil nur Abholung möglich ist und die Beschreibung Barzahlung aber nicht Überweisung enthält.</li>';
  }

  if (
    resultingAd.ap_beschreibung_enthaelt_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_gebraucht === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil die Beschreibung Abholung, Barzahlung und gebraucht enthält.</li>';
  }

  if (
    resultingAd.ap_sonstiges_anzeige_nur_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_gebraucht
  ) {
    resultingAd.beschreibung +=
      '<li>kein Betrug, weil nur Abholung möglich ist und die Beschreibung Barzahlung und gebraucht enthält.</li>';
  }

  if (
    resultingAd.ap_beschreibung_enthaelt_abholung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil die Beschreibung Abholung und Sammlung enthält.</li>';
  }

  if (
    resultingAd.preis_abweichung_marktwert >= 0.5 &&
    resultingAd.ap_beschreibung_enthaelt_sammleraufloesung === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Kein Betrug, weil der Preis 50% über dem vom Marktpreis liegt und die Beschreibung Sammlung enthält.</li>';
  }

  // Kombinationen - Pattern
  if (
    resultingAd.ap_beschreibung_enthaelt_abholung === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.ap_beschreibung_enthaelt_barzahlung === 0
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: Abholung, Überweisung und nicht Barzahlung in der Beschreibung.</li>';
  }

  if (
    (resultingAd.titel_enthaelt_ovp === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_ovp === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: ovp (im Titel oder in der Beschreibung) und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_neu === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu (im Titel oder in der Beschreibung) und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_verschweißt === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.titel_enthaelt_ungeoeffnet === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3) ||
    (resultingAd.beschreibung_enthaelt_versiegelt === 1 &&
      resultingAd.preis_abweichung_marktwert <= -0.3)
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: verschweißt oder ungeöffnet im Titel oder versiegelt in der Beschreibung. Zusätzlich liegt der Preis mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    resultingAd.konto_privat === 1 &&
    resultingAd.konto_name_enthaelt_gmbh === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: ein privates Konto und gmbh im Kontoname.<li>';
  }

  if (
    (resultingAd.beschreibung_enthaelt_neu === 1 &&
      resultingAd.beschreibung_enthaelt_whatsapp === 1) ||
    (resultingAd.titel_enthaelt_neu === 1 &&
      resultingAd.beschreibung_enthaelt_whatsapp === 1)
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu (im Titel oder in der Beschreibung) und WhatsApp in der Beschreibung.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.beschreibung_ist_kopiert_anzeige === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu und ovp (im Titel oder in der Beschreibung) und eine kopierte Beschreibung einer anderen Anzeige.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.sonstiges_anzeige_kopiert === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu und ovp (Im Titel oder in der Beschreibung) und einen kopierten Titel und eine kopierte Beschreibung von einer anderen Anzeige.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enhält: neu (im Titel oder in der Beschreibung), einen kopierten Titel und eine kopierte Beschreibung von einer anderen Anzeige und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.beschreibung_enthaelt_whatsapp === 1 &&
    resultingAd.beschreibung_enthaelt_sepa
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu (im Titel oder in der Beschreibung), WhatsApp und Sepa in der Beschreibung.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    (resultingAd.titel_enthaelt_ovp === 1 ||
      resultingAd.beschreibung_enthaelt_ovp === 1) &&
    resultingAd.beschreibung_ist_kopiert_unternehmen === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu und ovp (im Titel oder in der Beschreibung), eine Beschreibung, die von einem Unternehmen kopiert ist und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    resultingAd.titel_enthaelt_neu === 0 &&
    resultingAd.beschreibung_enthaelt_neu === 0 &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: nicht neu (im Titel oder in der Beschreibung), einen kopierten Titel und eine kopierte Beschreibung von einer anderen Anzeige und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    resultingAd.titel_enthaelt_ovp === 0 &&
    resultingAd.beschreibung_enthaelt_ovp === 0 &&
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: nicht ovp (im Titel oder in der Beschreibung), einen kopierten Titel und eine kopierte Beschreibung von einer anderen Anzeige und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  if (
    (resultingAd.titel_enthaelt_neu === 1 ||
      resultingAd.beschreibung_enthaelt_neu === 1) &&
    resultingAd.ap_beschreibung_enthaelt_abholung === 0 &&
    resultingAd.preis_abweichung_marktwert <= -0.3
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: nicht Abholung in der Beschreibung, neu (im Titel oder in der Beschreibung) und der Preis liegt mindestens 30% unter dem Marktwert.<li>';
  }

  // Kombinationen - Pattern - Assoziationsanalys

  if (
    resultingAd.beschreibung_enthaelt_sepa === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.konto_privat === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: sepa und Überweisung in der Beschreibung und es handelt sich um eine privates Konto.<li>';
  }

  if (
    resultingAd.titel_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu und mindestens ein Sonderzeichen im Titel und die Kategorie ist unpassend.<li>';
  }

  if (
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: ovp und mindestens ein Sonderzeichen im Titel und die Kategorie ist unpassend.<li>';
  }

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.beschreibung_enthaelt_ovp === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versiegelt === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: einen Preis unter dem Marktwert sowie ovp, neu und versiegelt in der Beschreibung.<li>';
  }

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: einen Preis unter dem Marktwert, einen VB Preis, neu und versiegelt in der Beschreibung.<li>';
  }

  if (
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>DIe Anzeige enthält: einen VB Preis, neu und Versand in der Beschreibung und die Kategorie ist unpassend.<li>';
  }

  if (
    resultingAd.beschreibung_ist_kopiert_anzeige === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: eine kopierte Beschreibung von einer anderen Anzeige, neu in der Beschreibung, ovp im Titel und eine unpassende Kategorie.<li>';
  }

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_anzeige_kopiert === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: einen Preis unter dem Marktwert, ovp im Titel, neu in der Beschreibung und eine unpassende Kategorie.<li>';
  }

  if (
    resultingAd.sonstiges_anzeige_kopiert === 1 &&
    resultingAd.beschreibung_enthaelt_neu === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: einen kopierten Titel und eine kopierte Beschreibung von einer anderen Anzeige, ovp im Titel, neu in der Beschreibung und eine unpassende Kategorie.<li>';
  }

  if (
    resultingAd.beschreibung_enthaelt_sepa === 1 &&
    resultingAd.beschreibung_enthaelt_ueberweisung === 1 &&
    resultingAd.beschreibung_enthaelt_versand === 1 &&
    resultingAd.konto_privat === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: sepa, Überweisung und Versand in der Beschreibung und es handelt sich um ein privates Konto.<li>';
  }

  if (
    resultingAd.preis_unter_marktwert === 1 &&
    resultingAd.preis_typ_vb === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_neu === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: einen Preis unter dem Marktwert, einen VB Preis, neu und ovp im Titel.<li>';
  }

  if (
    resultingAd.titel_enthaelt_zeichen === 1 &&
    resultingAd.titel_enthaelt_ovp === 1 &&
    resultingAd.titel_enthaelt_neu === 1 &&
    resultingAd.sonstiges_kategorie_unpassend === 1
  ) {
    resultingAd.beschreibung +=
      '<li>Die Anzeige enthält: neu, ovp und mindestens ein Sonderzeichen im Titel und hat eine unpassende Kategorie.<li>';
  }

  if (resultingAd.beschreibung.length > 0) {
    resultingAd.beschreibung =
      '<b>Folgende Gründe haben wir für die Analyse herangezogen: </b><ul>' +
      resultingAd.beschreibung +
      '</ul>';
  }
};
export { generateBeschreibung };
