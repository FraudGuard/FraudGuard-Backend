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
}
