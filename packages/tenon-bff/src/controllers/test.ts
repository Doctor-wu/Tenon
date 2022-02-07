import Koa from "koa";
import { BaseController, Controller } from "../framework";

@Controller({
  prefixPath: '/',
})
class Test extends BaseController {
  // @Auth(['*'])
  // @Get('testInfo')
  // @Post('testInfo')
  async getTestInfo(
    ctx: Koa.Context,
    next: Koa.Next,
  ) {
    // console.log(id);
    // const list = await testService.getList();
    this.response({
      data: 123,
    });
  }
}

export default Test;