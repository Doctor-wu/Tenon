import { BaseConfig } from "../config/base";
import { TenonEditor } from "./core/editor";

declare global {
  interface Window {
    AppConfig: BaseConfig;
    editor: TenonEditor;
  }
}
