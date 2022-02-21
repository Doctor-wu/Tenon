import { IBaseIO } from "./io.interface";
import chalk from "chalk";
import { compose, Subscribe } from "@tenon/shared";

const errorStyle = chalk.bold.red;
const warnStyle = chalk.hex('#FFA500');
const logStyle = chalk.hex('#cacaca');
const successStyle = chalk.hex('#33bb33');
class BaseIO extends Subscribe implements IBaseIO {
  log = (...args: any[]) => {
    const msg = [compose(this.logStyle, this.bold)('[Log]', new Date().toLocaleString()), ...args];
    console.log(...msg);
    this.emit("afterLog", '[Log]', new Date().toLocaleString(), ...args.map(this.reset));
  };
  error = (...args: any[]) => {
    const msg = [compose(this.errorStyle, this.bold)('[Error]'), ...args.map(this.reset)];
    console.log(...msg);
    this.emit("afterError", ...msg);
  };
  warn = (...args: any[]) => {
    const msg = [compose(this.warnStyle, this.bold)('[Warn]'), ...args.map(this.reset)];
    console.log(...msg);
    this.emit("afterWarn", ...msg);
  };

  logStyle = logStyle;
  warnStyle = warnStyle;
  errorStyle = errorStyle;
  successStyle = successStyle;
  bold = chalk.bold;
  moduleStyle = this.bold.hex("#39f");
  hex = chalk.hex;
  chalk = chalk;

  reset(msg: any) {
    if (!(typeof msg === "string")) {
      msg = msg.toString();
    }
    return msg.replace(ansiRegex(), '');
  }

}

function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
  ].join('|');

  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

export const io = new BaseIO;