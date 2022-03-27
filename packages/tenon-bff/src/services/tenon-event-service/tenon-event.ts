import { BaseService, Service, createSchema, useService } from "@tenon/node-framework";
import { SERVICE_NAME } from "../constant";
import { ITenonEventConfig } from "./tenon-event.interface";
const tenonEventSchema = createSchema({
  content: {
    type: String,
    required: true,
  },
  belongPageId: {
    type: String,
    required: true,
  },
  gather: {
    type: String,
    default: 'default',
  }
});

@Service({
  schema: tenonEventSchema,
  name: SERVICE_NAME.tenonEvent,
})
class TenonEventService extends BaseService {

  async addEvent(content, belongPageId, gather?: string) {
    return this.errorProtectedHandler(async () => {
      return await this.addItem({ content, belongPageId, gather });
    });
  }

  async deleteEvent(eventId) {
    return this.errorProtectedHandler(async () => {
      return await this.deleteItemById(eventId);
    });
  }

  async updateEvent(eventId, info) {
    return this.errorProtectedHandler(async () => {
      return await this.updateItemById(eventId, info);
    });
  }

  async getEvents(query) {
    return this.errorProtectedHandler(async () => {
      const result = await this.model.find(query);
      return result;
    });
  }
}

export { TenonEventService };
