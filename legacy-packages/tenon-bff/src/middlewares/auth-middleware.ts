import { TypeMiddleware } from "@tenon/node-framework";

export const AuthMiddleWare: TypeMiddleware = async ({
  ctx,
  params
}) => {
  console.log(ctx.session, 'AuthMiddleWare');
  
  if (!ctx.session.user) {
    ctx.response.status = 403;
    return [false, '需要登录'];
  }
  return [true];
}