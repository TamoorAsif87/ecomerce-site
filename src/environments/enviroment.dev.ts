import { IEnvironment } from "./environment";
import {config} from "dotenv";
config()

export const enivronmentVariablesDev: IEnvironment = {
  mongo_url: process.env.MONGO_URL,
  jwt_settings: {
    jwtPrivateKey: "JWT90000/.;';LKSKADSAD",
    expiresAt: "1d",
  },
};
