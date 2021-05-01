import { Document } from 'mongoose';

export interface AdsSchema extends Document {
  _id: string;
  fraud_score: number;

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

  //Jessi
  preis_unter_marktwert: number;
  preis_abweichung_marktwert: number;
  preis_waehrung_eur: number;
  preis_typ_vb: number;
  ap_preis_ueber_marktwert: number;
  ap_preis_ist_leer: number;

}
