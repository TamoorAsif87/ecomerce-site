import express from "express";
import { ProductCollectionController } from "../controllers/ProductCollectionController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { ProductCollectionValidators } from "../validators/ProductCollectionValidators";

class CollectionRouter {
  public router: express.Router = express.Router();

  constructor() {
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  private getRoutes() {
    this.router.route("").get(ProductCollectionController.getProductCollection);
    this.router
      .route("/:id")
      .get(ProductCollectionController.getProductCollectionById);
    this.router
      .route("/name/:name")
      .get(ProductCollectionController.getProductCollectionByName);
  }

  private postRoutes() {
    this.router
      .route("")
      .post(
        ProductCollectionValidators.postCollection(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductCollectionController.createProductCollection
      );
  }
  private putRoutes() {}
  private patchRoutes() {
    this.router
      .route("/:id")
      .patch(
        ProductCollectionValidators.postCollection(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductCollectionController.updateProductCollection
      );
  }
  private deleteRoutes() {
    this.router
      .route("/:id")
      .delete(
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductCollectionController.deleteProductCollection
      );
  }
}

export default new CollectionRouter().router;
