import { BaseController, Controller } from "@tenon/node-framework";
import { TestController } from "./test";
import { UserController } from "./user";

@Controller({
  prefixPath: "/auth"
})
class AuthController extends BaseController {

  public subController = [UserController, TestController];

}

export { AuthController };