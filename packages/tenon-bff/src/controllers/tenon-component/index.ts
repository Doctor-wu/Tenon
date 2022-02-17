import { BaseController, Controller, Get, Next, RequestContext } from "../../framework";
import { loadComponents } from "@tenon/materials";

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
    const components = await loadComponents();
    this.responseJson(ctx, next)(components);
  }
}