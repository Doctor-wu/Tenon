import { tenonAppType } from "../core/app.interface";
import { BaseModule } from "./baseModule";
import { assertDir, assertFile } from "@tenon/shared";
import pathUtil from "path";
import fs from "fs";
import { io } from "../core";
export class LogModule extends BaseModule {

  private logQueue = new TaskQueue;
  private warnQueue = new TaskQueue;
  private errorQueue = new TaskQueue;

  public init(app: tenonAppType) {
    super.init(app);
    app.$logger = this;
    if (app.$config.logger) {
      this.setupLogger();
    }
  }

  private setupLogger() {
    const {
      path,
    } = this.app.$config.logger!;
    assertDir(path);
    this.initIOObserver(path);
  }

  private initIOObserver(loggerPath: string) {
    const logPath = pathUtil.join(loggerPath, "/log");
    const warnPath = pathUtil.join(loggerPath, "/warn");
    const errorPath = pathUtil.join(loggerPath, "/error");
    assertDir(logPath);
    assertDir(warnPath);
    assertDir(errorPath);
    const now = new Date(Date.now());
    const fileName = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.log`;
    io.on("afterLog", (...msg: string[]) => {
      this.logQueue.addTask(
        this.createTask(pathUtil.join(logPath, fileName), msg)
      );
    });
    io.on("afterWarn", (...msg: string[]) => {
      this.warnQueue.addTask(
        this.createTask(pathUtil.join(warnPath, fileName), msg)
      );
    });
    io.on("afterError", (...msg: string[]) => {
      this.errorQueue.addTask(
        this.createTask(pathUtil.join(errorPath, fileName), msg)
      );
    });
  }

  createTask(filePath: string, msg: string[]) {
    return () => {
      return new Promise((resolve) => {
        assertFile(filePath);
        fs.appendFile(filePath, msg.join(" ") + "\n", (error) => {
          if (error) console.error(error);
          resolve(true);
        });
      });
    }
  }
}

class TaskQueue {
  tasks: ((...args: any[]) => Promise<any>)[] = [];
  running: boolean = false;

  addTask(task: (...args: any[]) => Promise<any>) {
    this.tasks.push(task);
    if (!this.running) this.run();
  }

  run() {
    const task = this.tasks.shift();
    if (!task) {
      this.running = false;
      return;
    }
    this.running = true;
    task.call(null).finally(() => {
      this.run();
    });
  }
}
