import { BaseService, Service, createSchema, useService } from "@tenon/node-framework";
import { SERVICE_NAME } from "../constant";
import { ITenonComponentConfig } from "./tenon-component.interface";
const requiredUniqueString = {
  type: String,
  required: true,
  unique: true,
};
const tenonComponentSchema = createSchema({
  tree: {
    type: {},
    required: true,
  },
  belongPageId: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
    min: 1,
  },
  createTime: {
    type: String,
    required: true,
  }
});

@Service({
  schema: tenonComponentSchema,
  name: SERVICE_NAME.tenonComponent,
})
class TenonComponentService extends BaseService {

  public createNewTenonComponentTree(tree: any, belongPageId: string, version = 1) {
    return this.errorProtectedHandler(async () => {
      return this.addItem({
        tree,
        belongPageId,
        version,
        createTime: String(Date.now()),
      });
    });
  }

  public getTrees(query) {
    return this.errorProtectedHandler(async () => {
      const queries = await this.model.find(query);
      queries.sort((a, b) => b.get('version') - a.get('version'));
      return queries;
    });
  }

  public deleteTrees(pageIds: string[]) {
    return this.errorProtectedHandler(async () => {
      const query = await this.model.deleteMany({
        belongPageId: { $in: pageIds }
      });
      return '删除成功';
    })
  }

  public deleteTree(_id) {
    return this.errorProtectedHandler(async () => {
      return await this.deleteItemById(_id);
    });
  }
}

export { TenonComponentService };
