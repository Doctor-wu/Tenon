import {
  BaseController, Controller, Get,
  RequestNext, RequestContext, MiddleWare
} from "@tenon/node-framework";
import { loadWebComponents } from "@tenon/materials";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";

@Controller({
  prefixPath: '/components',
})
export class TenonComponentController extends BaseController {

  @Get('/getComponents')
  @MiddleWare(AuthMiddleWare)
  async getComponents(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const components = await loadWebComponents();
    this.responseJson(ctx, next)(components);
  }
}