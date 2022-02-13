import { Next } from "koa";
import { BaseController, Controller, Get, Post, RequestContext, useService } from "../../framework";
import { SERVICE_NAME } from "../../services/constant";
import { UserService } from "../../services/user";
import crypto from "crypto"

@Controller({
  prefixPath: "/user"
})
class UserController extends BaseController {


  @useService(SERVICE_NAME.user)
  user!: UserService;

  @Post("/signup", {
    params: {
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
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
    },
  })
  async handleSignup(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    const [_, existed] = await this.user.getUsers({ username: params.username });
    if (existed?.length) {
      return this.responseError(ctx, next)(1111, `用户名${params.username}已存在`);
    }

    params.password = this.confusePwd(params.password);
    const [err, user] = await this.user.addUser(params);
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      await this.responseJson(ctx, next)(user);
    }
  }

  @Post("/signIn", {
    params: {
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      }
    }
  })
  async handleSignIn(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    params.password = this.confusePwd(params.password);
    const [err, result] = await this.user.validateNameAndPassword(
      this.getSpecifiedFieldParams(params, ["username", "password"]),
    );
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      ctx.session.user = result;
      await this.responseJson(ctx, next)(result);
    }
  }

  @Get("/getUser")
  @Get("/getUser/:username")
  async getUser(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    const condition = this.getSpecifiedFieldParams(params, ["username"]);
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
    next: Next,
    params: any,
  ) {
    const userInfo = this.getSpecifiedFieldParams(params, ["phone", "password", "gender", "email"]);
    const [err, result] = await this.user.updateUser(userInfo);
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      await this.responseJson(ctx, next)(result);
    }
  }

  private confusePwd(pwd: string) {
    return crypto.createHash("md5").update(pwd).digest("hex");
  }
}

export { UserController };
