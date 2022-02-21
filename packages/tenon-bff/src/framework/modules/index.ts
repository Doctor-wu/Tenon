import { tenonAppType } from "../core/app.interface";
import { ConnectionModule } from "./connectionModule";
import { LogModule } from "./loggerModule";
import { RouterModule } from "./routerModule";

const modules = [
  new LogModule,
  new ConnectionModule,
  new RouterModule,
];

export const initModules = (app: tenonAppType) => {
  modules.forEach((module) => {
    module.init(app);
  });
}