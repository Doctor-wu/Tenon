import Koa from "koa";
import { BaseController } from "../controller";
import { AuthModule } from "../modules/authModule";
import { ConnectionModule } from "../modules/connectionModule";
import { LogModule } from "../modules/loggerModule";
import { RouterModule } from "../modules/routerModule";
export interface IServerConfig {
  server: {
    port: number;
    name?: string;
  },
  db: {
    address?: string;
    username: string;
    password: string;
  },
  controllers: { new(...args: any[]): BaseController }[]
}

export type tenonAppType = Koa<Koa.DefaultState, Koa.DefaultContext> & {
  $config: IServerConfig;
  $router?: RouterModule;
  $logger?: LogModule;
  $auth?: AuthModule;
  $connection?: ConnectionModule;
  $controllers?: { [prop: string]: BaseController }
}

export type RequestContext = Koa.Context;
export type Next = Koa.Next;