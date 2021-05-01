import { Schema, model } from 'mongoose';
import { AdsFromEbaySchema } from './schemas/adsFromEbay';

// https://mongoosejs.com/docs/schematypes.html
export const adsFromEbaySchema = new Schema<AdsFromEbaySchema>(
  {
    _id: { type: String },
    labeled: { type: Boolean },
    labeledDecision: { type: Boolean },
    toReview: { type: Boolean },

    'ad-address': { type: Object },
    'ad-external-reference-id': { type: Object },
    'ad-source-id': { type: Object },
    'ad-status': { type: Object },
    'ad-type': { type: Object },
    attributes: { type: Array },
    category: { type: Object },
    'contact-name': { value: { type: String } },
    'contact-name-initials': { value: { type: String } },
    description: { value: { type: String } },
    displayoptions: { type: Object },
    documents: { document: [] },
    'features-active': { type: Array },
    id: { type: Number },
    imprint: { type: Object },
    link: { type: Array },
    locale: { type: String },
    locations: { type: Object },
    medias: { type: Object },
    otherAttributes: { type: Object },
    phone: { type: Object },
    pictures: { type: Object },
    'poster-type': { type: Object },
    price: { type: Object },
    'seller-account-type': { value: { type: String } },
    'start-date-time': { value: { type: String } },
    'store-id': { type: Object },
    title: { value: { type: String } },
    tracking: {
      'user-account-type': { value: { type: String } },
    },
    'user-id': { value: { type: Number } },
    'user-rating': { averageRating: { value: { type: Number } } },
    'user-since-date-time': { value: { type: String } },
    userBadges: { type: Array },
    version: { type: String },
  },
  {
    id: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export const AdsFromEbayModel = model<AdsFromEbaySchema>(
  'adsfromebay',
  adsFromEbaySchema,
);
