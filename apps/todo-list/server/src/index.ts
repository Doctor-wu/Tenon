import path from "path";
import { createServer } from "@tenon/node-framework";
import { AuthController } from "./controller";
import { UserService } from "./service";

const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 4897,
    },
    mongodb: {
      username: 'doctorwu-todo',
      password: '123456',
      address: 'mongodb://localhost:27017/todo',
    },
    controllers: [
      AuthController,
    ],
    services: [
      UserService,
    ],
    static: {
      path: path.resolve(__dirname, "../static"),
    },
    session: {
      key: 'tenon:todo:ssid',
      sameSite: true,
      maxAge: 60 * 1000,
      renew: false,
    },
    logger: {
      path: path.resolve(__dirname, "../log"),
    },
    bodyParser: {
      jsonLimit: '20mb'
    }
  });

  server.start();
}


bootstrap();
