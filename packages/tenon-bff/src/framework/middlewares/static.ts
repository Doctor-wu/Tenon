import KoaStatic from "koa-static";
import { tenonAppType } from "../core";

export const setupStatic = (app:tenonAppType, config: any) => {
  const { path } = config;
  app.use(KoaStatic(path));
}