import { body } from "express-validator";
import { Types } from "mongoose";

export class ReviewValidators {
  static createReview() {
    return [
      body("title", "title is required")
        .notEmpty()
        .withMessage("title can not be empty")
        .isLength({ max: 20 })
        .withMessage("title must not exceed above 20 characters"),

      body("comment", "comment is required")
        .notEmpty()
        .withMessage("comment can not be empty")
        .isLength({ max: 200 })
        .withMessage("comment must not exceed above 200 characters"),

      body("rating", "rating is required")
        .isNumeric()
        .isInt({ min: 1, max: 5 })
        .withMessage("rating must be between 1 to 5"),

      body("product", "product is required")
        .custom((val) => Types.ObjectId.isValid(val))
        .withMessage("Please provide valid value"),
    ];
  }
}
