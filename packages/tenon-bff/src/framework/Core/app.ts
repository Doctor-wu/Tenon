import { IServerConfig } from "./app.interface";
import Koa from "koa";
import { io } from "./io";
import { CONSTANT } from "../constant";

export const createServer = (config: IServerConfig) => {
  const { server } = config;
  const { port, name, options } = server;
  // app
  const app = new Koa(options);

  // listen
  app.listen(port, () => { 
    io.log(`${name || CONSTANT.defaultServerName} is running at ${port}`);
  });
  return app;
}