import { Model, model, Schema, Types } from "mongoose";

export interface CartItem {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  image: string;
  amount: number;
  product: Schema.Types.ObjectId;
}

export interface IOrder {
  _id: Schema.Types.ObjectId;
  tax: number;
  shippingFee: number;
  subTotal: number;
  Total: number;
  cartItems: [CartItem];
  user: Schema.Types.ObjectId;
  clientSecret: string;
  paymentIntentId?: string;
}

const schemaCartItem = new Schema<CartItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  amount: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const schemaOrder = new Schema<IOrder>({
  tax: { type: Number, required: true, default: 0 },
  shippingFee: { type: Number, required: true, default: 0 },
  subTotal: { type: Number, required: true },
  Total: { type: Number, required: true },
  cartItems: [schemaCartItem],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clientSecret: { type: String, required: true },
  paymentIntentId: { type: String },
});

export const Order = model<IOrder>("Order", schemaOrder);
