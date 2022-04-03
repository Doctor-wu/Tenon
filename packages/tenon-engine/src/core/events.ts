import { IMaterial } from "@tenon/materials";
import { cloneDeep } from "lodash";
import { useStore } from "vuex";
import { TenonComponent } from "./component";

interface IDefaultEvents {
  onMounted: IEventStruct;
  onBeforeUnmount: IEventStruct;
  [props: string]: IEventStruct;
}

export const DEFAULT_EVENTS: IDefaultEvents = {
  onMounted: {
    eventLabel: "挂载时",
    executeQueue: [],
  },
  onBeforeUnmount: {
    eventLabel: "销毁前",
    executeQueue: [],
  },
};

export interface IEventsConfig {
  [props: string]: IEventStruct;
}

export interface IEventStruct {
  eventLabel: string;
  executeQueue: string[];
}

export interface IEventMeta {
  _id: string;
  eventName: string;
  content: string;
  gather: string;
}

export const eventsMap: {
  value: Map<string, IEventMeta> | null;
} = {
  value: null,
};

export const callTenonEvent = async (
  tenonComp: TenonComponent, eventName: string, ...args: any[]
) => {
  if (args[0]?.currentTarget && args[0]?.currentTarget !== tenonComp.ctx.$el) return;
  if (!tenonComp.events[eventName] || !tenonComp.events[eventName].executeQueue.length) return;
  const eventIds = tenonComp.events[eventName].executeQueue;
  eventIds.forEach(async eventId => {
    executeTenonEvent(eventsMap.value!.get(eventId)!, tenonComp, ...args);
  });
}

export const executeTenonEvent = (
  eventMeta: IEventMeta,
  tenonComp: TenonComponent,
  ...args: any[]
) => {
  const trigger = new Function('injectMeta', `
    const {
      $comp
    } = injectMeta;
    ${eventMeta.content}
  `);
  trigger({
    $comp: tenonComp,
    $args: args,
  });
}

export function createTenonEvents(material: IMaterial): IEventsConfig {
  const events: IEventsConfig = cloneDeep(DEFAULT_EVENTS);
  if (material.config.events) {
    Object.keys(material.config.events).forEach(eventKey => {
      events[eventKey] = {
        eventLabel: material.config.events[eventKey],
        executeQueue: []
      };
    });
  }
  return events;
}
