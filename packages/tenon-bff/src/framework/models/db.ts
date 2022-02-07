import { io } from "../core/io";
import mongoose from "mongoose";
import { IServerConfig } from "../core/app.interface";

export const establishDBConnection = (config: IServerConfig) => {
  // db是数据库名称哦，没有的话会自动创建
  const DB_ADDRESS = "mongodb://localhost:27017/"
  mongoose.connect(config.db.address || DB_ADDRESS, {
    user: config.db.username,
    pass: config.db.password,
  }, err => {
    if (err) {
      io.error({ msg: '[Mongoose] database connect failed!', err })
    } else {
      io.log('[Mongoose] database connect success!')
    }
  });
  return mongoose;
}

