import { body } from "express-validator";

export class ProductCollectionValidators {
  static postCollection() {
    return [
      body("collectionName", "Name is required.")
        .notEmpty()
        .withMessage("Collection Name can not be empty.")
        .isLength({ min: 2, max: 50 })
        .withMessage("Characters must be between 2 to 50"),
    ];
  }
}
