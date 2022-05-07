import { BaseController, Controller } from "@tenon/node-framework";
import { UserController } from "./user";

@Controller({
  prefixPath: "/auth",
  middleware: [
    ({ ctx }) => {
      console.log('Parent middleware');
      console.log(ctx.session.visitCount);
      
      ctx.session.visitCount = (ctx.session.visitCount || 0) + 1;
      return [true];
    }]
})
class AuthController extends BaseController {

  public subController = [UserController];

}

export { AuthController, UserController };