import { Document } from 'mongoose';

export interface AdsSchema extends Document {
  _id: String;
  longitude: Number;
  latitude: Number;
  category: Array<Number>;
  contactName: Number; // if contact-name exists or not (0,1)
  description: Number;
  phone: Number;
  price: Number;
  sellerAccountType: Array<Number>;
  startDateTime: Number;
  title: Number;
  userId: Number;
  userRating: Number;
  userSinceDateTime: Number;
  followers: Number;
  replySpeed: Number;
  replyRate: Number;
  friendliness: Number;
  rating: Number;
  versand: Array<Number>;
  scam: Number;
}
