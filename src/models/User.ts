import bcrypt from "bcrypt";
import { Model, model, Schema, Types } from "mongoose";
import { Profile } from "./Profile";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

interface IUserMethods {
  passwordCompare(passwordToCompare: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

schema.pre("save", async function () {
  const passwordHash = await bcrypt.hash(this.password, 10);
  this.password = passwordHash;
});

schema.post("save", async function () {
  await new Profile({ user: this._id }).save();
});

schema.method(
  "passwordCompare",
  async function passwordCompare(passwordToCompare: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(passwordToCompare, this.password);
    return isMatch;
  }
);

schema.pre("deleteOne", async function () {
  const doc = await this.model.findOne(this.getQuery());
  await Profile.deleteOne({ user: doc._id });
});

export const User = model<IUser, UserModel>("User", schema);
