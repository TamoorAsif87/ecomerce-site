"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CollectionController_1 = require("../controllers/CollectionController");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const CollectionValidators_1 = require("../validators/CollectionValidators");
class CollectionRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.route("").get(CollectionController_1.CollectionController.getCollection);
        this.router.route("/:id").get(CollectionController_1.CollectionController.getCollectionById);
        this.router
            .route("/name/:name")
            .get(CollectionController_1.CollectionController.getCollectionByName);
    }
    postRoutes() {
        this.router
            .route("")
            .post(CollectionValidators_1.CollectionValidators.postCollection(), GlobalMiddleware_1.GlobalMiddleware.ShowErrors, GlobalMiddleware_1.GlobalMiddleware.authenticate, GlobalMiddleware_1.GlobalMiddleware.authorized("admin"), CollectionController_1.CollectionController.createCollection);
    }
    putRoutes() { }
    patchRoutes() {
        this.router
            .route("/:id")
            .patch(CollectionValidators_1.CollectionValidators.postCollection(), GlobalMiddleware_1.GlobalMiddleware.ShowErrors, GlobalMiddleware_1.GlobalMiddleware.authenticate, GlobalMiddleware_1.GlobalMiddleware.authorized("admin"), CollectionController_1.CollectionController.updateCollection);
    }
    deleteRoutes() {
        this.router
            .route("/:id")
            .delete(GlobalMiddleware_1.GlobalMiddleware.authenticate, GlobalMiddleware_1.GlobalMiddleware.authorized("admin"), CollectionController_1.CollectionController.deleteCollection);
    }
}
exports.default = new CollectionRouter().router;
//# sourceMappingURL=CollectionRouter.js.map