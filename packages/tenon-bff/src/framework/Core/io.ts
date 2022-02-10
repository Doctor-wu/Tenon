import { IBaseIO } from "./io.interface";
import chalk from "chalk";
import { compose } from "@tenon/shared";

const errorStyle = chalk.bold.red;
const warnStyle = chalk.hex('#FFA500');
const logStyle = chalk.hex('#cacaca');
const successStyle = chalk.hex('#33bb33');
class BaseIO implements IBaseIO {
  log = (...args: any[]) => {
    console.log(compose(this.logStyle, this.bold)('[Log]'), ...args);
  };
  error = (...args: any[]) => {
    console.log(compose(this.errorStyle, this.bold)('[Error]'), ...args);
  };
  warn = (...args: any[]) => {
    console.log(compose(this.warnStyle, this.bold)('[Warn]'), ...args);
  };

  logStyle = logStyle;
  warnStyle = warnStyle;
  errorStyle = errorStyle;
  successStyle = successStyle;
  bold = chalk.bold;
  hex = chalk.hex;
  chalk = chalk;
}

export const io = new BaseIO;