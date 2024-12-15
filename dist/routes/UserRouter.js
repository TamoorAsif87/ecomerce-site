"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const UserValidators_1 = require("../validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/logout", UserController_1.UserController.logout);
    }
    postRoutes() {
        this.router
            .route("/register")
            .post(UserValidators_1.UserValidators.register(), GlobalMiddleware_1.GlobalMiddleware.ShowErrors, UserController_1.UserController.register);
        this.router
            .route("/login")
            .post(UserValidators_1.UserValidators.login(), GlobalMiddleware_1.GlobalMiddleware.ShowErrors, UserController_1.UserController.login);
    }
    putRoutes() { }
    patchRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map