import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    deliveryLocation: { type: String, required: true, trim: true },
    instructions: { type: String, trim: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    items: { type: [OrderItemSchema], default: [] },
    total: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: "pending" },
    deliveredAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type OrderType = mongoose.InferSchemaType<typeof OrderSchema>;
export const Order = mongoose.model<OrderType>("Order", OrderSchema);
