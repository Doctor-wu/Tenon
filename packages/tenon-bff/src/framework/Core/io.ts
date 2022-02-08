import { IBaseIO } from "./io.interface";
import chalk from "chalk";

const errorStyle = chalk.bold.red;
const warnStyle = chalk.hex('#FFA500');
const logStyle = chalk.hex('#cacaca');
const successStyle = chalk.hex('#33bb33');
class BaseIO implements IBaseIO {
  log = console.log;
  error = (...args: any[]) => this.log(this.errorStyle(...args));
  warn = (...args: any[]) => this.log(this.warnStyle(...args));

  logStyle = logStyle;
  warnStyle = warnStyle;
  errorStyle = errorStyle;
  successStyle = successStyle;
  bold = chalk.bold;
  hex = chalk.hex;
}

export const io = new BaseIO;