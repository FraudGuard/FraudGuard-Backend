import { Document } from 'mongoose';

/**
 *  Erstellt ein AdsSchema Interface
 */
export interface AdsSchema extends Document {
  _id: string;
  beschreibung: string;
  lego: number;
  labeled: number;
  labeledDecision: number;
  fraud_score: number;
  toReview: number;
  comment: string;
  keine_bewertung_moeglich: number;

  // evaluate
  pattern_score: number;
  pattern_gesamtscore: number;
  pattern_anzahl_zutreffend: number;
  pattern_anzahl_gesamt: number;
  antipattern_score: number;
  antipattern_gesamtscore: number;
  antipattern_anzahl_zutreffend: number;
  antipattern_anzahl_gesamt: number;

  // tim
  konto_bewertungen_anzahl: number;
  konto_erstellt_zeit: number;
  konto_anzeigen_anzahl: number;
  konto_anzeigen_betrugsrate: number;
  konto_follower_anzahl: number;
  konto_antwortzeit: number;
  konto_antwortrate: number;
  konto_freundlichkeit: number;
  konto_bewertung: number;
  konto_anzeigen_gleich: number;
  konto_name_laenge: number;
  konto_name_enthaelt_gmbh: number;
  konto_anzeigen_verschiedene_orte: number;
  konto_name_sonderzeichen_anzahl: number;
  konto_name_enthaelt_unueblich: number;
  konto_gewerblich: number;
  konto_privat: number;
  konto_anzeigen_ueber_100: number;
  ap_konto_name_natuerlich: number;

  // Chris
  metadaten_laengengrad: number;
  metadaten_breitengrad: number;
  metadaten_kategorie: number;
  metadaten_anzahl_bilder: number;
  metadaten_telefonnummer: number;
  metadaten_anzeige_zeit: number;

  // Jana
  beschreibung_enthaelt_ueberweisung: number;
  beschreibung_enthaelt_sepa: number;
  beschreibung_enthaelt_paypal_freunde: number;
  beschreibung_enthaelt_versand: number;
  beschreibung_enthaelt_neu: number;
  beschreibung_enthaelt_ovp: number;
  beschreibung_enthaelt_versiegelt: number;
  beschreibung_enthaelt_whatsapp: number;
  beschreibung_ist_kopiert_anzeige: number;
  beschreibung_ist_kopiert_unternehmen: number;
  ap_beschreibung_enthaelt_barzahlung: number;
  ap_beschreibung_enthaelt_paypal_kaeuferschutz: number;
  ap_beschreibung_enthaelt_gebraucht: number;
  ap_beschreibung_enthaelt_tausch: number;
  ap_beschreibung_enthaelt_abholung: number;
  ap_beschreibung_enthaelt_suche: number;
  ap_beschreibung_enthaelt_sammleraufloesung: number;
  ap_beschreibung_enthaelt_kilo: number;

  // Michelle
  titel_enthaelt_neu: number;
  titel_enthaelt_ovp: number;
  titel_enthaelt_verschweißt: number;
  titel_enthaelt_ungeoeffnet: number;
  titel_enthaelt_zeichen: number;
  ap_titel_enthaelt_gebraucht: number;
  ap_titel_enthaelt_suche: number;
  ap_titel_enthaelt_tausche: number;
  ap_titel_enthaelt_kilo: number;
  ap_titel_enthaelt_sammlung: number;

  // Sonstiges
  sonstiges_anzeige_kopiert: number;
  sonstiges_kategorie_unpassend: number;
  ap_sonstiges_anzeige_zeit_tag: number;
  ap_sonstiges_anzeige_nur_abholung: number;
  ap_sonstiges_anzeige_suche: number;

  // Jessi
  preis_unter_marktwert: number;
  preis_abweichung_marktwert: number;
  preis_waehrung_eur: number;
  preis_typ_vb: number;
  ap_preis_ist_leer: number;
}
