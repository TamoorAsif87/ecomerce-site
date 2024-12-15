import { body } from "express-validator";
import { Types } from "mongoose";

export class OrderValidators {
  static orderCreation() {
    return [
      body("tax", "tax is required")
        .isFloat({ min: 0 })
        .withMessage("Tax must be greater than 0"),
      body("shippingFee", "ShippingFee is required")
        .isFloat({ min: 0 })
        .withMessage("ShippingFee must be greater than 0"),
      body("subTotal", "Sub Total is required")
        .isFloat({ min: 0 })
        .withMessage("Sub Total must be greater than 0"),
      body("Total", "Total is required")
        .isFloat({ min: 0 })
        .withMessage("Total must be greater than 0"),

      body("cartItems", "CartItems is required")
        .isArray({ min: 1 })
        .withMessage("Must have atleast one Item for placing an order"),

      body("clientSecret", "clientSecret is required"),
    ];
  }

  static cartItem() {
    return [
      body("name", "name is required")
        .isLength({ min: 1 })
        .withMessage("name is required for order alteat one character"),
      body("price", "prirce is required")
        .isFloat({ min: 1 })
        .withMessage("Price must be greater than 0"),

      body("amount", "amount is required")
        .isFloat({ min: 1 })
        .withMessage("Amount must be greater than 0"),

      body("product", "product is required")
        .custom((val) => Types.ObjectId.isValid(val))
        .withMessage("Product is invalid"),
    ];
  }
}
