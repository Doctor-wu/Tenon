import Koa from "koa";
import { Mongoose } from "mongoose";
import { BaseController } from "../controller";
import { ConnectionModule } from "../modules/connectionModule";
import { LogModule } from "../modules/loggerModule";
import { RouterModule } from "../modules/routerModule";
import { BaseService } from "../service";
export interface IServerConfig {
  /** server基础设置 */
  server: {
    /** 端口号 */
    port: number;
    /** 应用名称 */
    name?: string;
  },
  /** mongodb设置 */
  mongodb?: {
    /** 连接地址 */
    address?: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  },
  /** 控制器 */
  controllers?: { new(...args: any[]): BaseController }[],
  /** 服务 */
  services?: { new(...args: any[]): BaseService }[],
  /** session相关设置 */
  session?: {
    /** cookie键名 */
    key?: string;
    /** cookie有效期 */
    maxAge?: number;
    /** cookie 仅服务器修改 */
    httpOnly?: boolean;
    /** 签名cookie */
    signed?: boolean;
    /** cookie快过期时自动重新设置*/
    renew?: boolean;
  }
}

export type tenonAppType = Koa<Koa.DefaultState, Koa.DefaultContext> & {
  $config: IServerConfig;
  $router?: RouterModule;
  $logger?: LogModule;
  $connection?: ConnectionModule;
  $controllers?: { [prop: string]: BaseController }
  $services?: { [prop: string]: BaseService }
  $mongoose?: Mongoose;
}

export type RequestContext = Koa.Context;
export type Next = Koa.Next;