import { tenonAppType } from "../core/app.interface";
import { useRouter } from "../middlewares/router";
import { IDecoratedControllerExtraFields } from "./controller.interface";

let router = useRouter();
let appInstance: tenonAppType;

export const initControllers = (app: tenonAppType) => {
  appInstance = app;
  const { controllers } = app.$config;
  app.$controllers = {};
  // 实例化Controllers
  controllers.forEach(Controller => {
    app.$controllers![Controller.name] = new Controller;
  });
}

export class BaseController implements IDecoratedControllerExtraFields {
  public app: tenonAppType;
  public prefixPath!: string;

  constructor() {
    this.app = appInstance;
  }
  response(data: any) {

  }
}