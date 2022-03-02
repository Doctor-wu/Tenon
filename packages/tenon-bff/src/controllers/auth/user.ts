import { BaseController, Controller, Get, Post, RequestNext, RequestContext, useService } from "@tenon/node-framework";
import { SERVICE_NAME } from "../../services/constant";
import { UserService } from "../../services/user";
import crypto from "crypto";
import { SignController } from "./sign";

@Controller({
  prefixPath: "/user"
})
class UserController extends BaseController {
  @useService(SERVICE_NAME.user)
  user!: UserService;

  public subController = [SignController];

  @Get("/getUser")
  @Get("/getUser/:username")
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
