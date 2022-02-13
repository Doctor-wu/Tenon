import { BaseController, Controller, RequestContext, Next, io, useRouter, Get } from "../framework";

@Controller({
  prefixPath: '',
})
class RootController extends BaseController {

  @useRouter
  async getHandler(
    ctx: RequestContext,
    next: Next,
  ) {
    io.log(
      `[${ctx.method.toUpperCase()}] ${ctx.path}`
    );
    await next();
  }
  

  @Get("/")
  async homePage(
    ctx: RequestContext,
    next: Next,
  ) {
    this.response(ctx, next)("<h1>Tenon --Doctorwu</h1>");
  }
}

export { RootController };