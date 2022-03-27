import { compose } from "@tenon/shared";
import { HydratedDocument, Model, Schema, SchemaDefinition, SchemaDefinitionType, SchemaOptions, SchemaType } from "mongoose";
import { tenonAppType } from "../core/app.interface";
import { io } from "../core/io";
import { IDecoratedServiceExtraFields } from "./service-core.interface";

export const initServices = (app: tenonAppType) => {
  const { services } = app.$config;
  if (!services) return;
  app.$services = {};
  services.forEach((ServiceCtor) => {
    const instance = new ServiceCtor(app);
    app.$services![instance.serviceName] = instance;
    io.log(`- ${instance.serviceName}`);
  });

  compose(io.moduleStyle, io.log)('Service initd');
}

export class BaseService<DocType = unknown> implements IDecoratedServiceExtraFields<DocType>{
  protected app: tenonAppType;

  /** 
   * Service装饰器会为Service在实例化时去创造一个schemaInstance对象 
   * */
  protected schemaInstance!: Schema;

  /** 
   * Service装饰器会为Service在实例化时去创造一个model对象 
   * */
  protected model!: Model<DocType>;

  /** 
   * Service装饰器会为实例加上serviceName属性 
   * */
  public serviceName!: string;

  constructor(app: tenonAppType) {
    this.app = app;
  }

  /** 初始化Model */
  protected buildModel() {
    this.model = this.app.$mongoose!.model(this.serviceName, this.schemaInstance);
  }

  /** 创建一个Model实例 */
  protected createModelInstance(...args: any[]): HydratedDocument<DocType, {}, {}> {
    return new this.Model(...args);
  }

  /**
   * 向数据库中存入一条对应Model的实体数据
   * @param itemInfo Model中一条数据
   * @returns 
   */
  protected addItem(itemInfo: any): Promise<any> {
    const entity = new this.Model(itemInfo);
    return new Promise((resolve, reject) => {
      entity.validate((err) => {
        if (err) reject(err);
        resolve(entity);
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        entity.save(function (err, result) {
          if (err) reject(err);
          resolve(result);
        } as any);
      });
    });
  }

  protected async deleteItemById(_id: string) {
    const result = await this.Model.deleteOne({ _id });
    if (result.deletedCount === 0) throw new Error('删除失败');
    else return '删除成功';
  }

  protected async deleteManyByIds(ids: string[]) {
    const result = await this.Model.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === ids.length) return '删除成功';
    throw new Error('删除失败');
  }

  protected async updateItemById(_id: string, info) {
    const result = await this.model.updateOne({ _id }, info);
    if (!result.matchedCount) throw `更新内容不存在：${_id}`;
    if (!result.modifiedCount) throw '更新失败';
    return '更新成功';
  }

  protected async errorProtectedHandler(resultGetter: () => Promise<any>): Promise<[any, any]> {
    let err, result;
    try {
      result = await resultGetter();
    } catch (e) {
      err = e;
    }
    return [err, result];
  }

  get Model(): Model<DocType> {
    return this.model;
  }
}