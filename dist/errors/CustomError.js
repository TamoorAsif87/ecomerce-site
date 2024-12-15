"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, validationErrors) {
        super(message);
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map