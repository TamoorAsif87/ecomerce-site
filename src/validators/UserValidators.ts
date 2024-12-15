import { body, param } from "express-validator";
import { Types } from "mongoose";
import { BadRequestError } from "../errors/BadRequestError";

export class UserValidators {
  static register() {
    return [
      body("name", "Name is required.")
        .notEmpty()
        .withMessage("Name can not be empty.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Characters must be between 2 to 100"),

      body("email", "Email is required")
        .notEmpty()
        .withMessage("Email can not be empty.")
        .isEmail()
        .withMessage("Please Provide valid email."),

      body("password", "Password is required")
        .notEmpty()
        .withMessage("Password can not be empty.")
        .isLength({ min: 5, max: 15 })
        .withMessage("Characters must be between 5 to 15"),
    ];
  }

  static login() {
    return [
      body("email", "Email is required")
        .notEmpty()
        .withMessage("Email can not be empty.")
        .isEmail()
        .withMessage("Please Provide valid email."),

      body("password", "Password is required")
        .notEmpty()
        .withMessage("Password can not be empty.")
        .isLength({ min: 5, max: 15 })
        .withMessage("Characters must be between 5 to 15"),
    ];
  }

  static UserIdFromQuery() {
    return [
      param('id').exists().custom((id) => {
        var isObjectId = Types.ObjectId.isValid(id);
        if(!isObjectId) {
          throw new BadRequestError("Please provide correct Id value of user")
        }
        return true
      }
      )
    ];
  }

  static updatePassword() {
    return [
      body('oldPassword', 'Old Password is required')
      .notEmpty()
      .withMessage("Password can not be empty.")
      .isLength({ min: 5, max: 15 })
      .withMessage("Characters must be between 5 to 15"),
      
      body('newPassword', 'New Password is required')
      .notEmpty()
      .withMessage("Password can not be empty.")
      .isLength({ min: 5, max: 15 })
      .withMessage("Characters must be between 5 to 15"),
    ];
  }

   static updateProfile() {
    return [
     body("name", "Name is required.")
        .notEmpty()
        .withMessage("Name can not be empty.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Characters must be between 2 to 100"),
      
      body('img')
      .optional(),
      body('phone')
      .optional().isMobilePhone('en-PK').withMessage("Please provide valid Pakistan number"),
    ];
  }
}
