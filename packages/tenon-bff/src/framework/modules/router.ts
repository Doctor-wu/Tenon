import Router from "koa-router";
import { tenonAppType } from "../core/app.interface";
import { buildRoutes, setupRouter } from "../middlewares/router";
import { BaseModule } from "./base";

export class RouterModule extends BaseModule {
  public router!: Router<any, {}>;

  public init(app: tenonAppType) {
    super.init(app);
    app.$router = this;
    this.router = setupRouter();
  }

  public buildRoutes() {
    buildRoutes(this.app);
  }
}
