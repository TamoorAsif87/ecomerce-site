import { Request, Response, NextFunction } from "express";
import { IProduct, Product } from "../models/Product";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { ProductCollection } from "../models/ProductCollection";

export class ProductsController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product: IProduct = await Product.create(req.body);

      const productCollection = await ProductCollection.findOne({
        _id: product.productCollection,
      });

      if (!productCollection)
        throw new NotFoundError("No collection found", 404);

      res.status(201).json({ id: product._id });
    } catch (e) {
      next(e);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products: IProduct[] = await Product.find({});

      res.status(200).json({ products });
    } catch (e) {
      next(e);
    }
  }
  static async getProductById(
    req: Request<{ id: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product: IProduct | null = await Product.findById(
        req.params.id
      ).populate({
        path: "reviews",
        select: "title rating comment user -_id",
        populate: { path: "user", model: "User", select: "-password -_id" },
      });
      if (!product)
        throw new NotFoundError(`Product with id ${req.params.id} not found`);

      res.status(200).json({ product });
    } catch (e) {
      next(e);
    }
  }
  static async getProductByName(
    req: Request<{ name: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product: IProduct | null = await Product.findOne({
        name: req.params.name,
      });

      if (!product)
        throw new NotFoundError(
          `product with name ${req.params.name} not found`
        );

      res.status(200).json({ product });
    } catch (e) {
      next(e);
    }
  }
  static async updateProduct(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product: IProduct | null = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!product)
        throw new NotFoundError(`product with id ${req.params.id} not found`);

      res.status(200).json({ product });
    } catch (e) {
      next(e);
    }
  }
  static async deleteProduct(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product = await Product.findOne({ _id: req.params.id });

      if (!product)
        throw new NotFoundError(`Product with name ${req.params.id} not found`);

      await product.deleteOne();
      res.status(200).json({ msg: "deleted", deleted: true });
    } catch (e) {
      next(e);
    }
  }
}
