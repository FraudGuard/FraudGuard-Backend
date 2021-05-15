import { Schema, model } from 'mongoose';
import { AdsSchema } from './schemas/ads';

// https://mongoosejs.com/docs/schematypes.html
export const adsSchema = new Schema<AdsSchema>(
  {
    _id: { type: Number },
    lego: { type: Number },
    labeled: { type: Number },
    labeledDecision: { type: Number },

    pattern_score: { type: Number },
    pattern_gesamtscore: { type: Number },
    pattern_anzahl_zutreffend: { type: Number },
    pattern_anzahl_gesamt: { type: Number },
    antipattern_score: { type: Number },
    antipattern_gesamtscore: { type: Number },
    antipattern_anzahl_zutreffend: { type: Number },
    antipattern_anzahl_gesamt: { type: Number },

    // tim
    konto_bewertungen_anzahl: { type: Number },
    konto_erstellt_zeit: { type: Number },
    konto_anzeigen_anzahl: { type: Number },
    konto_anzeigen_betrugsrate: { type: Number },
    konto_follower_anzahl: { type: Number },
    konto_antwortzeit: { type: Number },
    konto_antwortrate: { type: Number },
    konto_freundlichkeit: { type: Number },
    konto_bewertung: { type: Number },
    konto_anzeigen_gleich: { type: Number },
    konto_name_laenge: { type: Number },
    konto_name_sonderzeichen_anzahl: { type: Number },
    konto_name_enthaelt_unueblich: { type: Number },
    konto_gewerblich: { type: Number },
    konto_privat: { type: Number },
    ap_konto_name_natuerlich: { type: Number },
    ap_konto_anzeigen_ueber_100: { type: Number },

    // Chris
    metadaten_laengengrad: { type: Number },
    metadaten_breitengrad: { type: Number },
    metadaten_telefonnumer: { type: Number },
    metadaten_anzahl_bilder: { type: Number },
    metadaten_kategorie: { type: Number },
    metadaten_anzeige_zeit: { type: Number },

    // Jana
    beschreibung_enthaelt_ueberweisung: { type: Number },
    beschreibung_enthaelt_versand: { type: Number },
    beschreibung_enthaelt_neu: { type: Number },
    beschreibung_enthaelt_ovp: { type: Number },
    beschreibung_enthaelt_versiegelt: { type: Number },
    beschreibung_enthaelt_whatsapp: { type: Number },
    beschreibung_ist_kopiert_anzeige: { type: Number },
    beschreibung_ist_kopiert_unternehmen: { type: Number },
    ap_beschreibung_enthaelt_barzahlung: { type: Number },
    ap_beschreibung_enthaelt_gebraucht: { type: Number },
    ap_beschreibung_enthaelt_tausch: { type: Number },
    ap_beschreibung_enthaelt_abholung: { type: Number },
    ap_beschreibung_enthaelt_suche: { type: Number },
    ap_beschreibung_enthaelt_sammleraufloesung: { type: Number },
    ap_beschreibung_enthaelt_kilo: { type: Number },

    // Michelle
    // Titel
    titel_enthaelt_neu: { type: Number },
    titel_enthaelt_ovp: { type: Number },
    titel_enthaelt_verschweißt: { type: Number },
    titel_enthaelt_ungeoeffnet: { type: Number },
    titel_enthaelt_zeichen: { type: Number },
    ap_titel_enthaelt_gebraucht: { type: Number },
    ap_titel_enthaelt_suche: { type: Number },
    ap_titel_enthaelt_tausche: { type: Number },
    ap_titel_enthaelt_kilo: { type: Number },
    ap_titel_enthaelt_sammlung: { type: Number },

    // Sonstiges
    sonstiges_anzeige_kopiert: { type: Number },
    ap_sonstiges_anzeige_zeit_tag: { type: Number },
    ap_sonstiges_anzeige_nur_abholung: { type: Number },
    ap_sonstiges_anzeige_suche: { type: Number },

    // Jessi
    preis_unter_marktwert: { type: Number },
    preis_abweichung_marktwert: { type: Number },
    preis_waehrung_eur: { type: Number },
    preis_typ_vb: { type: Number },
    ap_preis_ist_leer: { type: Number },

    fraud_score: { type: Number },

    createdAt: { type: Date, expires: 1209600 },
  },
  {
    id: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export const AdsModel = model<AdsSchema>('Ads', adsSchema);
