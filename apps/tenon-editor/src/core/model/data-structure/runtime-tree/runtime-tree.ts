import { TenonEvent } from "@tenon/materials";
import { Bridge, Dict } from "@tenon/shared";
import { Ref, reactive } from "vue";
import { RuntimeComponentTreeDestroyEvent } from "./interface";

export class RuntimeTreeNode {
  static runTimeId = 0;
  id: number;
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
    this.id = RuntimeTreeNode.runTimeId++;
    this.name = name;
    // this.initEvents();
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
