import { compose } from "@tenon/shared";
import { CONSTANT } from "../constant";
import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import { bodyParser } from "../middlewares/bodyparser";
import { setupCors } from "../middlewares/cors";
import { setupSession } from "../middlewares/session";
import { setupStatic } from "../middlewares/static";
import { BaseModule } from "./baseModule";

export class ConnectionModule extends BaseModule {

  public init(app: tenonAppType) {
    super.init(app);
    this.initCors(app);
    this.initBodyParser(app);
    this.initSession(app);
    this.initStatic(app);
    app.$connection = this;
  }

  private initBodyParser(app: tenonAppType) {
    app.use(bodyParser(app.$config.bodyParser));
  }

  private initSession(app: tenonAppType) {
    const { $config } = app;
    const { session = {} } = $config;
    const SESS_CONF = Object.assign({}, CONSTANT.defaultSessionConfig, session);
    try {
      setupSession(app, SESS_CONF);
      compose(io.moduleStyle, io.log)("Session initd");
    } catch (err) {
      io.error("加载session失败", err);
    }
  }

  private initStatic(app: tenonAppType) {
    if (app.$config.static) {
      setupStatic(app, app.$config.static);
    }
  }

  private initCors(app: tenonAppType) {
    setupCors(app);
  }
}
