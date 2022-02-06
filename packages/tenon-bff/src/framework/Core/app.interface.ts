import Koa from "koa";

export interface IServerConfig {
  server: {
    port: number;
    name?: string;
  }
}