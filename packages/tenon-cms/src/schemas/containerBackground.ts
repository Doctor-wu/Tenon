
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
    },
    bg: {
      type: "group",
      title: "背景属性",
      properties: {
        background: {
          type: "string",
          title: "背景",
        },
        backgroundColor: {
          type: "color",
          title: "背景颜色",
        },
        backgroundImage: {
          type: "string",
          title: "背景颜色",
        },
        boxShadow: {
          type: "color",
          title: "背景阴影",
        }
      }
    }
  }
}