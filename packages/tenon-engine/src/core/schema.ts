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

export type ISchema<T extends string = any> = {
  type: T;
  title: string;
  fieldName: string;
  key?: string;
  listType?: T extends "array" ? string : never;
  properties: T extends "internal" ? never
  : {
    [props: string]: SchemaProperty
  }
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
      case 'custom':
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

export const createPropsBySchemas = (
  schemas: ISchema[] = [],
  source?: any
) => {
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
      case 'group':
      case 'custom':
      case 'object':
        const propValue = {};
        const sourceKeys = Object.keys(source?.[fieldName] || {});
        const sourceKeysSet = new Set<string>();
        sourceKeys.forEach(key => {
          sourceKeysSet.add(key);
        });
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

              Object.assign(propValue, { ...(props[fieldName] || {}) }, { ...source?.[fieldName] });
              break;
            default:
              propValue[propertyKey] = sourceKeysSet.has(propertyKey)
                ? source?.[fieldName]?.[propertyKey]
                : getPropUnitDefault(propValue, properties?.[propertyKey])
              break;
          }
        });
        props[fieldName] = propValue;
        break;
      case 'internal':
        props[fieldName] = internalSchema[key];
        break;
      default:
        props[fieldName] = {};
        break;
    }
  });

  return props;
}

function getPropUnitDefault(propValue, propUnit) {
  // if (propUnit?.default && typeof propUnit?.default === "string" && /^\{\{\[^{}]+}\}$/.test(propUnit?.default)) {
    
  // }
  return propUnit?.default;
}
