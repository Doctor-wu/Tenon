import { MaterialInternalEvent, TenonEvent, TenonEventPrefix, createTenonEvent } from "@tenon/materials";
import { Bridge, Dict } from "@tenon/shared";
import { Ref, reactive } from "vue";
import { ElementChangeEvent, RuntimeComponentTreeDestroyEvent } from "./interface";

export class RuntimeTreeNode {
  static runTimeId = 0;
  id: number;
  el?: HTMLElement;
  props: Dict<unknown> | null = null;
  bridge: Bridge<Record<TenonEvent<string>, any>> = new Bridge();
  eventBindings: Record<TenonEvent<string>, (...args: unknown[]) => unknown> | null = null;
  parent: RuntimeTreeNode | null = null;
  children = reactive<RuntimeTreeNode[]>([]) as RuntimeTreeNode[];
  draggable = true;
  droppable = true;

  constructor() {
    this.id = RuntimeTreeNode.runTimeId++;
    // this.initEvents();
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

  // private initEvents() {
  //   Object.keys(this.eventBindings || {}).forEach((key) => {
  //     this.bridge.register(key as TenonEvent<string>, (...args) => {
  //       console.log(key, args);
  //       if (this.eventHandlers?.[key]) {
  //         this.eventHandlers[key](...args);
  //       }
  //     });
  //   });
  //   this.bridge.register(createTenonEvent(MaterialInternalEvent.Mount), (elRef: Ref<HTMLElement>) => {
  //     this.bridge.run(ElementChangeEvent, elRef);
  //   });
  // }
}
