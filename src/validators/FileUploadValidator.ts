import { body } from "express-validator";
import { BadRequestError } from "../errors/BadRequestError";

export class FileUploadValidator {
  static uploadImageWithExpress() {
    return [
      body("image")
        .custom((val,{req}) => {
            if(!req.files?.image) {
                throw new BadRequestError("file not found",400)
            }
            return true
        })
    ];
  }
}