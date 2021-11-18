
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
  console.log(source);

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
      propValue[propertyKey] = source?.[fieldName]?.[propertyKey] || properties[propertyKey].default;
    });
    props[fieldName] = propValue;
  });

  return props;
}

export const containerSchema: ISchema =
{
  type: "object",
  title: "容器样式",
  fieldName: "containerStyle",
  properties: {
    padding: {
      type: "string",
      title: "内边距",
      default: "0px"
    },
    margin: {
      type: "string",
      title: "外边距",
      default: "0px"
    },
    overflow: {
      type: "string",
      title: "overflow",
      default: ""
    },
    "box-sizing": {
      type: "select",
      title: "盒模型",
      default: "unset",
      options: {
        "content-box": "content-box",
        "border-box": "border-box",
        "unset": "unset",
        "inherit": "inherit",
      }
    },
    display: {
      type: "select",
      title: "布局",
      default: "block",
      options: {
        block: "block",
        flex: "flex",
        "inline-block": "inline-block",
        "inline-flex": "inline-flex",
      }
    },
    "align-items": {
      type: "select",
      title: "align-items",
      default: "start",
      options: {
        start: "start",
        center: "center",
        end: "end",
      },
    },
    "justify-content": {
      type: "select",
      title: "justify-content",
      default: "start",
      options: {
        start: "start",
        center: "center",
        end: "end",
        "space-between": "space-between",
        "space-evenly": "space-evenly",
        "space-around": "space-around",
      },
    },
    flex: {
      type: "string",
      title: "flex",
      default: ""
    },
    border: {
      type: "string",
      title: "边框",
      default: ""
    },
    width: {
      type: "string",
      title: "宽度",
      default: "auto"
    },
    height: {
      type: "string",
      title: "高度",
      default: "auto"
    }
  }
}