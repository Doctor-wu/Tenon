import {
  BaseController, Controller, Get,
  RequestNext, RequestContext, useService, Post, Delete,
} from "@tenon/node-framework";
import { AuthMiddleWare } from "../../middlewares/auth-middleware";
import { TenonEventService } from "../../services";
import { SERVICE_NAME } from "../../services/constant";

@Controller({
  prefixPath: '/tenon-event',
  middleware: [AuthMiddleWare]
})
export class TenonEventController extends BaseController {

  @useService(SERVICE_NAME.tenonEvent)
  tenonEventService!: TenonEventService;

  @Post('/addEvent', {
    params: {
      content: {
        type: 'string',
        required: true,
      },
      eventName: {
        type: 'string',
        required: true,
      },
      pageId: {
        type: 'string',
        required: true,
      },
      gather: {
        type: 'string',
        defaultValue: 'default'
      }
    }
  })
  async addEvent(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const {
      content, pageId, gather, eventName
    } = params;
    const [_, existed] = await this.tenonEventService.getEvents({ belongPageId: pageId, eventName });
    if (existed.length) {
      return this.responseError(ctx, next)(1111, `页面已存在<${eventName}>事件`);
    }
    const [error, result] = await this.tenonEventService.addEvent(
      { content, belongPageId: pageId, eventName, gather }
    );
    return await this.smartResponse(ctx, next)(error, result);
  }

  @Delete('/deleteEvent', {
    params: {
      eventId: {
        type: 'string',
        required: true,
      }
    }
  })
  async deleteEvent(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const { eventId } = params;
    const [error, result] = await this.tenonEventService.deleteEvent(eventId);
    return await this.smartResponse(ctx, next)(error, result);
  }

  @Post('/updateEvent', {
    params: {
      content: {
        type: 'string',
        required: true,
      },
      eventName: {
        type: 'string',
        required: true,
      },
      gather: {
        type: 'string',
        defaultValue: 'default'
      },
      _id: {
        type: 'string',
        required: true,
      }
    }
  })
  async updateEvent(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const {
      content, gather, eventName, _id
    } = params;
    const [error, result] = await this.tenonEventService.updateEvent(_id, {
      content,
      gather,
      eventName,
    });
    return await this.smartResponse(ctx, next)(error, result);
  }


  @Get('/getEvents/:pageId')
  async getEvents(
    ctx: RequestContext,
    next: RequestNext,
    params: any,
  ) {
    const {
      pageId,
    } = params;
    const [error, result] = await this.tenonEventService.getEvents({ belongPageId: pageId });
    return await this.smartResponse(ctx, next)(error, result);
  }
}