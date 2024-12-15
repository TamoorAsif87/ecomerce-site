"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleware = void 0;
const express_validator_1 = require("express-validator");
const ValidationErrors_1 = require("../errors/ValidationErrors");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const jsonwebtoken_1 = require("jsonwebtoken");
const environment_1 = require("../environments/environment");
class GlobalMiddleware {
    static ShowErrors(req, res, next) {
        const result = (0, express_validator_1.validationResult)(req);
        const errors = result.array().map((e) => e.msg);
        if (errors.length > 0) {
            throw new ValidationErrors_1.ValidationErrors("ValidationErrors", 400, errors);
        }
        next();
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const token = (_a = req.signedCookies) === null || _a === void 0 ? void 0 : _a.token;
                if (!token)
                    throw new UnauthorizedError_1.UnauthorizedError("Unauthorized", 401);
                const privateKey = (_b = (0, environment_1.getEnvironmentVariables)().jwt_settings) === null || _b === void 0 ? void 0 : _b.jwtPrivateKey;
                req.user = yield (0, jsonwebtoken_1.verify)(token, privateKey);
                next();
            }
            catch (e) {
                next(e);
            }
        });
    }
    static authorized([...roles]) {
        return (req, res, next) => {
            var _a;
            if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
                throw new UnauthorizedError_1.UnauthorizedError("Unauthorized", 401);
            }
            next();
        };
    }
}
exports.GlobalMiddleware = GlobalMiddleware;
//# sourceMappingURL=GlobalMiddleware.js.map