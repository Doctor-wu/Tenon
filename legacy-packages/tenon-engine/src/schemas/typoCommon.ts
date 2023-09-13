export const typoCommonSchema = {
  "type": "object",
  "title": "基础排版样式",
  "fieldName": "typoCommon",
  "properties": {
    type: {
      type: "select",
      title: "排版类型",
      options: {
        primary: "主要",
        secondary: "次要",
        success: "成功",
        danger: "危险",
        warning: "警告",
      }
    },
    bold: {
      type: "boolean",
      title: "加粗",
      boolean: false
    },
    mark: {
      type: "boolean",
      title: "标记",
      boolean: false
    },
    underline: {
      type: "boolean",
      title: "下划线",
      boolean: false
    },
    delete: {
      type: "boolean",
      title: "删除线",
      boolean: false
    },
    code: {
      type: "boolean",
      title: "代码",
      boolean: false
    },
    disabled: {
      type: "boolean",
      title: "禁用",
      boolean: false
    },
    editable: {
      type: "boolean",
      title: "开启可编辑功能",
      boolean: false
    },
    "edit-text": {
      type: "string",
      title: "编辑模式下的文本",
    },
    copyable: {
      type: "boolean",
      title: "开启可复制功能",
      boolean: false
    }
  }
};

export const typoEllipsisSchema = {
  "type": "object",
  "title": "自动溢出省略配置",
  "fieldName": "typoEllipsis",
  "properties": {
    rows: {
      type: "number",
      title: "行数",
      default: 1
    },
    expandable: {
      type: "boolean",
      title: "开启溢出模式",
      boolean: false
    },
    ellipsisStr: {
      type: "string",
      title: "省略号",
      default: "..."
    },
    suffix: {
      type: "string",
      title: "后缀",
    },
  }
}