import { tenonAppType } from "../core/app.interface";

export class BaseModule {
  public app!: tenonAppType;
  
  public init(app: tenonAppType) {
    this.app = app;
  };
}