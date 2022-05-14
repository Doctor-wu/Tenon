import {
  BaseController, Controller, Get, RequestNext,
  Post, RequestContext, useService, MiddleWare, io
} from "@tenon/node-framework";
import { SERVICE_NAME } from "../../service/constant";
import { UserService } from "../../service";
import { confusePwd } from "./util";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";

@Controller({
  prefixPath: '',
  middleware: [
    () => {
      console.log('SignController middleware');
      return [true];
    }
  ]
})
export class SignController extends BaseController {

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
      }
    },
  })
  async handleSignup(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    // 是否已存在
    if (!await this.assertExistUser(ctx, next, params)) return;

    // 注册服务
    params.password = confusePwd(params.password);
    const [err, user] = await this.user.addUser(params);
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      await this.responseJson(ctx, next)(this.getDisplayUserInfo(user));
    }
  }

  async assertExistUser(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const [_, existed] = await this.user.getUsers({ username: params.username });
    if (existed?.length) {
      await this.responseError(ctx, next)(1111, `用户名${params.username}已存在`);
      return false;
    }
    return true;
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
    next: RequestNext,
    params: any,
  ) {
    params.password = confusePwd(params.password);
    const [err, result] = await this.user.validateNameAndPassword(
      this.getSpecifiedFieldParams(params, ["username", "password"]),
    );
    if (err) {
      await this.responseError(ctx, next)(1111, err.toString());
    } else {
      ctx.session.user = result;
      await this.responseJson(ctx, next)(this.getDisplayUserInfo(result));
    }
  }

  @Get("/signOut")
  @MiddleWare(AuthMiddleWare)
  async handlerSignOut(
    ctx,
    next,
  ) {
    ctx.session = null;
    this.responseJson(ctx, next)("登出成功");
  }

  @Get("/isSignIn")
  async handleIsSignIn(
    ctx: RequestContext,
    next: RequestNext,
  ) {
    if (ctx.session.user) {
      await this.responseJson(ctx, next)({
        isSignIn: true
      });
    } else {
      await this.responseJson(ctx, next)({ isSignIn: false });
    }
  }

  getDisplayUserInfo(userInfo: any) {
    return this.getSpecifiedFieldParams(userInfo, [
      "username",
      "phone",
      "email",
    ])
  }
}