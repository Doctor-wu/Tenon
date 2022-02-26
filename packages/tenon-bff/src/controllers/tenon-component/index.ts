import { BaseController, Controller, Get, Next, RequestContext } from "@tenon/node-framework";
import { loadWebComponents } from "@tenon/materials";

@Controller({
  prefixPath: '/components'
})
export class TenonComponentController extends BaseController {

  @Get('/getComponents')
  async getComponents(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    const components = await loadWebComponents();
    this.responseJson(ctx, next)(components);
  }
}