import Koa from "koa";
import { Mongoose } from "mongoose";
import { BaseController } from "../controller";
import { AuthModule } from "../modules/authModule";
import { ConnectionModule } from "../modules/connectionModule";
import { LogModule } from "../modules/loggerModule";
import { RouterModule } from "../modules/routerModule";
import { BaseService } from "../service";
export interface IServerConfig {
  server: {
    port: number;
    name?: string;
  },
  mongodb: {
    address?: string;
    username: string;
    password: string;
  },
  controllers: { new(...args: any[]): BaseController }[],
  services: { new(...args: any[]): BaseService }[],
}

export type tenonAppType = Koa<Koa.DefaultState, Koa.DefaultContext> & {
  $config: IServerConfig;
  $router?: RouterModule;
  $logger?: LogModule;
  $auth?: AuthModule;
  $connection?: ConnectionModule;
  $controllers?: { [prop: string]: BaseController }
  $services?: { [prop: string]: BaseService }
  $mongoose?: Mongoose;
}

export type RequestContext = Koa.Context;
export type Next = Koa.Next;