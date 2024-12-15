import mongoose, { Types } from "mongoose";

export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        role: string;
        email: string;
      };
    }
  }
}
