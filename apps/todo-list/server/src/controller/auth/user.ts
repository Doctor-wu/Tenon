import { BaseController, Controller, Get, Post, RequestNext, RequestContext, useService, MiddleWare } from "@tenon/node-framework";
import { SERVICE_NAME } from "../../service/constant";
import { UserService } from "../../service";
import crypto from "crypto";
import { SignController } from "./sign";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";

@Controller({
  prefixPath: "/user"
})
class UserController extends BaseController {
  @useService(SERVICE_NAME.user)
  user!: UserService;

  public subController = [SignController];

  @Get("/getUser")
  @Get("/getUser/:username")
  @MiddleWare(AuthMiddleWare)
  async getUser(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const condition = this.getSpecifiedFieldParams(params, ["username", "password"]);
    const [err, users] = await this.user.getUsers(condition);
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      await this.responseJson(ctx, next)({ users });
    }
  }

  @Post("/updateUser", {
    params: {
      password: {
        type: "string",
      },
      email: {
        type: "string",
      },
      gender: {
        type: "number",
      },
      phone: {
        type: "string",
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async updateUser(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const userInfo = this.getSpecifiedFieldParams(params, ["username", "phone", "password", "gender", "email"]);
    const [err, result] = await this.user.updateUser(userInfo);
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      await this.responseJson(ctx, next)(result);
    }
  }
}

export { UserController };
