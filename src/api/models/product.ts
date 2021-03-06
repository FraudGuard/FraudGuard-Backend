import { Schema, model } from 'mongoose';
import { ProductSchema } from './schemas/product';

/**
 *  Erstellt ein ProductSchema für mongoose
 */
export const productSchema = new Schema<ProductSchema>(
  {
    _id: { type: Number },
    unternehmen: { type: String },
    produktname: { type: String },
    beschreibung: { type: String },
    preis: { type: Number },

    createdAt: { type: Date, expires: 1209600 },
  },
  {
    id: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

export const ProductModel = model<ProductSchema>('Products', productSchema);
