"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    collectionName: { type: String, required: true, trim: true },
    collectionBanner: { type: String },
}, {
    timestamps: true,
});
exports.Collection = (0, mongoose_1.model)("Collection", schema);
//# sourceMappingURL=Collection.js.map