import { BaseConfig } from "./base";

export class ProdConfig extends BaseConfig {
  mode = 'prod' as const;
}