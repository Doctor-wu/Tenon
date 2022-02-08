import { tenonAppType } from "../core/app.interface";
import { bodyParser } from "../middlewares/bodyparser";
import { BaseModule } from "./baseModule";

export class ConnectionModule extends BaseModule {

  public init(app: tenonAppType) {
    super.init(app);
    app.use(bodyParser());
    app.$connection = this;
  }
}
