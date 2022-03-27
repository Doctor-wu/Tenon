import path from "path";
import { setPhase, PhaseName } from "@tenon/flow";
import { createClient } from "../scripts/client";
import { createServer } from "@tenon/node-framework";
import {
  RootController,
  AuthController,
  TenonComponentController,
  TenonProjectController,
  TenonPageController,
  TenonEventController,
} from "./controllers";
import {
  UserService,
  ProjectService,
  PageService,
  TenonEventService,
  TenonComponentService,
} from "./services";

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
      TenonEventController,
    ],
    services: [
      UserService,
      ProjectService,
      PageService,
      TenonComponentService,
      TenonEventService,
    ],
    static: {
      path: path.resolve(__dirname, "./static"),
    },
    session: {
      key: 'tenon:ssid',
      sameSite: true,
      maxAge: 6 * 3600 * 1000,
    },
    logger: {
      path: path.resolve(__dirname, "./logFiles"),
    },
    bodyParser: {
      jsonLimit: '10mb'
    }
  });

  server.start();
  server.once('launched', () => {
    setPhase(createClient(), PhaseName.RUN_CMS);
  });
}


bootstrap();
