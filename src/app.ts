import { Server } from "./server";

const app = new Server().app;

app.listen(4000, () => console.log("App is listening to port 4000"));
