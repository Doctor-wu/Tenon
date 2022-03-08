import { Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";

export const createSchema = <DocType = any>(
  config: SchemaDefinition<SchemaDefinitionType<DocType>>
) => {
  return new Schema(config);
}

export { Schema };