import { RootController, AuthController } from "./controllers";
import { createServer } from "./framework/core/app";
import { UserService } from "./services/user";
import path from "path";

const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 8888,
    },
    mongodb: {
      username: 'doctorwu',
      password: '123456',
      address: 'mongodb://localhost:27017/tenon',
    },
    controllers: [
      RootController,
      AuthController,
    ],
    services: [
      UserService,
    ],
    static: {
      path: path.resolve(__dirname, "./static"),
    }
  });

  server.start();
}


bootstrap();