import { ISchema } from "../core";

export const containerSchema: ISchema =
{
  type: "custom",
  title: "元素容器布局",
  fieldName: "containerStyle",
  properties: {
    size: {
      type: "group",
      title: "尺寸和边距",
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
        width: {
          type: "string",
          title: "宽度",
          default: "auto"
        },
        height: {
          type: "string",
          title: "高度",
          default: "auto"
        },
      }
    },
    positions: {
      type: "group",
      title: "定位属性",
      properties: {
        position: {
          type: "select",
          title: "定位",
          options: {
            absolute: "absolute",
            relative: "relative",
            fixed: "fixed",
            static: "static",
            inherit: "inherit",
            initial: "initial",
            revert: "revert",
            sticky: "sticky",
            unset: "unset",
          }
        },
        left: {
          type: "string",
          title: "left",
          default: null
        },
        right: {
          type: "string",
          title: "right",
          default: null
        },
        top: {
          type: "string",
          title: "top",
          default: null
        },
        bottom: {
          type: "string",
          title: "bottom",
          default: null
        },
        zIndex: {
          type: "number",
          title: "z-index"
        },
      }
    },
    layout: {
      type: "group",
      title: "布局属性",
      properties: {
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
      }
    },
    flexible: {
      type: "group",
      title: "flex",
      properties: {
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
        flexDirection: {
          type: "select",
          title: "flex方向",
          options: {
            row: "row",
            "row-reverse": "row-reverse",
            column: "column",
            "column-reverse": "column-reverse",
            revert: "revert",
            inherit: "inherit",
            initial: "initial",
            sticky: "sticky",
            unset: "unset",
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
      }
    },
  }
}
