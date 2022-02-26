import { createServer } from "@tenon/node-framework";
import { RootController, AuthController, TenonComponentController } from "./controllers";
import { UserService } from "./services/user";
import path from "path";
import { setPhase, PhaseName } from "@tenon/flow";
import { createClient } from "../scripts/client";

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
  server.once('launched', () => {
    setPhase(createClient(), PhaseName.RUN_CMS);
  });
}


bootstrap();
