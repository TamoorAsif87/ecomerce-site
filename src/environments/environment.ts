import { enivronmentVariablesDev } from "./enviroment.dev";
import { enivronmentVariablesProd } from "./enviroment.prod";



export interface IEnvironment {
  mongo_url?: string;
  jwt_settings?: { jwtPrivateKey: string; expiresAt: string };
}

export const getEnvironmentVariables = () => {
  if (process.env.NODE_ENV == "production") {
    return enivronmentVariablesProd;
  }
  return enivronmentVariablesDev;
};
