"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const app = new server_1.Server().app;
app.listen(4000, () => console.log("App is listening to port 4000"));
//# sourceMappingURL=app.js.map