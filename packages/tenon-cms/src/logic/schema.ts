
export type SchemaType = 'string' | 'number' | 'color' | 'select';
type BaseSchema = {
  type: SchemaType;
  title: string;
  default?: any;
  options?: any;
}
type NeedBaseSchemaProp<K extends keyof BaseSchema> = {
  [P in K]: BaseSchema[P];
}
export type SchemaProperty<T extends SchemaType = any> =
  T extends 'select'
  ? BaseSchema & NeedBaseSchemaProp<'options'>
  : BaseSchema;

export interface ISchema {
  type: string;
  title: string;
  fieldName: string;
  properties: {
    [props: string]: SchemaProperty
  };
}

export const parseSchemas2Props = (schemas: ISchema[] = []) => {
  const result = {};
  schemas.forEach(schema => {
    const {
      type,
      fieldName,
    } = schema;
    let propField = {};
    switch (type) {
      case 'object':
        propField = {
          type: Object,
          default: {},
        }
        break;
      default:
        propField = {};
        break;
    }
    result[fieldName] = propField;
  });
  return result;
}

export const createPropsBySchemas = (schemas: ISchema[] = [], source?: any) => {
  const props = {};

  schemas.forEach(schema => {
    const {
      type,
      title,
      fieldName,
      properties = {},
    } = schema;
    const propValue = {};
    Object.keys(properties).forEach(propertyKey => {
      propValue[propertyKey] = source?.[fieldName]?.[propertyKey] || properties?.[propertyKey]?.default;
    });
    props[fieldName] = propValue;
  });

  return props;
}
