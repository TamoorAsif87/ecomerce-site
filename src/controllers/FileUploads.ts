import { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { BadRequestError } from "../errors/BadRequestError";
import cloudinary from "cloudinary";
import {unlinkSync} from "fs";


export class FileUploads{
    static async ImageUploadWithExpressFileUpload(req:Request,res:Response,next:NextFunction){
        try{
            const img = req.files?.image as fileUpload.UploadedFile
            
            if(!img.mimetype.startsWith("image")) {
                throw new BadRequestError("Please upload image",400)
            }

            const imagePath =  path.join(__dirname, `../public/uploads/${img.name}`)



            await img.mv(imagePath)

            res.status(200).json({path:`/uploads/${img.name}`})
        }
        catch(e){
            next(e)
        }
    }

    static async ImageUploadCloudinary(req:Request,res:Response,next:NextFunction){
        try{
            
            const img = req.files?.image as fileUpload.UploadedFile
            const imgUrl = await cloudinary.v2.uploader.upload(img.tempFilePath,{
                use_filename:true,
                folder:"product"
            })

            unlinkSync(img.tempFilePath)
            res.status(200).json({path:imgUrl.secure_url})
        }
        catch(e){
            next(e)
        }
    }
}