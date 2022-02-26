import fs from "fs";
import path from "path";
import koaSession from "koa-session";
import { io } from "../core/io";
import { compose } from "@tenon/shared";

export const setupSession = (app, config) => {
  try {
    const secret = fs.readFileSync(path.resolve(__dirname, "../utils/secret.json"));
    compose(io.successStyle, io.bold, io.log)("读取密钥成功");
    app.keys = JSON.parse(secret.toString());
    app.use(koaSession(config, app));
  } catch (err) {
    io.error("加载session失败", err);
  }
}