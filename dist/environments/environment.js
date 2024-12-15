"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
const enviroment_dev_1 = require("./enviroment.dev");
const enviroment_prod_1 = require("./enviroment.prod");
const getEnvironmentVariables = () => {
    if (process.env.NODE_ENV == "production") {
        return enviroment_prod_1.enivronmentVariablesProd;
    }
    return enviroment_dev_1.enivronmentVariablesDev;
};
exports.getEnvironmentVariables = getEnvironmentVariables;
//# sourceMappingURL=environment.js.map