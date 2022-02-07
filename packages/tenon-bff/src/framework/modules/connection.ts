import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./base";

export class ConnectionModule extends BaseModule {

  public init(app: tenonAppType) {
    super.init(app);
    app.$connection = this;
  }
}
