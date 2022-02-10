import { BaseController, Controller, Next, Post, RequestContext, useService } from "../framework";
import { SERVICE_NAME } from "../services/constant";
import { UserService } from "../services/user";

@Controller({
  prefixPath: "/user"
})
class UserController extends BaseController {

  @useService(SERVICE_NAME.user)
  user!: UserService;

  @Post("/addUser", {
    params: {
      username: {
        type: "string",
        required: true,
      },
      password: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
      },
      gender: {
        type: "number",
      },
      phone: {
        type: "string",
      }
    },
  })
  async addUser(
    ctx: RequestContext,
    next: Next,
    params: any,
  ) {
    const [err, user] = await this.user.addUser(params);
    ctx.body = 123;
    if (user) {
      await this.responseJson(ctx, next)(user);
    } else {
      await this.responseError(ctx, next)(1111, err.toString());
    }
  }
}

export default UserController;