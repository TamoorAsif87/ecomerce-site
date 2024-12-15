import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import { config } from "dotenv";

import { getEnvironmentVariables } from "./environments/environment";
import { CustomError } from "./errors/CustomError";

import CollectionRouter from "./routes/ProductCollectionRouter";
import UserRouter from "./routes/UserRouter";
import FileuploadRouter from "./routes/FileUploadRouter";
import ProductRouter from "./routes/ProductRouter";
import ReviewRouter from "./routes/ReviewRouter";
import OrderRouter from "./routes/OrderRouter";

import { ValidationErrors } from "./errors/ValidationErrors";
import path from "path";

//Class Server

export class Server {
  private connectionString: string | any = getEnvironmentVariables().mongo_url;
  private jwt_secret = getEnvironmentVariables().jwt_settings?.jwtPrivateKey;
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.notFound404();
    this.errorHandler();
  }

  private setConfigs() {
    this.app.use(express.static(path.join(__dirname, "./public")));
    this.setJson();
    this.app.use(fileUpload({ useTempFiles: true }));
    this.setDbConnect();
    this.setMorgan();
    config();
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    this.app.use(cookieParser(this.jwt_secret));
  }

  private setDbConnect() {
    mongoose
      .connect(this.connectionString, { family: 4 })
      .then((res) => console.log("Connected"))
      .catch((err) => console.log(err));
  }
  private setMorgan() {
    this.app.use(morgan("dev"));
  }

  private setJson() {
    this.app.use(express.json());
  }
  private setRoutes() {
    this.app.use("/api/v1/products/", ProductRouter);
    this.app.use("/api/v1/order/", OrderRouter);
    this.app.use("/api/v1/reviews/", ReviewRouter);
    this.app.use("/api/v1/collection/", CollectionRouter);
    this.app.use("/api/v1/uploads/", FileuploadRouter);
    this.app.use("/api/v1/account/", UserRouter);
  }
  private notFound404() {
    this.app.use((req, res) => {
      res.status(404).json({ msg: "Route Not Found" });
    });
  }
  private errorHandler() {
    this.app.use(
      (err: CustomError, req: Request, res: Response, next: NextFunction) => {
        let message = err?.message || "Something went wrong";
        let status = err?.statusCode || 500;

        if (err instanceof ValidationErrors) {
          res
            .status(status)
            .json({ msg: message, errors: err?.validationErrors });
        }
        res.status(status).json({ msg: message });
      }
    );
  }
}
