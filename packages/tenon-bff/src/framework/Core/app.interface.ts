import Koa from "koa";
import { BaseController } from "../controller";
import { AuthModule } from "../modules/auth";
import { ConnectionModule } from "../modules/connection";
import { LogModule } from "../modules/logger";
import { RouterModule } from "../modules/router";
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