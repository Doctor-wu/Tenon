import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./baseModule";

export class LogModule extends BaseModule {

  public init(app: tenonAppType) {
    super.init(app);
    app.$logger = this;
  }
}
