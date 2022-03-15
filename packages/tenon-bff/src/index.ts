import path from "path";
import { setPhase, PhaseName } from "@tenon/flow";
import { createClient } from "../scripts/client";
import { createServer } from "@tenon/node-framework";
import {
  RootController,
  AuthController,
  TenonComponentController,
  TenonProjectController,
  TenonPageController
} from "./controllers";
import {
  UserService,
  ProjectService,
  PageService,
} from "./services";
import { TenonComponentService } from "./services/tenon-component-service";

const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 9847,
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
      TenonProjectController,
      TenonPageController,
    ],
    services: [
      UserService,
      ProjectService,
      PageService,
      TenonComponentService,
    ],
    static: {
      path: path.resolve(__dirname, "./static"),
    },
    session: {
      key: 'tenon:ssid',
      sameSite: true,
      maxAge: 3600 * 1000,
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
