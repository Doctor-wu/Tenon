
export type SchemaType = 'input' | 'color' | 'select';
type BaseSchema = {
  type: SchemaType;
  value: any;
  fields?: any[];
}
type NeedBaseSchemaProp<K extends keyof BaseSchema> = {
  [P in K]: BaseSchema[P];
}
export type Schema<T extends SchemaType = any> =
  T extends 'select'
  ? BaseSchema & NeedBaseSchemaProp<'fields'>
  : BaseSchema;