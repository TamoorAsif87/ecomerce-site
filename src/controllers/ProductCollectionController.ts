import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { ProductCollection } from "../models/ProductCollection";

export class ProductCollectionController {
  static async createProductCollection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollection = await ProductCollection.create(req.body);

      res.status(201).json({ id: productCollection._id });
    } catch (e) {
      next(e);
    }
  }

  static async getProductCollection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollections = await ProductCollection.find({});

      res.status(200).json({ productCollections });
    } catch (e) {
      next(e);
    }
  }
  static async getProductCollectionById(
    req: Request<{ id: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollection = await ProductCollection.findById(req.params.id);

      if (!productCollection)
        throw new NotFoundError(
          `Product Collection with id ${req.params.id} not found`
        );

      res.status(200).json({ productCollection });
    } catch (e) {
      next(e);
    }
  }
  static async getProductCollectionByName(
    req: Request<{ name: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollection = await ProductCollection.findOne({
        collectionName: req.params.name,
      });

      if (!productCollection)
        throw new NotFoundError(
          `Collection with name ${req.params.name} not found`
        );

      res.status(200).json({ productCollection });
    } catch (e) {
      next(e);
    }
  }
  static async updateProductCollection(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollection = await ProductCollection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!productCollection)
        throw new NotFoundError(
          `Collection with id ${req.params.id} not found`
        );

      res.status(200).json({ productCollection });
    } catch (e) {
      next(e);
    }
  }
  static async deleteProductCollection(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const productCollection = await ProductCollection.findByIdAndDelete(
        req.params.id
      );

      if (!productCollection)
        throw new NotFoundError(
          `Product Collection with name ${req.params.id} not found`
        );

      res.status(200).json({ msg: "deleted", deleted: true });
    } catch (e) {
      next(e);
    }
  }
}
