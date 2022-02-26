import { io } from "../core/io";
import mongoose, { Mongoose } from "mongoose";
import { IServerConfig } from "../core/app.interface";
import { CONSTANT } from "../constant";

export const establishDBConnection = (config: IServerConfig): Promise<Mongoose> => {
  return new Promise((resolve, reject) => {
    if (!config.mongodb) return reject('lack mongodb config');
    const DB_ADDRESS = CONSTANT.defaultServerAddress;
    mongoose.connect(config.mongodb.address || DB_ADDRESS, {
      user: config.mongodb.username,
      pass: config.mongodb.password,
    }, err => {
      if (err) {
        io.error(JSON.stringify({ msg: '[Mongoose] database connect failed!', err }));
        reject(err);
      } else {
        io.log(
          io.bold.white.bgHex('#494')('[Mongoose] database connect success!')
        );
        resolve(mongoose);
      }
    });
  });
}

