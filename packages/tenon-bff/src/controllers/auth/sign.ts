import {
  BaseController, Controller, Get, RequestNext,
  Post, RequestContext, useService, MiddleWare, io
} from "@tenon/node-framework";
import { SERVICE_NAME } from "../../services/constant";
import { UserService } from "../../services";
import { confusePwd, useCaptcha } from "./util";

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
      },
      email: {
        type: "string",
      },
      gender: {
        type: "number",
      },
      phone: {
        type: "string",
      },
      captcha: {
        type: "string",
        required: true
      }
    },
  })
  async handleSignup(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    // 验证码
    if (!await this.assertCaptcha(ctx, next, params)) return;
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

  async assertCaptcha(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    if (ctx.session.captcha !== params.captcha.toLowerCase()) {
      await this.responseError(ctx, next)(1111, '验证码错误')
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
      },
      captcha: {
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
    // 验证码
    if (!await this.assertCaptcha(ctx, next, params)) return;
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
  async handlerSignOut(
    ctx,
    next,
  ) {
    ctx.session = null;
    this.responseJson(ctx, next)("登出成功");
  }

  @Get("/getCaptcha")
  @MiddleWare(({ ctx, params }) => {
    console.log(ctx.session);
    return [true];
  })
  async getCaptcha(
    ctx: RequestContext,
    next,
  ) {
    const captcha = useCaptcha();
    ctx.session.captcha = captcha.text.toLowerCase();
    ctx.response.type = 'svg';
    this.responseJson(ctx, next)(captcha.data, { noLog: true });
  }

  getDisplayUserInfo(userInfo: any) {
    return this.getSpecifiedFieldParams(userInfo, [
      "username",
      "phone",
      "email",
    ])
  }
}