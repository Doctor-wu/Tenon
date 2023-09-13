import {
  BaseController, Controller,
  Delete,
  Get, MiddleWare, Post, useService
} from "@tenon/node-framework";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import type { ProjectService } from "../../services";
import { SERVICE_NAME } from "../../services/constant";
import { IProjectConfig } from "../../services/project-service/project.interface";

@Controller({
  name: 'TenonProjectController',
  prefixPath: '/tenon-project'
})
class TenonProjectController extends BaseController {

  @useService(SERVICE_NAME.project)
  projectService!: ProjectService;

  @Get('/getProjects')
  @MiddleWare(AuthMiddleWare)
  async getProjects(
    ctx,
    next,
  ) {
    const { _id: belongUserId } = ctx.session.user;
    const [error, result] = await this.projectService.getUserProject(belongUserId);
    await this.smartResponse(ctx, next)(error, result);
  }

  @Get('/getProjectInfo/:projectId')
  @MiddleWare(AuthMiddleWare)
  async getPageInfo(
    ctx,
    next,
    params
  ) {
    const { projectId } = params;
    const [error, result] = await this.projectService.getProjectInfo(projectId);
    await this.smartResponse(ctx, next)(error, result);
  }

  @Post('/addProject', {
    params: {
      projectName: {
        type: "string",
        required: true,
      }
    }
  })
  @MiddleWare(AuthMiddleWare)
  async addProject(
    ctx,
    next,
    params,
  ) {
    const projectConfig: IProjectConfig = {} as IProjectConfig;
    projectConfig.projectName = params.projectName;
    projectConfig.createTime = String(Date.now());
    projectConfig.belongUserId = ctx.session.user._id;
    projectConfig.userConfig = params.userConfig || {};

    const [error, result] = await this.projectService.createNewProject(projectConfig);

    await this.smartResponse(ctx, next)(error?.message || error, result);
  }

  @Delete('/deleteProject', {
    params: {
      projectId: {
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
    const [error, result] = await this.projectService.deleteProject(params.projectId);
    await this.smartResponse(ctx, next)(error?.message || error, result);
  }
}

export { TenonProjectController };
