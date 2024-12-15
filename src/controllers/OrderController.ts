import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { CartItem, Order } from "../models/Order";
import { BadRequestError } from "../errors/BadRequestError";
import { Product } from "../models/Product";

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItems: Items } = req.body;

      const checkOut = await OrderController.createCheckOutOrder(Items);

      checkOut.Total = checkOut.subTotal + req.body.tax + req.body.shippingFee;

      const order = await Order.create({
        subTotal: checkOut.subTotal,
        Total: checkOut.Total,
        shippingFee: req.body.shippingFee,
        tax: req.body.tax,
        paymentIntentId: "secret",
        clientSecret: "secret",
        user: req.user._id,
      });

      res.status(201).json({ checkOut });
    } catch (e) {
      next(e);
    }
  }

  private static async createCheckOutOrder(Items: CartItem[]) {
    let checkOut: {
      checkOutItems: [CartItem] | any[];
      subTotal: number;
      Total: number;
    } = {
      checkOutItems: [],
      subTotal: 0,
      Total: 0,
    };
    for (let item of Items) {
      let cartItem = item as CartItem;
      let productExist = await Product.findOne({ _id: cartItem.product });

      if (!productExist)
        throw new NotFoundError(
          `Product not found with Id = ${cartItem.product}`
        );

      checkOut = {
        checkOutItems: [...checkOut.checkOutItems, item],
        subTotal: checkOut.subTotal + cartItem.price * cartItem.amount,
        Total: 0,
      };
    }

    return checkOut;
  }

  //   static async getProductCollection(
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const productCollections = await ProductCollection.find({});

  //       res.status(200).json({ productCollections });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  //   static async getProductCollectionById(
  //     req: Request<{ id: Types.ObjectId }>,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const productCollection = await ProductCollection.findById(req.params.id);

  //       if (!productCollection)
  //         throw new NotFoundError(
  //           `Product Collection with id ${req.params.id} not found`
  //         );

  //       res.status(200).json({ productCollection });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  //   static async getProductCollectionByName(
  //     req: Request<{ name: string }>,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const productCollection = await ProductCollection.findOne({
  //         collectionName: req.params.name,
  //       });

  //       if (!productCollection)
  //         throw new NotFoundError(
  //           `Collection with name ${req.params.name} not found`
  //         );

  //       res.status(200).json({ productCollection });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  //   static async updateProductCollection(
  //     req: Request<{ id?: Types.ObjectId }>,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const productCollection = await ProductCollection.findByIdAndUpdate(
  //         req.params.id,
  //         req.body,
  //         { new: true, runValidators: true }
  //       );

  //       if (!productCollection)
  //         throw new NotFoundError(
  //           `Collection with id ${req.params.id} not found`
  //         );

  //       res.status(200).json({ productCollection });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
  //   static async deleteProductCollection(
  //     req: Request<{ id?: Types.ObjectId }>,
  //     res: Response,
  //     next: NextFunction
  //   ) {
  //     try {
  //       const productCollection = await ProductCollection.findByIdAndDelete(
  //         req.params.id
  //       );

  //       if (!productCollection)
  //         throw new NotFoundError(
  //           `Product Collection with name ${req.params.id} not found`
  //         );

  //       res.status(200).json({ msg: "deleted", deleted: true });
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
}
