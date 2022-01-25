import { useStore } from "../store";
import { ComponentTreeNode } from "../store/modules/viewer";

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

export const getActiveComponentUsefulHandlers = () => {
  const handlers: IHandlerConfig[] = [];
  const store = useStore();
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