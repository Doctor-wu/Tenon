import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";

type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
interface IRouteOptions {
  path: string;
  cb: Router.IMiddleware
}

let router: Router;

export const setupRouter = () => {
  router = new Router;
  return router;
}

export const buildRoutes = (app: tenonAppType) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

export const addRoute = (requestMethod: requestMethod, routeOptions: IRouteOptions) => {
  const { path, cb } = routeOptions;
  router[requestMethod](path, cb);
}

export const useRouter = () => router;