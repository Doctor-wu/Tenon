import { BaseService, createSchema, Service } from "@tenon/node-framework";
import { SERVICE_NAME } from "../constant";
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
});

@Service({
  name: SERVICE_NAME.page,
  schema: pageSchema,
})
class PageService extends BaseService {

  public async createNewPage(config: IPageConfig) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.find(config);
      if (query.length > 0) throw new Error(`该项目下已存在<${config.pageName}>页面`);
      return await this.addItem(config);
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
      const result = await this.model.deleteOne({
        _id,
      });
      if (result.deletedCount > 0) return '删除成功';
      else throw new Error('删除失败');
    });
  }

  public async deletePages(_ids: string[]) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.deleteMany({ _id: { $in: _ids } });
      if (query.deletedCount === _ids.length) {
        return '删除成功';
      }
      else throw new Error('删除失败');
    });
  }

};

export { PageService }