import { BaseController, Controller } from "../../framework";
import { TestController } from "./test";
import { UserController } from "./user";

@Controller({
  prefixPath: "/auth"
})
class AuthController extends BaseController {

  public subController = [UserController, TestController];

}

export { AuthController };