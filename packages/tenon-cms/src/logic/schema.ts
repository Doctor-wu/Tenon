import { internalSchema } from "../schemas";

export type SchemaType = 'string' | 'number' | 'color' | 'select' | 'group';
type BaseSchema = {
  type: SchemaType;
  title: string;
  default?: any;
  options?: any;
  properties?: any;
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
  key?: string;
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
      key = "",
      fieldName,
      properties = {},
    } = schema;
    switch (type) {
      case 'object':
        const propValue = {};
        Object.keys(properties).forEach(propertyKey => {
          switch (properties?.[propertyKey].type) {
            case 'group':
              const props = createPropsBySchemas([
                {
                  type: "object",
                  title: properties?.[propertyKey].title,
                  fieldName,
                  properties: properties?.[propertyKey].properties,
                }
              ], source);
              console.log(props);

              Object.assign(propValue, { ...(props[fieldName] || {}) });
              break;

            default:
              propValue[propertyKey] = source?.[fieldName]?.[propertyKey] || properties?.[propertyKey]?.default;
              break;
          }
        });
        props[fieldName] = propValue;
        break;
      case 'internal':
        props[fieldName] = internalSchema[key];
        break;
      default:
        break;
    }
  });

  return props;
}
