import { Schema, model } from 'mongoose';
import { AdsSchema } from './schemas/ads';

// https://mongoosejs.com/docs/schematypes.html
export const adsSchema = new Schema<AdsSchema>(
  {
    _id: { type: Number },
    longitude: { type: Number },
    latitude: { type: Number },
    category: { type: [Number] },
    contactName: { type: Number }, // if contact-name exists or not (0,1)
    description: { type: Number },
    phone: { type: Number }, // if contact-name exists or not (0,1)
    price: { type: Number },
    sellerAccountType: { type: [Number] },
    startDateTime: { type: Number },
    title: { type: Number },
    userId: { type: Number },
    userRating: { type: Number },
    userSinceDateTime: { type: Number },
    followers: { type: Number },
    replySpeed: { type: Number },
    replyRate: { type: Number },
    friendliness: { type: [Number] },
    rating: { type: [Number] },
    versand: { type: [Number] },
    scam: { type: Number },
    createdAt: { type: Date, expires: 1209600 }, // Delete document after 2 weeks

    // tim
    konto_rating: {type:Number},
    konto_erstellt_timestamp: {type:Number},
    konto_anzeigen_anzahl: {type:Number},
    konto_anzeigen_betrugsrate: {type:Number},
    konto_follower_anzahl: {type:Number},
    konto_antwortzeit: {type:Number},
    konto_antwortrate: {type:Number},
    konto_freundlichkeit: {type:Number},
    konto_bewertung: {type:Number},
    konto_anzeigen_ueber_100: {type:Number},
    konto_anzeigen_gleich: {type:Number},
    konto_name_laenge: {type:Number},
    konto_name_sonderzeichen_anzahl: {type:Number},
    konto_name_enthaelt_unueblich: {type:Number},
    konto_name_natuerlich: {type:Number},
    konto_gewerblich: {type:Number},
    konto_privat: {type:Number},
  },
  {
    id: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export const AdsModel = model<AdsSchema>('Ads', adsSchema);
