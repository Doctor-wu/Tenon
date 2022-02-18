import { IMaterial } from "@tenon/materials";
import { cloneDeep } from "lodash";
import { ComponentTreeNode } from "./component";

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

export interface IExecuteQueueItem {
  eventName: string;
  tenonCompID: number;
  tenonCompName: string;
}

export interface IEventStruct {
  eventLabel: string;
  executeQueue: IExecuteQueueItem[];
}

export const eventsMap = new Map<string, Function>();

export interface IHandlerConfig {
  eventName: string;
  tenonComp: ComponentTreeNode;
}

export const getActiveComponentUsefulHandlers = (storeFactory) => {
  const handlers: IHandlerConfig[] = [];
  const store = storeFactory();
  const activeComponent: ComponentTreeNode = store.getters['viewer/getActiveComponent'];
  handlers.push(...activeComponent.handlers.map(eventName => ({
    eventName,
    tenonComp: activeComponent,
  })));
  let parentComponent = activeComponent.parentComponent;
  while (parentComponent) {
    handlers.push(...parentComponent.handlers.map(eventName => ({
      eventName,
      tenonComp: parentComponent!,
    })));
    parentComponent = parentComponent.parentComponent;
  }
  return handlers;
}


export function executeQueueEvents(executeQueue: IExecuteQueueItem[], ...args: any[]) {
  executeQueue.forEach(item => {
    const eventIdentifier = `${item.eventName}_${item.tenonCompID}`;
    const eventEntity = eventsMap.get(eventIdentifier);
    if (eventEntity) eventEntity.apply(null, args);
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