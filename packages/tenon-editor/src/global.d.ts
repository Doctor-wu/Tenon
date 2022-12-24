import { BaseConfig } from "../config/base";

declare global {
  interface Window {
    AppConfig: BaseConfig;
  }
}
