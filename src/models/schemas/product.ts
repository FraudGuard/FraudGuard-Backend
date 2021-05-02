import { Document } from 'mongoose';

export interface ProductSchema extends Document {
  _id: string;
  unternehmen: string;
  produktname: string;
  beschreibung: string;
  preis: number;

}
