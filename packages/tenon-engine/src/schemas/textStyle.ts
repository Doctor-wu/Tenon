export const textStyleSchema = {
  "type": "object",
  "title": "文本样式",
  "fieldName": "textStyle",
  "properties": {
    "color": {
      "type": "color",
      "title": "文本颜色",
      "default": "#000"
    },
    "fontSize": {
      "type": "string",
      "title": "文本大小",
      "default": "14px"
    },
    "fontWeight": {
      "type": "string",
      "title": "文本粗细",
      "default": "normal"
    },
    "fontFamily": {
      "type": "string",
      "title": "文本字体",
      "default": ""
    },
    "textAlign": {
      "type": "string",
      "title": "文本对齐方式",
      "default": "left"
    },
    "lineHeight": {
      "type": "number",
      "title": "行高",
      "default": 1.5
    },
    "letterSpacing": {
      "type": "string",
      "title": "字间距",
      "default": ""
    },
    "textDecoration": {
      "type": "string",
      "title": "文本装饰",
      "default": "none"
    },
    "textOverflow": {
      "type": "string",
      "title": "文本溢出",
      "default": "ellipsis"
    },
    "whiteSpace": {
      "type": "string",
      "title": "文本空格",
      "default": "normal"
    },
    "wordWrap": {
      "type": "string",
      "title": "文本换行",
      "default": "break-word"
    },
    "textShadow": {
      "type": "string",
      "title": "文本阴影",
      "default": "none"
    },
    "vertical-align": {
      "type": "string",
      "title": "vertical-align",
      "default": "baseline"
    }
  }
};