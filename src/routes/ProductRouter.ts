import express from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { ProductsController } from "../controllers/ProductsController";
import { ProductValidator } from "../validators/ProductValidators";

class ProductRouter {
  public router: express.Router = express.Router();

  constructor() {
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  private getRoutes() {
    this.router.route("").get(ProductsController.getProducts);
    this.router.route("/:id").get(ProductsController.getProductById);
    this.router.route("/name/:name").get(ProductsController.getProductByName);
  }

  private postRoutes() {
    this.router
      .route("")
      .post(
        ProductValidator.CreateProduct(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductsController.createProduct
      );
  }
  private putRoutes() {}
  private patchRoutes() {
    this.router
      .route("/:id")
      .patch(
        ProductValidator.CreateProduct(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductsController.updateProduct
      );
  }
  private deleteRoutes() {
    this.router
      .route("/:id")
      .delete(
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ProductsController.deleteProduct
      );
  }
}

export default new ProductRouter().router;
