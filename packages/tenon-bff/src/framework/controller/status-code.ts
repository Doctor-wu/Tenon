export const StatusCode = {
  SUCCESS: 200,
  LACK_PARAMS: 1001,
  PARAMS_TYPE_ERROR: 1002,
  CUSTOM_ERROR: 1003,
}

export const CodeText = {
  [StatusCode.SUCCESS]: "成功",
  [StatusCode.LACK_PARAMS]: "缺少参数",
  [StatusCode.PARAMS_TYPE_ERROR]: "参数类型错误",
  [StatusCode.CUSTOM_ERROR]: "自定义错误",
}