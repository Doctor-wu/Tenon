import { BaseConfig } from "./base";
import { DevConfig } from "./dev";
import { ProdConfig } from "./prod";

const Mode = process.env.MODE;
let exportConfig: BaseConfig;
if (Mode === 'dev') {
  exportConfig = new DevConfig();
} else {
  exportConfig = new ProdConfig();
};

export default exportConfig;