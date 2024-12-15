import { Types, Schema, model } from "mongoose";

interface IProductCollection {
  _id: Types.ObjectId;
  collectionName: string;
  collectionBanner: string;
}

const schema = new Schema<IProductCollection>(
  {
    collectionName: { type: String, required: true, trim: true },
    collectionBanner: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ProductCollection = model<IProductCollection>(
  "ProductCollection",
  schema
);
