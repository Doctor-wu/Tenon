import { TenonEvent } from "@tenon/material-foundation";
import { Bridge, Dict } from "@tenon/shared";
import { Ref, reactive } from "vue";
import { RuntimeComponentTreeDestroyEvent } from "./interface";
import { BaseStructure } from "../base";
import { ModelHost } from "../../interface";

export class RuntimeTreeNode extends BaseStructure {
  static runTimeId = 0;
  id: number;
  type = ModelHost.Tree;
  name: string;
  el?: Ref<HTMLElement>;
  props: Dict<unknown> | null = null;
  bridge: Bridge<Record<TenonEvent<string>, any>> = new Bridge();
  eventBindings: Record<TenonEvent<string>, (...args: unknown[]) => unknown> | null = null;
  parent: RuntimeTreeNode | null = null;
  children = reactive<RuntimeTreeNode[]>([]) as RuntimeTreeNode[];
  draggable = true;
  droppable = true;

  constructor(name: string) {
    super();
    this.id = RuntimeTreeNode.runTimeId++;
    this.name = name;
  }

  clearBridge() {
    this.bridge.clear();
    this.children.forEach((child) => child.clearBridge());
  }

  clone() {
    const node = new RuntimeTreeNode(this.name);
    node.bridge = this.bridge.clone();
    node.eventBindings = this.eventBindings;
    node.props = this.props;
    node.draggable = this.draggable;
    node.droppable = this.droppable;
    node.children = this.children.map((child) => child.clone());
    return node;
  }

  destroy() {
    this.bridge.run(RuntimeComponentTreeDestroyEvent);
    this.bridge.clear();
    this.eventBindings = null;
    this.props = null;
    this.parent = null;
    this.children.forEach((child) => child.destroy());
    this.children.length = 0;
    this.el = undefined;
  }
}
