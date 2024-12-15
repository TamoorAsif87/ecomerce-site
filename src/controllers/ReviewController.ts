import { Request, Response, NextFunction } from "express";
import { IReview, Review } from "../models/Review";
import { ObjectId, Types } from "mongoose";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class ReviewController {
  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.user = req.user._id;
      const isUserAlreadyReviewd = await Review.findOne({
        product: req.body.product,
        user: req.body.user,
      });

      if (isUserAlreadyReviewd)
        throw new BadRequestError("User already reviewd");

      const review: IReview = await new Review(req.body).save();

      res.status(201).json({ id: review._id });
    } catch (e) {
      next(e);
    }
  }

  static async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const reviews: IReview[] = await Review.find({}).populate({
        path: "product",
        select: "name",
      });

      res.status(200).json({ reviews });
    } catch (e) {
      next(e);
    }
  }
  static async getReviewById(
    req: Request<{ id: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const review: IReview | null = await Review.findById(
        req.params.id
      ).populate({ path: "product", select: "name" });

      if (!review)
        throw new NotFoundError(`Review with id ${req.params.id} not found`);

      res.status(200).json({ review });
    } catch (e) {
      next(e);
    }
  }
  static async getAllProductReviews(
    req: Request<{ id: ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reviewsOfProduct: IReview[] = await Review.find({
        product: req.params.id,
      }).populate({ path: "product" });

      res.status(200).json({ reviewsOfProduct });
    } catch (e) {
      next(e);
    }
  }
  static async updateReview(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.body.user = req.user._id;
      const review: IReview | null = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!review)
        throw new NotFoundError(`review with id ${req.params.id} not found`);

      res.status(200).json({ review });
    } catch (e) {
      next(e);
    }
  }
  static async deleteReview(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const review = await Review.findOne({
        _id: req.params.id,
      });

      if (!review)
        throw new NotFoundError(`Review with Id ${req.params.id} not found`);

      if (review.user == req.user._id || req.user.role == "admin") {
        await review.deleteOne();
      } else {
        throw new UnauthorizedError(
          `Review  can not be deleted because it is not your review`
        );
      }

      res.status(200).json({ msg: "deleted", deleted: true });
    } catch (e) {
      next(e);
    }
  }
}
