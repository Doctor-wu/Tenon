import Test from "./controllers/test";
import { createServer } from "./framework/core/app";

const server = createServer({
  server: {
    port: 8888,
  },
  db: {
    username: 'doctorwu',
    password: '123456',
    address:'mongodb://localhost:27017/tenon',
  },
  controllers: [
    Test,
  ]
});