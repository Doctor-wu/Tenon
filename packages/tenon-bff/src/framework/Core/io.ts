import { IBaseIO } from "./io.interface";

class BaseIO implements IBaseIO{
  log = console.log;
  warn = console.warn;
  error = console.error;
}

export const io = new BaseIO;