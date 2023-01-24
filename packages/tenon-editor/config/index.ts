import { BaseConfig, BuildMode } from "./base";
import { DevConfig } from "./dev";
import { LocalConfig } from "./local";
import { ProdConfig } from "./prod";

const Mode: BuildMode = process.env.MODE as BuildMode;
let exportConfig: BaseConfig;
switch (Mode) {
  case 'dev':
    exportConfig = new DevConfig();
    break;
  case 'prod':
    exportConfig = new ProdConfig();
    break;
  case 'local':
    exportConfig = new LocalConfig();
    break;
}

export default exportConfig;
