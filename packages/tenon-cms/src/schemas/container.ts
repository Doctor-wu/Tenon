import { ISchema } from "../logic/schema";

export const containerSchema: ISchema =
{
  type: "object",
  title: "容器样式",
  fieldName: "containerStyle",
  properties: {
    padding: {
      type: "string",
      title: "内边距",
      default: "5px"
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
    "flex-wrap": {
      type: "select",
      title: "flex-wrap",
      default: "nowrap",
      options: {
        inherit: "inherit",
        initial: "initial",
        nowrap: "nowrap",
        "revert": "revert",
        "unset": "unset",
        "wrap": "wrap",
        "wrap-reverse": "wrap-reverse",
      },
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