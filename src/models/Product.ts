import mongoose, { Model, model, Schema, Types } from "mongoose";
import { Review } from "./Review";

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: number;
  categories: [string];
  productImages: [string];
  discount: number;
  description: string;
  productCollection: Types.ObjectId | undefined;
  inventory: "in-stock" | "out-stock";
  availableInInventory: number;
  averageRating: number;
}

interface IProductMethods {}

type ProductModel = Model<IProduct, {}, IProductMethods>;

const schema = new Schema<IProduct, ProductModel, IProductMethods>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    categories: { type: [String] },
    productImages: { type: [String] },
    discount: { type: Number, default: 0 },
    productCollection: {
      type: mongoose.Schema.ObjectId,
      ref: "ProductCollection",
    },
    inventory: { type: String, default: "in-stock" },
    availableInInventory: { type: Number, required: true, default: 1 },
    averageRating: { type: Number, default: 5 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.virtual("reviews", {
  ref: "Reviews",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match:{rating:5}
});

schema.pre("deleteOne", { document: true, query: false }, async function (r) {
  await Review.deleteMany({ product: this._id });
});

export const Product = model<IProduct>("Product", schema);
