import {
  BaseController, Controller,
  Delete,
  Get, MiddleWare, Post, useService
} from "@tenon/node-framework";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import type { PageService } from "../../services";
import { SERVICE_NAME } from "../../services/constant";

@Controller({
  name: 'TenonPageController',
  prefixPath: '/tenon-page'
})
class TenonPageController extends BaseController {

  @useService(SERVICE_NAME.page)
  pageService!: PageService;

  @Get('/getPages/:projectId', {
    params: {
      projectId: {
        type: "string",
        required: true,
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async getPages(
    ctx,
    next,
    params,
  ) {
    const { projectId } = params;
    const [error, result] = await this.pageService.getProjectPages(projectId);
    await this.smartResponse(ctx, next)(error, result);
  }

  @Get('/getPageInfo/:pageId')
  @MiddleWare(AuthMiddleWare)
  async getPageInfo(
    ctx,
    next,
    params
  ) {
    const { pageId } = params;
    const [error, result] = await this.pageService.getPageInfo(pageId);
    await this.smartResponse(ctx, next)(error, result);
  }

  @Post('/addPage', {
    params: {
      pageName: {
        type: "string",
        required: true,
      },
      belongProjectId: {
        type: "string",
        required: true,
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async addPage(
    ctx,
    next,
    params,
  ) {
    const [error, result] = await this.pageService.createNewPage(params);
    await this.smartResponse(ctx, next)(error?.message || error, result);
  }

  @Delete('/deletePage', {
    params: {
      pageId: {
        type: "string",
        required: true,
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async deletePage(
    ctx,
    next,
    params,
  ) {
    const [error, result] = await this.pageService.deletePage(params.pageId);
    await this.smartResponse(ctx, next)(error?.message || error, result);
  }
}

export { TenonPageController };
