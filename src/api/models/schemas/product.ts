import { Document } from 'mongoose';

/**
 *  Erstellt ein ProductSchema Interface
 */
export interface ProductSchema extends Document {
  _id: string;
  unternehmen: string;
  produktname: string;
  beschreibung: string;
  preis: number;
}
