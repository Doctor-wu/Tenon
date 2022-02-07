import { tenonAppType } from "../core/app.interface";
import { establishDBConnection } from "./db";

export const initModels = (app: tenonAppType) => {
  const config = app.$config;
  establishDBConnection(config);
}