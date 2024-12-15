"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
class UserValidators {
    static register() {
        return [
            (0, express_validator_1.body)("name", "Name is required.")
                .notEmpty()
                .withMessage("Name can not be empty.")
                .isLength({ min: 2, max: 100 })
                .withMessage("Characters must be between 2 to 100"),
            (0, express_validator_1.body)("email", "Email is required")
                .notEmpty()
                .withMessage("Email can not be empty.")
                .isEmail()
                .withMessage("Please Provide valid email."),
            (0, express_validator_1.body)("password", "Password is required")
                .notEmpty()
                .withMessage("Password can not be empty.")
                .isLength({ min: 5, max: 15 })
                .withMessage("Characters must be between 5 to 15"),
        ];
    }
    static login() {
        return [
            (0, express_validator_1.body)("email", "Email is required")
                .notEmpty()
                .withMessage("Email can not be empty.")
                .isEmail()
                .withMessage("Please Provide valid email."),
            (0, express_validator_1.body)("password", "Password is required")
                .notEmpty()
                .withMessage("Password can not be empty.")
                .isLength({ min: 5, max: 15 })
                .withMessage("Characters must be between 5 to 15"),
        ];
    }
}
exports.UserValidators = UserValidators;
//# sourceMappingURL=UserValidators.js.map