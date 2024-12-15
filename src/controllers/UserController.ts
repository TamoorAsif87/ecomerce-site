import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/User";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Utils } from "../utils/Utils";
import mongoose, { Types } from "mongoose";
import { Profile } from "../models/Profile";
import { BadRequestError } from "../errors/BadRequestError";

export class UserController {
  static async register(
    req: Request<{}, {}, IUser>,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.body.role = (await User.countDocuments()) > 0 ? "user" : "admin";

      const user = await new User(req.body).save();
      res.status(201).json({ user });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        throw new NotFoundError(`User with email ${req.body.email} not found.`);

      const isPasswordCorrect = await user.passwordCompare(req.body.password);

      if (!isPasswordCorrect)
        throw new UnauthorizedError("Password is incorrect.");

      Utils.attachedCookies(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        res
      );

      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  static logout(req: Request, res: Response, next: NextFunction) {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({ success: true });
  }

  static currentUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ user: req.user });
  }

  static async allUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (e) {
      next(e);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true }
      );

      if (!profile) throw new NotFoundError("Profile not Found with Id", 404);

      if (req.body.name) {
        await User.findByIdAndUpdate(
          req.user._id,
          { name: req.body.name },
          { new: true }
        );
      }

      res.status(200).json({ profile });
    } catch (e) {
      next(e);
    }
  }

  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ _id: req.user._id });

      if (!user) throw new NotFoundError("Profile not Found with Id", 404);

      const isMatch = await user.passwordCompare(req.body.oldPassword);

      if (!isMatch)
        throw new BadRequestError("Your old password is wrong.", 400);

      user.password = req.body.newPassword;
      await user.save();

      res.status(200).json({ updated: true });
    } catch (e) {
      next(e);
    }
  }

  static async getUser(
    req: Request<{ id?: Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        throw new NotFoundError(
          "User not Found with Id =" + req.params.id,
          404
        );

      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  static async deleteUser(
    req: Request<{ id?: mongoose.Schema.Types.ObjectId }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        throw new NotFoundError(
          "User not Found with Id =" + req.params.id,
          404
        );

      await User.deleteOne({ _id: user._id });

      if (req.user._id == req.params.id) {
        res.cookie("token", "logout", {
          httpOnly: true,
          expires: new Date(Date.now()),
        });
      }

      res.status(200).json({ deleted: true });
    } catch (e) {
      next(e);
    }
  }

  static async allProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const profiles = await Profile.find({}).populate({
        path: "user",
        select: "name email",
      });

      res.status(200).json({ profiles });
    } catch (e) {
      next(e);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = await Profile.findOne({ user: req.user._id }).populate({
        path: "user",
        select: "-_id name email",
      });
      res.status(200).json({ profile });
    } catch (e) {
      next(e);
    }
  }
}
