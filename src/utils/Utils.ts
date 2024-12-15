import * as jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";
import { Types } from "mongoose";
import { Response } from "express";

export class Utils {
  private static jwt_secretKey: string | undefined | any =
    getEnvironmentVariables().jwt_settings?.jwtPrivateKey;
  private static expiresAt = getEnvironmentVariables().jwt_settings?.expiresAt;

  static generateToken(payload: {
    _id: Types.ObjectId;
    email: string;
    name: string;
    role: string;
  }): string {
    const token = jwt.sign(payload, this.jwt_secretKey, {
      expiresIn: this.expiresAt,
    });

    return token;
  }

  static attachedCookies(
    user: { _id: Types.ObjectId; email: string; name: string; role: string },
    res: Response
  ) {
    const oneDay = 24 * 60 * 60 * 1000;
    const token = this.generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
      signed: true,
    });
  }
}
