import { IEventsConfig } from "../events";
import { IMaterial } from "@tenon/materials";
import { ISchema } from "../schema";
import { ITenonComponentStates } from "../states";
import { TenonPropsBinding } from "../props-binding";
import { TenonLifeCycleHook } from "../hooks";
import { TenonEventCalledHook } from "../hooks/event-called";

export interface ComponentTreeNode {
  name: string; // 组件名称
  id: number; // 组件id
  schemas: ISchema[]; // 组件schemas
  refs: any; // 引用
  events: IEventsConfig; // 组件事件
  handlers: string[];
  parent?: ComponentTreeNode; // 组件父级
  // refKey?: string;
  ctx?: any;
  // textID?: string;
  // parentComponent?: ComponentTreeNode;
  props?: any;
  propsBinding: TenonPropsBinding;
  states?: ITenonComponentStates;
  children?: ComponentTreeNode[];
  material: IMaterial;
  materialConfig: IMaterial['config'];
  slots: Object;
  isSlot?: boolean;
  lifecycleHook: TenonLifeCycleHook;
  eventCalledHook: TenonEventCalledHook;
  mounted: boolean;
  el: HTMLElement;
}

export interface ComponentSerializeConfig {
  id: number;
  name: string;
  schemas: ISchema[];
  props: any;
  propsBinding: string;
  children?: ComponentSerializeConfig[];
  slots: Object;
  states: any;
  events: any;
}