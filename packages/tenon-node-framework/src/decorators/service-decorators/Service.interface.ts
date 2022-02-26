import {
  SchemaDefinition,
  SchemaDefinitionType,
  SchemaOptions,
  SchemaType
} from "mongoose";
import { IDecoratedServiceExtraFields } from "../../service/service-core.interface";

export interface IServiceConfig<DocType = any> {
  schema: SchemaDefinition<SchemaDefinitionType<DocType>>;
  name?: string;
  schemaOptions?: SchemaOptions;
}

export interface IDecoratedService<DocType = any> {
  new(...args: any[]): IDecoratedServiceExtraFields<DocType>;
}