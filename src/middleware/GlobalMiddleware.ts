import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  ValidationErrors,
  ValidationResultError,
} from "../errors/ValidationErrors";
import { UnauthorizedError } from "../errors/UnauthorizedError";

import { verify } from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";
import { Types } from "mongoose";

export class GlobalMiddleware {
  static ShowErrors(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);

    const validationErrors: ValidationResultError = {};

    result.array().forEach((error) => {
      if (error.type == "field") {
        validationErrors[error.path] = error.msg;
      }
    });

    if (result.array().length > 0) {
      throw new ValidationErrors("ValidationErrors", 400, validationErrors);
    }

    next();
  }

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.signedCookies?.token;

      if (!token) throw new UnauthorizedError("Unauthorized", 401);
      const privateKey: string | any =
        getEnvironmentVariables().jwt_settings?.jwtPrivateKey;

      const user:
        | { name: string; email: string; _id: Types.ObjectId; role: string }
        | any = await verify(token, privateKey);
      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  static authorized([...roles]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError(
          "Unauthorized.You are not permited for this route.",
          401
        );
      }
      next();
    };
  }
}
