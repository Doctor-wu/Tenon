import { TypeMiddleware } from "@tenon/node-framework/src/controller/controller-core.interface";

export const AuthMiddleWare: TypeMiddleware = ({
  ctx,
  params
}) => {
  console.log(ctx.session);
  
  if (!ctx.session.user) {
    ctx.response.status = 403;
    return [false, '需要登录'];
  }
  return [true];
}