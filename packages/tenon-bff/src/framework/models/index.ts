import { tenonAppType } from "../core/app.interface";
import { establishDBConnection } from "./db";

export const initModels = async (app: tenonAppType) => {
  const config = app.$config;
  const mongoose = await establishDBConnection(config);
  app.$mongoose = mongoose;
}