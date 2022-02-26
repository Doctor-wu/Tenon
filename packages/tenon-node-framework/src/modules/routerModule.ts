import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import { buildRoutes, routeListType, setupRouter } from "../middlewares/router";
import { BaseModule } from "./baseModule";

export class RouterModule extends BaseModule {
  public router!: Router<any, {}>;
  public routeList!: routeListType;

  public init(app: tenonAppType) {
    super.init(app);
    app.$router = this;
    [this.router, this.routeList] = setupRouter();
  }

  public buildRoutes() {
    buildRoutes(this.app);
  }
}
