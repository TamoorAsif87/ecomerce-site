import express from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";
import { FileUploadValidator } from "../validators/FileUploadValidator";
import { FileUploads } from "../controllers/FileUploads";


class FileUploadRouter {
  public router: express.Router = express.Router();

  constructor() {
   
    this.postRoutes();
    
  }

 
  private postRoutes() {
    this.router.route("/image").post(
        FileUploadValidator.uploadImageWithExpress(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        FileUploads.ImageUploadWithExpressFileUpload
    )
     this.router.route("/cloudinary/image").post(
        FileUploadValidator.uploadImageWithExpress(),
        GlobalMiddleware.ShowErrors,
        GlobalMiddleware.authenticate,
        FileUploads.ImageUploadCloudinary
    )  
  }
 
}

export default new FileUploadRouter().router;
