"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = void 0;
const CustomError_1 = require("./CustomError");
class ValidationErrors extends CustomError_1.CustomError {
    constructor(message, statusCode = 404, validationErrors) {
        super(message, statusCode);
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}
exports.ValidationErrors = ValidationErrors;
//# sourceMappingURL=ValidationErrors.js.map