import { Singleton, Subscribe } from "@tenon/shared";
import { Service } from "../decorators";
import { createServiceTag } from "./tag";

export const EventEmitterService = createServiceTag('EventEmitterService');

@Service({
  name: EventEmitterService,
})
@Singleton
export class EventEmitterCore extends Subscribe {
}