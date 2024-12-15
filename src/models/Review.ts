import mongoose, { Types, Schema, ObjectId, model, Model } from "mongoose";
import { Product } from "./Product";

export interface IReview extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  rating: number;
  comment: string;
  user: ObjectId;
  product: ObjectId;
}

interface ReviewModel extends Model<IReview> {
  calculateAverageRating(
    productId: mongoose.Schema.Types.ObjectId
  ): Promise<void>;
}

const schema = new Schema<IReview, ReviewModel>(
  {
    title: { type: String, required: true, trim: true },
    rating: { type: Number, max: 5, min: 1 },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);

schema.index({ user: 1, product: 1 }, { unique: true });

schema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await Product.findByIdAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

schema.post("save", async function () {
  const model = this.constructor as ReviewModel;
  await model.calculateAverageRating(this.product);
});

export const Review = model<IReview, ReviewModel>("Reviews", schema);
