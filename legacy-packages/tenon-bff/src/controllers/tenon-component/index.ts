import {
  BaseController, Controller, Get,
  RequestNext, RequestContext, MiddleWare, useService
} from "@tenon/node-framework";
import { loadWebComponents } from "@tenon/legacy-materials";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import { SERVICE_NAME } from "../../services/constant";
import { TenonComponentService } from "../../services/tenon-component-service";

@Controller({
  prefixPath: '/components',
})
export class TenonComponentController extends BaseController {

  @useService(SERVICE_NAME.tenonComponent)
  tenonComponentService!: TenonComponentService;

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

  @Get('/getPageTrees/:pageId')
  @MiddleWare(AuthMiddleWare)
  async getPageTrees(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const {
      pageId
    } = params;
    const [error, result] = await this.tenonComponentService.getTrees({
      belongPageId: pageId,
    });
    this.smartResponse(ctx, next)(error, result);
  }
}
