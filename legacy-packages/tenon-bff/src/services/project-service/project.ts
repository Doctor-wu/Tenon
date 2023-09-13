import { BaseService, Service, createSchema, useService } from "@tenon/node-framework";
import { SERVICE_NAME } from "../constant";
import { PageService } from "../page-service";
import { IProjectConfig } from "./project.interface";
const requiredUniqueString = {
  type: String,
  required: true,
  unique: true,
}
const projectSchema = createSchema({
  projectName: {
    ...requiredUniqueString,
    minlength: [4, '不可以少于4个字'],
    maxlength: [12, '不可以多于12个字'],
  },
  createTime: {
    type: String,
    required: true,
  },
  belongUserId: {
    type: String,
    required: true,
  },
  userConfig: {
    type: {
      screenWidth: Number,
    },
    default: {}
  }
});

@Service({
  schema: projectSchema,
  name: SERVICE_NAME.project,
})
class ProjectService extends BaseService {

  @useService(SERVICE_NAME.page)
  pageService!: PageService;

  public async createNewProject(config: IProjectConfig) {
    return this.errorProtectedHandler(async () => {
      const result = await this.model.find({
        projectName: config.projectName,
        belongUserId: config.belongUserId,
      });
      if (result.length > 0) {
        throw `您已有<${config.projectName}>项目`;
      }
      return await this.addItem(config);
    });
  }

  public async getUserProject(id: string) {
    return this.errorProtectedHandler(async () => {
      return await this.model.find({
        belongUserId: id,
      });
    });
  }

  public async getProjectInfo(projectId: string) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.find({ _id: projectId });
      if (query.length === 0) throw new Error(`不存在项目：${projectId}`);
      return query[0];
    });
  }

  public async deleteProject(_id: string) {
    return this.errorProtectedHandler(async () => {
      let err, result;
      // 获取该项目下所有的页面
      [err, result] = (await this.pageService.getProjectPages(_id));
      const pageIds = result.map(page => page._id);
      if (err) throw err;

      // 将项目下所有页面删除
      [err, result] = await this.pageService.deletePages(pageIds);
      if (err) throw err;

      // 删除项目
      result = await this.model.deleteOne({
        _id,
      });
      if (result.deletedCount > 0) return '删除成功';
      else throw new Error('删除失败');
    });
  }

}

export { ProjectService };
