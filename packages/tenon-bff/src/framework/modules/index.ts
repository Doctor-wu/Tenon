import { tenonAppType } from "../core/app.interface";
import { AuthModule } from "./authModule";
import { ConnectionModule } from "./connectionModule";
import { LogModule } from "./loggerModule";
import { RouterModule } from "./routerModule";

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