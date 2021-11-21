import { ISchema } from "../logic/schema";

export const containerSchema: ISchema =
{
  type: "object",
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
          default: "5px"
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
}

export const containerBackgroundSchema = {
  type: "object",
  title: "元素容器背景及边框",
  fieldName: "containerBackground",
  properties: {
    border: {
      type: "group",
      title: "边框",
      properties: {
        borderWidth: {
          type: "string",
          title: "边框粗细",
          default: "null",
        },
        borderStyle: {
          type: "select",
          title: "边框样式",
          default: "null",
          options: {
            solid: "solid",
            dashed: "dashed",
            dotted: "dotted",
            doubled: "dashed",
            groove: "groove",
            hidden: "hidden",
            inherit: "inherit",
            initial: "initial",
            inset: "inset",
            none: "none",
            outset: "outset",
            revert: "revert",
            ridge: "ridge",
            unset: "unset",
          }
        },
        borderColor: {
          type: "color",
          title: "边框颜色",
          default: "null",
        },
        t: {
          type: "group",
          title: "上边框",
          properties: {
            borderTopWidth: {
              type: "string",
              title: "边框粗细",
              default: "null",
            },
            borderTopStyle: {
              type: "select",
              title: "边框样式",
              default: "null",
              options: {
                solid: "solid",
                dashed: "dashed",
                dotted: "dotted",
                doubled: "dashed",
                groove: "groove",
                hidden: "hidden",
                inherit: "inherit",
                initial: "initial",
                inset: "inset",
                none: "none",
                outset: "outset",
                revert: "revert",
                ridge: "ridge",
                unset: "unset",
              }
            },
            borderTopColor: {
              type: "color",
              title: "边框颜色",
              default: "null",
            },
          }
        },
        b: {
          type: "group",
          title: "下边框",
          properties: {
            borderBottomWidth: {
              type: "string",
              title: "边框粗细",
              default: "null",
            },
            borderBottomStyle: {
              type: "select",
              title: "边框样式",
              default: "null",
              options: {
                solid: "solid",
                dashed: "dashed",
                dotted: "dotted",
                doubled: "dashed",
                groove: "groove",
                hidden: "hidden",
                inherit: "inherit",
                initial: "initial",
                inset: "inset",
                none: "none",
                outset: "outset",
                revert: "revert",
                ridge: "ridge",
                unset: "unset",
              }
            },
            borderBottomColor: {
              type: "color",
              title: "边框颜色",
              default: "null",
            },
          }
        },
        l: {
          type: "group",
          title: "左边框",
          properties: {
            borderLeftWidth: {
              type: "string",
              title: "边框粗细",
              default: "null",
            },
            borderLeftStyle: {
              type: "select",
              title: "边框样式",
              default: "null",
              options: {
                solid: "solid",
                dashed: "dashed",
                dotted: "dotted",
                doubled: "dashed",
                groove: "groove",
                hidden: "hidden",
                inherit: "inherit",
                initial: "initial",
                inset: "inset",
                none: "none",
                outset: "outset",
                revert: "revert",
                ridge: "ridge",
                unset: "unset",
              }
            },
            borderLeftColor: {
              type: "color",
              title: "边框颜色",
              default: "null",
            },
          }
        },
        r: {
          type: "group",
          title: "右边框",
          properties: {
            borderRightWidth: {
              type: "string",
              title: "边框粗细",
              default: "null",
            },
            borderRightStyle: {
              type: "select",
              title: "边框样式",
              default: "null",
              options: {
                solid: "solid",
                dashed: "dashed",
                dotted: "dotted",
                doubled: "dashed",
                groove: "groove",
                hidden: "hidden",
                inherit: "inherit",
                initial: "initial",
                inset: "inset",
                none: "none",
                outset: "outset",
                revert: "revert",
                ridge: "ridge",
                unset: "unset",
              }
            },
            borderRightColor: {
              type: "color",
              title: "边框颜色",
              default: "null",
            },
          }
        },
      }
    }
  }
}
