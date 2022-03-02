import { asyncCompose } from "@tenon/shared";
import { TypeMiddleware } from "../../controller/controller-core.interface";
import { getControllerStore } from "../../controller/registry";
import { RequestContext } from "../../core";

export const processMiddleWare: (...args: any[]) => Promise<[false, string] | [true]> = async (middleware: TypeMiddleware[], ctx, params) => {
  if (!middleware.length) return [true];
  let result: {
    ctx: RequestContext,
    params: any
  } | [false, string] = { ctx, params };
  for (let i = 0; i < middleware.length; i++) {
    const cb = middleware[i];
    const [access, reason] = await cb.call(null, result as any);

    if (access === false) {
      result = [access, reason as string];
      break;
    };
  }

  if (result[0] === false) return result as unknown as [false, string];
  return [true];
}
