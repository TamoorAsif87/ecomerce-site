import { Model, model, Schema, Types } from "mongoose";

export interface IProfile {
  _id: Types.ObjectId;
  user: Types.ObjectId | undefined;
  img: string;
  phone: string;
}

interface IProfileMethods {}

export type ProfileModel = Model<IProfile, {}, IProfileMethods>;

const schema = new Schema<IProfile, ProfileModel, IProfileMethods>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  img: { type: String, default: null },
  phone: { type: String, default: null },
});

export const Profile = model<IProfile, ProfileModel>("Profile", schema);
