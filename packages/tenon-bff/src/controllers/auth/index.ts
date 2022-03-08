import { BaseController, Controller } from "@tenon/node-framework";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import { TestController } from "./test";
import { UserController } from "./user";

@Controller({
  prefixPath: "/auth",
  middleware: [
    () => {
      console.log('Parent middleware');
      return [true];
    }]
})
class AuthController extends BaseController {

  public subController = [UserController, TestController];

}

export { AuthController };