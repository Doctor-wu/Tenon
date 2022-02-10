import { BaseController, Controller, Get, RequestContext, Next, Post, useService } from "../framework";
import type { UserService } from "../services/user";

@Controller({
  prefixPath: '/',
})
class TestController extends BaseController {

  @useService("user")
  user!: UserService;

  @Get('getTestInfo/:tid', {
    params: {
      msg: {
        defaultValue: "tenonDefault",
        validator: function (param) {
          if (!param) return [true];
          if (param.startsWith("tenon")) return [true];
          return [false, "msg不是tenon域下的值"];
        }
      },
    },
  })
  @Get('getTestInfo')
  async getTestInfo(
    ctx: RequestContext,
    next: Next,
    params,
  ) {
    await this.responseJson(ctx, next)({
      name: "doctorwu",
      params,
    });
  }


  @Post('setTestInfo')
  async setTestInfo(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    await this.responseJson(ctx, next)({
      name: "doctorwu",
      params,
    });
  }

  @Get('')
  async home(
    ctx,
    next,
    params,
  ) {
    await this.response(ctx, next)("<h1>Hello Tenon --Doctorwu</h1>");
  }

}

export default TestController;