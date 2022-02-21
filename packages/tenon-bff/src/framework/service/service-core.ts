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
   * Service装饰器会为实例加上schemes属性 
   * */
  protected schemaConfig!: SchemaDefinition<SchemaDefinitionType<DocType>>;

  /** 
   * Service装饰器会为实例加上schemaType属性 
   * */
  protected schemaOptions!: SchemaOptions;

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

  /** 初始化Schema */
  protected buildSchema() {
    this.schemaInstance = new Schema(this.schemaConfig, this.schemaOptions);
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