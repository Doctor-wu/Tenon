import { BaseController, Controller, Get } from "../../framework";

@Controller({
  prefixPath: "/test"
})
class TestController extends BaseController {

  @Get("/getTest")
  async getTest(ctx, next) {
    this.responseJson(ctx, next)("test");
  }
}

export { TestController };