import { Document } from 'mongoose';

export interface AdsSchema extends Document {
  _id: string;
  fraud_score: number;
  title: string;
  // tim
  konto_rating: number;
  konto_erstellt_timestamp: number;
  konto_anzeigen_anzahl: number;
  konto_anzeigen_betrugsrate: number;
  konto_follower_anzahl: number;
  konto_antwortzeit: number;
  konto_antwortrate: number;
  konto_freundlichkeit: number;
  konto_bewertung: number;
  konto_anzeigen_ueber_100: number;
  konto_anzeigen_gleich: number;
  konto_name_laenge: number;
  konto_name_sonderzeichen_anzahl: number;
  konto_name_enthaelt_unueblich: number;
  konto_name_natuerlich: number;
  konto_gewerblich: number;
  konto_privat: number;

  // Chris
  metadata_longitude: number;
  metadata_latitude: number;
  metadata_category: number;
  metadata_amount_pictures: number;
  metadata_phone: number;
  metadata_startDateTime: number;
//JANA
  beschreibung_enthaelt_ueberweisung: number;
  beschreibung_enthaelt_versand: number;
  beschreibung_enthaelt_neu: number;
  beschreibung_enthaelt_ovp: number;
  beschreibung_enthaelt_versiegelt: number;
  beschreibung_enthaelt_whatsapp: number;
  beschreibung_ist_kopiert_anzeige: number;
  beschreibung_ist_kopiert_unternehmen: number;
  ap_beschreibung_enthaelt_barzahlung: number;
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
  //Jessi
  preis_unter_marktwert: number;
  preis_abweichung_marktwert: number;
  preis_waehrung_eur: number;
  preis_typ_vb: number;
  ap_preis_ueber_marktwert: number;
  ap_preis_ist_leer: number;
}
