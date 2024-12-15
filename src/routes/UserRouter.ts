import express from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { UserValidators } from "../validators/UserValidators";

class UserRouter {
  public router: express.Router = express.Router();

  constructor() {
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  private getRoutes() {
    this.router.get(
      "/logout",
      GlobalMiddleware.authenticate,
      UserController.logout
    );
    this.router.get(
      "/current",
      GlobalMiddleware.authenticate,
      UserController.currentUser
    );

    this.router.get(
      "/users/all",
      GlobalMiddleware.authenticate,
      GlobalMiddleware.authorized(["admin"]),
      UserController.allUsers
    );

     this.router.get(
      "/user/:id",
      UserValidators.UserIdFromQuery(),
      GlobalMiddleware.ShowErrors,
      GlobalMiddleware.authenticate,
      GlobalMiddleware.authorized(["admin"]),
      UserController.getUser
    );

    this.router.get(
      "/profiles/all",
      GlobalMiddleware.authenticate,
      GlobalMiddleware.authorized(["admin"]),
      UserController.allProfiles
    );

    this.router.get(
      "/profile",
      GlobalMiddleware.authenticate,
      UserController.getProfile
    );
  }

  private postRoutes() {
    this.router
      .route("/register")
      .post(
        UserValidators.register(),
        GlobalMiddleware.ShowErrors,
        UserController.register
      );

    this.router
      .route("/login")
      .post(
        UserValidators.login(),
        GlobalMiddleware.ShowErrors,
        UserController.login
      );

      this.router
      .route("/user/password-update")
      .post(
        UserValidators.updatePassword(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        UserController.updatePassword
      );
  }
  private putRoutes() {}
  private patchRoutes() {
    this.router.route("/profile/update").patch(
      UserValidators.updateProfile(),
      GlobalMiddleware.ShowErrors,
      GlobalMiddleware.authenticate,
      UserController.updateProfile
    )
  }
  private deleteRoutes() {
    this.router
      .route("/user/delete/:id")
      .delete(
        UserValidators.UserIdFromQuery(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        GlobalMiddleware.authorized(["admin"]),
        UserController.deleteUser
      );
  }

  
}




export default new UserRouter().router;
