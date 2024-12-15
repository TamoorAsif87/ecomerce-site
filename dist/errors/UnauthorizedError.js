"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const CustomError_1 = require("./CustomError");
class UnauthorizedError extends CustomError_1.CustomError {
    constructor(message, statusCode = 401) {
        super(message, statusCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map