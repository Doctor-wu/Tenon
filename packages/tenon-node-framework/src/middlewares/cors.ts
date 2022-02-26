import cors from "@koa/cors";
import { CONSTANT } from "../constant";
import { tenonAppType } from "../core";

export const setupCors = (app: tenonAppType) => {
  app.use(cors(CONSTANT.defaultCorsConfig));
};
