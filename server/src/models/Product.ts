import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  isActive: boolean;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<ProductDocument>("Product", ProductSchema);
