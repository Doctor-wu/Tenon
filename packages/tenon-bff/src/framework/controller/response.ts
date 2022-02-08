import { CodeText, StatusCode } from "./status-code"

export const createResponseJson = (data: any) => {
  return {
    code: StatusCode.SUCCESS,
    success: true,
    successText: CodeText[StatusCode.SUCCESS],
    data,
  }
}

export const createErrorJson = (errorCode: number, errorMsg: string) => {
  return {
    code: errorCode,
    success: false,
    errorMsg,
  }
}