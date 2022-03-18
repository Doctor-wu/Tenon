import {
  BaseController, Controller,
  Delete,
  Get, MiddleWare, Post, useService
} from "@tenon/node-framework";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import type { PageService } from "../../services";
import { SERVICE_NAME } from "../../services/constant";
import { TenonComponentService } from "../../services/tenon-component-service";

@Controller({
  name: 'TenonPageController',
  prefixPath: '/tenon-page'
})
class TenonPageController extends BaseController {

  @useService(SERVICE_NAME.page)
  pageService!: PageService;

  @useService(SERVICE_NAME.tenonComponent)
  tenonComponentService!: TenonComponentService;

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

  @Post('/saveTree', {
    params: {
      tree: {
        required: true,
        type: 'object',
      },
      version: {
        type: 'number',
        required: true,
      },
      belongPageId: {
        type: 'string',
        required: true,
      },
      newestId: {
        type: 'number',
        required: true,
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async saveTree(
    ctx,
    next,
    params
  ) {
    const {
      tree, version, belongPageId, newestId,
    } = params;
    let error, result;
    [error, result] = await this.tenonComponentService
      .createNewTenonComponentTree(tree, belongPageId, newestId, version);
    if (error) return await this.smartResponse(ctx, next)(error, result);
    [error, result] = await this.pageService.updatePageInfo(belongPageId, {
      newestVersion: version,
    });
    result = '保存成功';
    return await this.smartResponse(ctx, next)(error, result);
  }

  @Delete('/deleteTree', {
    params: {
      pageId: {
        type: "string",
        required: true,
      },
      version: {
        type: "string",
        required: true,
      },
    }
  })
  @MiddleWare(AuthMiddleWare)
  async deleteTree(
    ctx,
    next,
    params,
  ) {
    const {
      pageId,
      version,
    } = params;
    const [pageInfoError, pageInfo] = await this.pageService.getPageInfo(pageId);
    if (pageInfoError) return this.smartResponse(ctx, next)(pageInfoError, pageInfo);
    const [deleteTreeError, result] = await this.tenonComponentService.deleteTreeByFilter({
      belongPageId: pageId,
      version: parseInt(version),
    });
    if (deleteTreeError) return this.smartResponse(ctx, next)(deleteTreeError, result);
    if (parseInt(version) == pageInfo.newestVersion) {
      const [error] = await this.pageService.updatePageInfo(pageId, {
        newestVersion: pageInfo.newestVersion - 1,
      });
      if (error) return this.smartResponse(ctx, next)(error, null);
    }
    return this.smartResponse(ctx, next)(deleteTreeError, result);
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
