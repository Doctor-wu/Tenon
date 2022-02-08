import { BaseController } from "../controller";
import { StatusCode } from "../controller/status-code";
import { addRoute } from "../middlewares/router";

export interface IParamsConfig {
  [props: string]: {
    required?: boolean;
    type?: "number" | "string" | "boolean";
    defaultValue?: any;
    validator?: (param?: any) => [true] | [false, string];
  }
}

export interface IRequestOptions {
  params?: IParamsConfig;
}

export const decorateRequest = (target, cb, {
  requestPath,
  requestMethod,
  handlerDesc,
}) => {
  target.handlers = target.handlers || [];

  target.handlers.push(
    (instance: BaseController) => {
      addRoute(requestMethod, {
        path: instance.prefixPath + requestPath,
        cb: (ctx, next) => {
          cb.call(instance, ctx, next);
        },
        handlerDesc,
      });
    }
  );
}

export const checkParams:
  <T extends Object>(paramsConfig: IParamsConfig, params: T) => [true] | [false, string, number]
  = <T extends Object>(paramsConfig: IParamsConfig, params: T) => {
    const keys = Object.keys(paramsConfig);
    for (let i = 0; i < keys.length; i++) {
      const paramKey = keys[i];
      const {
        required,
        type,
        defaultValue,
        validator,
      } = paramsConfig[paramKey];

      if (defaultValue) {
        params[paramKey] = params[paramKey] || defaultValue;
      }

      const paramValue = params[paramKey];

      if (required) {
        if (!params[paramKey])
          return [false, `缺少<${paramKey}>参数`, StatusCode.LACK_PARAMS];
      }

      if (validator) {
        const result = validator(paramValue);
        if (result[0]) return result;
        return [...result, StatusCode.CUSTOM_ERROR];
      }

      if (paramValue && typeof paramValue !== type)
        return [false, `参数<${paramKey}>类型错误，期望<${type}>, 得到<${typeof paramValue}>`, StatusCode.PARAMS_TYPE_ERROR]
    }
    return [true];
  }