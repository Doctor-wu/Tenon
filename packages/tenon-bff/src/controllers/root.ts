import { BaseController, Controller, RequestContext, Next, io, useRouter } from "../framework";

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
}

export { RootController };