import { BaseService, createSchema, Service, useService } from "@tenon/node-framework";
import { SERVICE_NAME } from "../constant";
import { TenonComponentService } from "../tenon-component-service";
import { IPageConfig } from "./page.interface";

export const pageSchema = createSchema({
  pageName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  belongProjectId: {
    type: String,
    required: true,
  },
  newestVersion: {
    type: Number,
    default: 0,
  },
  pageStates: {
    type: {},
    default: {
      author: 'Doctorwu'
    },
  },
  pageLifeCycle: {
    type: {},
    default: {
      onShow: {
        eventLabel: "进入时",
        executeQueue: [],
      },
      onHide: {
        eventLabel: "离开时",
        executeQueue: [],
      },
    }
  }
});

@Service({
  name: SERVICE_NAME.page,
  schema: pageSchema,
})
class PageService extends BaseService {

  @useService(SERVICE_NAME.tenonComponent)
  tenonComponentService!: TenonComponentService;

  public async createNewPage(config: IPageConfig) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.find(config);
      if (query.length > 0) throw new Error(`该项目下已存在<${config.pageName}>页面`);
      const pageInfo = await this.addItem(config);
      return pageInfo;
    });
  }

  public async getPageInfo(pageId: string) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.find({ _id: pageId });
      if (query.length === 0) throw new Error(`不存在页面：${pageId}`);
      const result: any = query[0].toJSON();
      let tree: any = null;
      if (result.newestVersion !== 0) {
        [, [tree] = [null]] = await this.tenonComponentService.getTrees({
          belongPageId: pageId,
          version: result.newestVersion,
        });
      }
      return {
        ...result,
        tree: tree?.tree,
        newestId: tree?.newestId || 1,
      };
    });
  }

  public async updatePageInfo(pageId: string, payload: any) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.updateOne({
        _id: pageId
      }, payload);
      if (query.modifiedCount === 0) throw new Error('更新页面失败');
      return '更新成功';
    });
  }

  public async getProjectPages(id: string) {
    return this.errorProtectedHandler(async () => {
      return await this.model.find({
        belongProjectId: id,
      });
    });
  }

  public async deletePage(_id: string) {
    return this.errorProtectedHandler(async () => {
      const [error, result] = await this.deletePages([_id]);
      if (error) throw error;
      return result;
    });
  }

  public async deletePages(_ids: string[]) {
    return this.errorProtectedHandler(async () => {
      const [error] = await this.tenonComponentService.deleteTrees(_ids);
      if (error) throw error;
      const query = await this.model.deleteMany({ _id: { $in: _ids } });
      if (query.deletedCount === _ids.length) {
        return '删除成功';
      }
      else throw new Error('删除页面失败');
    });
  }

};

export { PageService }