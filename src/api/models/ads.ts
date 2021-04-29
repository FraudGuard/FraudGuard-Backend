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
  },
  {
    id: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export const AdsModel = model<AdsSchema>('Ads', adsSchema);
