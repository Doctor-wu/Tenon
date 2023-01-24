import { BaseConfig } from "./base";

export class LocalConfig extends BaseConfig {
  mode = 'local' as const;
}
