import express from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { ReviewController } from "../controllers/ReviewController";
import { ReviewValidators } from "../validators/ReviewValidator";

class ReviewRouter {
  public router: express.Router = express.Router();

  constructor() {
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  private getRoutes() {
    this.router.route("").get(ReviewController.getReviews);
    this.router.route("/:id").get(ReviewController.getReviewById);
    this.router
      .route("/product/:id")
      .get(ReviewController.getAllProductReviews);
  }

  private postRoutes() {
    this.router
      .route("")
      .post(
        ReviewValidators.createReview(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        ReviewController.createReview
      );
  }
  private putRoutes() {}
  private patchRoutes() {
    this.router
      .route("/:id")
      .patch(
        ReviewValidators.createReview(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        ReviewController.updateReview
      );
  }
  private deleteRoutes() {
    this.router
      .route("/:id")
      .delete(GlobalMiddleware.authenticate, ReviewController.deleteReview);
  }
}

export default new ReviewRouter().router;
