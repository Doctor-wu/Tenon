import { RootController, AuthController, TenonComponentController } from "./controllers";
import { createServer } from "./framework/core/app";
import { UserService } from "./services/user";
import path from "path";

const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 9999,
    },
    mongodb: {
      username: 'doctorwu',
      password: '123456',
      address: 'mongodb://localhost:27017/tenon',
    },
    controllers: [
      RootController,
      AuthController,
      TenonComponentController,
    ],
    services: [
      UserService,
    ],
    static: {
      path: path.resolve(__dirname, "./static"),
    },
    logger: {
      path: path.resolve(__dirname, "./logFiles"),
    }
  });

  server.start();
}


bootstrap();