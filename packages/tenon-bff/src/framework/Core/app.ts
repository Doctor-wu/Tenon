import { IServerConfig, tenonAppType } from "./app.interface";
import Koa from "koa";
import { io } from "./io";
import { CONSTANT } from "../constant";
import { initModels } from "../models";
import { initModules } from "../modules";
import { initControllers } from "../controller";
import { initServices } from "../service/services";

export * from "./app.interface";

export const createServer = (config: IServerConfig) => {
  const { server } = config;
  const { port, name } = server;

  // app
  const koaApp = new Koa();
  const tenonApp: tenonAppType = Object.assign(koaApp, { $config: config });

  // models
  initModels(tenonApp);

  // modules
  initModules(tenonApp);

  // services
  initServices(tenonApp);

  // controllers
  initControllers(tenonApp);

  // listen
  tenonApp.listen(port, () => {
    io.log(`${name || CONSTANT.defaultServerName} is running at http://localhost:${port}`);
  });

  return tenonApp;
}