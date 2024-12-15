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
exports.UserController = void 0;
const User_1 = require("../models/User");
const NotFoundError_1 = require("../errors/NotFoundError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Utils_1 = require("../utils/Utils");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.role = (yield User_1.User.countDocuments()) > 0 ? "user" : "admin";
                const user = yield new User_1.User(req.body).save();
                res.status(201).json({ user });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email: req.body.email });
                if (!user)
                    throw new NotFoundError_1.NotFoundError(`User with email ${req.body.email} not found.`);
                const isPasswordCorrect = yield user.passwordCompare(req.body.password);
                if (!isPasswordCorrect)
                    throw new UnauthorizedError_1.UnauthorizedError("Password is incorrect.");
                Utils_1.Utils.attachedCookies({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }, res);
                res.status(200).json({ user });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static logout(req, res) {
        res.cookie("token", "logout", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.status(200).json({ success: true });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map