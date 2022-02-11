import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";

export type requestMethod = 'get' | 'post' | 'put' | 'delete' | 'options';
interface IRouteOptions {
  path: string;
  cb: Router.IMiddleware;
  handlerDesc: string;
}

let router: Router;


export type routeListType = [requestMethod, string, string][];
const routeList: routeListType = [];

export const setupRouter: () => [Router<any, {}>, routeListType] = () => {
  router = new Router;
  return [router, routeList];
}

export const buildRoutes = (app: tenonAppType) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

export const addRoute = (
  requestMethod: requestMethod,
  routeOptions: IRouteOptions,
) => {
  const { path, cb, handlerDesc } = routeOptions;
  
  router[requestMethod](path, cb);
  routeList.push([requestMethod, handlerDesc, path]);
}

// export const useRouter = () => router;