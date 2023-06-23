import { BaseConfig } from "./base";

export class DevConfig extends BaseConfig {
  mode = 'dev' as const;
}
