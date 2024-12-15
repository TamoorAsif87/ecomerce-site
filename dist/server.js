"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const environment_1 = require("./environments/environment");
const CollectionRouter_1 = __importDefault(require("./routes/CollectionRouter"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
class Server {
    constructor() {
        var _a;
        this.connectionString = (0, environment_1.getEnvironmentVariables)().mongo_url;
        this.jwt_secret = (_a = (0, environment_1.getEnvironmentVariables)().jwt_settings) === null || _a === void 0 ? void 0 : _a.jwtPrivateKey;
        this.app = (0, express_1.default)();
        this.setConfigs();
        this.setRoutes();
        this.notFound404();
        this.errorHandler();
    }
    setConfigs() {
        this.setJson();
        this.setDbConnect();
        this.setMorgan();
        this.app.use((0, cookie_parser_1.default)(this.jwt_secret));
    }
    setDbConnect() {
        mongoose_1.default
            .connect(this.connectionString, { family: 4 })
            .then((res) => console.log("Connected"))
            .catch((err) => console.log(err));
    }
    setMorgan() {
        this.app.use((0, morgan_1.default)("dev"));
    }
    setJson() {
        this.app.use(express_1.default.json());
    }
    setRoutes() {
        this.app.use("/api/v1/collection/", CollectionRouter_1.default);
        this.app.use("/api/v1/account/", UserRouter_1.default);
    }
    notFound404() {
        this.app.use((req, res) => {
            res.status(404).json({ msg: "Route Not Found" });
        });
    }
    errorHandler() {
        this.app.use((err, req, res, next) => {
            var _a;
            let message = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong";
            let status = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
            if (((_a = err === null || err === void 0 ? void 0 : err.validationErrors) === null || _a === void 0 ? void 0 : _a.length) != 0) {
                res
                    .status(status)
                    .json({ msg: message, errors: err === null || err === void 0 ? void 0 : err.validationErrors });
            }
            res.status(status).json({ msg: message });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map