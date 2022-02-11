import { RootController, UserController } from "./controllers";
import { createServer } from "./framework/core/app";
import { UserService } from "./services/user";

const server = createServer({
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
    UserController,
  ],
  services: [
    UserService,
  ],
});