import { Document } from 'mongoose';

export interface AdsSchema extends Document {
  _id: string;
  longitude: number;
  latitude: number;
  category: Array<number>;
  contactName: number; // if contact-name exists or not (0,1)
  description: number;
  phone: number;
  price: number;
  sellerAccountType: Array<number>;
  startDateTime: number;
  title: number;
  userId: number;
  userRating: number;
  userSinceDateTime: number;
  followers: number;
  replySpeed: number;
  replyRate: number;
  friendliness: number;
  rating: number;
  versand: Array<number>;
  scam: number;


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
}
