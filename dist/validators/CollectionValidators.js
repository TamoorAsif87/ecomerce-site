"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionValidators = void 0;
const express_validator_1 = require("express-validator");
class CollectionValidators {
    static postCollection() {
        return [
            (0, express_validator_1.body)("collectionName", "Name is required.")
                .notEmpty()
                .withMessage("Collection Name can not be empty.")
                .isLength({ min: 2, max: 50 })
                .withMessage("Characters must be between 2 to 50"),
        ];
    }
}
exports.CollectionValidators = CollectionValidators;
//# sourceMappingURL=CollectionValidators.js.map