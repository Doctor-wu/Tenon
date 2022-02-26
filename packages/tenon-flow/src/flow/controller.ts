import { Controller, BaseController, Get } from "@tenon/node-framework";
import { FlowName } from "../flow";


@Controller({
  name: 'FlowController',
  prefixPath: '/'
})
export class FlowController extends BaseController {

  currentPhase = FlowName.INSTALL;

  @Get('setPhase', {
    params: {
      phase: {
        required: true,
        type: "string",
      }
    }
  })
  async handleSetPhase(
    ctx,
    next,
    params,
  ) {
    const { phase } = params;
    this.currentPhase = phase;
    this.response(ctx, next)(phase);
  }



  @Get('getPhase')
  async handleGetPhase(
    ctx,
    next,
    params,
  ) {
    this.response(ctx, next)(this.currentPhase);
  }
}