import {
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
  SchemaOptions,
  SchemaType
} from "mongoose";
import { IDecoratedServiceExtraFields } from "../../service/service-core.interface";

export interface IServiceConfig {
  schema: Schema;
  name?: string;
}

export interface IDecoratedService<DocType = any> {
  new(...args: any[]): IDecoratedServiceExtraFields<DocType>;
}