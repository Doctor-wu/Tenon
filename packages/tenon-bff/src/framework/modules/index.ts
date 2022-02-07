import { tenonAppType } from "../core/app.interface";
import { AuthModule } from "./auth";
import { ConnectionModule } from "./connection";
import { LogModule } from "./logger";
import { RouterModule } from "./router";

const modules = [
  new AuthModule,
  new ConnectionModule,
  new LogModule,
  new RouterModule,
];

export const initModules = (app: tenonAppType) => {
  modules.forEach((module) => {
    module.init(app);
  });
}