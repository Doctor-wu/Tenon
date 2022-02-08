import { BaseController, Controller, Get, RequestContext, Next, Post } from "../framework";

@Controller({
  prefixPath: '/',
})
class TestController extends BaseController {

  @Get('testInfo', {
    params: {
      msg: {
        defaultValue: "tenonDefault",
        validator: function (param) {
          if (!param) return [true];
          if (param.startsWith("tenon")) return [true];
          return [false, "msg不是tenon域下的值"];
        }
      },
    }
  })
  @Post('testInfo')
  async getTestInfo(
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