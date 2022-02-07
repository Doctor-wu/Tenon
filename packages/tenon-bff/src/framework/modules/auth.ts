import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./base";

export class AuthModule extends BaseModule {

  public init(app: tenonAppType) {
    super.init(app);
    app.$auth = this;
  }
}
