import { BaseController, Controller, RequestContext, RequestNext, io, useRouter, Get, useService } from "@tenon/node-framework";
import fs from 'fs';
import path from 'path';
import type { PageService, ProjectService, TenonEventService } from "../services";
import { SERVICE_NAME } from "../services/constant";

@Controller({
  prefixPath: '',
})
class RootController extends BaseController {

  @useService(SERVICE_NAME.page)
  private pageService!: PageService;

  @useService(SERVICE_NAME.project)
  private projectService!: ProjectService;

  @useService(SERVICE_NAME.tenonEvent)
  private tenonEventService!: TenonEventService;

  @useRouter
  async getHandler(
    ctx: RequestContext,
    next: RequestNext,
  ) {
    if (ctx.method === 'options') {
      return ctx.body = '';
    }
    ctx._startTime = Date.now();
    await next();
    ctx._endTime = Date.now();
    io.log(
      `request`,
      io.bold(`[${ctx.method.toUpperCase()}]${ctx.path}`),
      `cost ${ctx._endTime - ctx._startTime}ms`
    );
  }


  @Get("/")
  async homePage(
    ctx: RequestContext,
    next: RequestNext,
  ) {
    this.response(ctx, next)("<h1>Tenon --Doctorwu</h1>");
  }

  @Get('/getSDKScript')
  async getSDKScript(
    ctx: RequestContext,
    next: RequestNext,
  ) {
    const script = fs.readFileSync(path.resolve(__dirname, '../../../tenon-sdk/src/web/dist/tenon-web-sdk.umd.js'), 'utf-8');
    ctx.body = script;
  }

  @Get('/getSDKStyle')
  async getSDKStyle(
    ctx: RequestContext,
    next: RequestNext,
  ) {
    const script = fs.readFileSync(path.resolve(__dirname, '../../../tenon-sdk/src/web/dist/style.css'), 'utf-8');
    ctx.body = script;
  }

  @Get('/getSDKProjectInfo', {
    params: {
      projectId: {
        type: 'string',
        required: true,
      }
    }
  })
  async getSDKProjectInfo(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const projectId = params.projectId;
    const pageInfo = await this.projectService.getProjectInfo(projectId);
    ctx.body = pageInfo;
  };

  @Get('/getSDKPageInfo', {
    params: {
      pageId: {
        type: 'string',
        required: true,
      }
    }
  })
  async getSDKPageInfo(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const { pageId } = params;
    const [error, result] = await this.pageService.getPageInfo(pageId);
    const [eventError, eventResult] = await this.tenonEventService.getEvents({
      belongPageId: pageId,
    });
    if (eventError) return await this.smartResponse(ctx, next)(eventError, eventResult);
    else {
      result.events = eventResult;
    }
    ctx.body = result;
  }
}

export { RootController };