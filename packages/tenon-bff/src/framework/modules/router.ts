import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";
import { buildRoutes, routeListType, setupRouter } from "../middlewares/router";
import { BaseModule } from "./base";

export class RouterModule extends BaseModule {
  public router!: Router<any, {}>;
  public routeList!: routeListType;

  public init(app: tenonAppType) {
    super.init(app);
    app.$router = this;
    [this.router, this.routeList]  = setupRouter();
  }

  public buildRoutes() {
    buildRoutes(this.app);
  }
}
