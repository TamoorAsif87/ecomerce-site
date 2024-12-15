"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
const Collection_1 = require("../models/Collection");
class CollectionController {
    static createCollection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield Collection_1.Collection.create(req.body);
                res.status(201).json({ id: collection._id });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCollection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collections = yield Collection_1.Collection.find({});
                res.status(200).json({ collections });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCollectionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield Collection_1.Collection.findById(req.params.id);
                if (!collection)
                    throw new NotFoundError_1.NotFoundError(`Collection with id ${req.params.id} not found`);
                res.status(200).json({ collection });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getCollectionByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield Collection_1.Collection.findOne({
                    collectionName: req.params.name,
                });
                if (!collection)
                    throw new NotFoundError_1.NotFoundError(`Collection with name ${req.params.name} not found`);
                res.status(200).json({ collection });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateCollection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield Collection_1.Collection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!collection)
                    throw new NotFoundError_1.NotFoundError(`Collection with id ${req.params.id} not found`);
                res.status(200).json({ collection });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deleteCollection(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield Collection_1.Collection.findByIdAndDelete(req.params.id);
                if (!collection)
                    throw new NotFoundError_1.NotFoundError(`Collection with name ${req.params.id} not found`);
                res.status(200).json({ msg: "deleted", deleted: true });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.CollectionController = CollectionController;
//# sourceMappingURL=CollectionController.js.map