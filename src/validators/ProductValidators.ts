import { body } from "express-validator";
import { Types } from "mongoose";
import { BadRequestError } from "../errors/BadRequestError";

export class ProductValidator {
  static CreateProduct() {
    return [
      body("name", "Product Name is required")
        .notEmpty()
        .withMessage("Product Name can not empty")
        .isLength({ max: 100 })
        .withMessage("Name Length must not exceed 100 characters"),

      body("description", "Product Description is required")
        .notEmpty()
        .withMessage("Product Description can not empty")
        .isLength({ max: 500 })
        .withMessage("Description Length must not exceed 100 characters"),

      body("price", "Product Price is required")
        .notEmpty()
        .withMessage("Product Description can not empty")
        .isNumeric()
        .withMessage("Price can only be degits")
        .custom((val) => val > 0)
        .withMessage("Price must be postive"),

      body("categories", "categories required")
        .isArray({ min: 1 })
        .withMessage("Must contain category"),

      body("productImages", "categories required")
        .isArray({ min: 1 })
        .withMessage("Must contain category"),

      body("discount")
        .optional()
        .isNumeric()
        .withMessage("Price can only be degits")
        .custom((val) => val >= 0)
        .withMessage("Discount Price must be postive"),

      body("inventory")
        .optional()
        .custom((val) => {
          if (val == "in-stock" || val == "out-stock") {
            return true;
          }
          throw new BadRequestError("Invalid inventry value entered");
        }),

      body("availableInInventory")
        .optional()
        .custom((val) => val >= 0)
        .withMessage("availableInInventory must not be zero or negative"),
    ];
  }
}
