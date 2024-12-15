import express from "express";
import { OrderController } from "../controllers/OrderController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { OrderValidators } from "../validators/OrderValidator";

class OrderRouter {
  public router: express.Router = express.Router();

  constructor() {
    // this.getRoutes();
    this.postRoutes();
    // this.patchRoutes();
    // this.putRoutes();
    // this.deleteRoutes();
  }

  //   private getRoutes() {
  //     this.router.route("").get(ProductCollectionController.getProductCollection);
  //     this.router
  //       .route("/:id")
  //       .get(ProductCollectionController.getProductCollectionById);
  //     this.router
  //       .route("/name/:name")
  //       .get(ProductCollectionController.getProductCollectionByName);
  //   }

  private postRoutes() {
    this.router
      .route("")
      .post(
        OrderValidators.orderCreation(),
        OrderValidators.orderCreation(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        OrderController.createOrder
      );
  }
  //   private putRoutes() {}
  //   private patchRoutes() {
  //     this.router
  //       .route("/:id")
  //       .patch(
  //         ProductCollectionValidators.postCollection(),
  //         GlobalMiddleware.ShowErrors,
  //         GlobalMiddleware.authenticate,
  //         GlobalMiddleware.authorized(["admin"]),
  //         ProductCollectionController.updateProductCollection
  //       );
  //   }
  //   private deleteRoutes() {
  //     this.router
  //       .route("/:id")
  //       .delete(
  //         GlobalMiddleware.authenticate,
  //         GlobalMiddleware.authorized(["admin"]),
  //         ProductCollectionController.deleteProductCollection
  //       );
  //   }
}

export default new OrderRouter().router;
