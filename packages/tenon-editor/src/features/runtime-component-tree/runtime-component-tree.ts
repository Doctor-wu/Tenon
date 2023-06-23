import { BaseMaterial, MaterialInternalEvent, TenonEventPrefix } from "@tenon/materials";
import { Bridge, Dict } from "@tenon/shared";
import { Ref, VNode, effect, reactive } from "vue";
import { ElementChangeEvent, RuntimeComponentTreeDestroyEvent } from "./runtime-component-tree.interface";

let runTimeId = 0;

export class RuntimeComponentTree {
  id: number;
  el?: HTMLElement;
  material: BaseMaterial | null = null;
  props: Dict<unknown>;
  bridge: Bridge<Record<`${typeof TenonEventPrefix}${string}`, any>> = new Bridge();
  eventBindings: Record<`${typeof TenonEventPrefix}${string}`, (...args: unknown[]) => unknown> | null = null;
  eventHandlers: Record<`${typeof TenonEventPrefix}${string}`, (...args: unknown[]) => unknown> | null = null;
  parent: RuntimeComponentTree | null = null;
  children = reactive<RuntimeComponentTree[]>([]) as RuntimeComponentTree[];
  draggable = true;
  droppable = true;

  constructor(material: BaseMaterial) {
    this.material = material;
    this.id = runTimeId++;
    this.initEvents();
  }

  render(extraProps = {}): VNode {
    return this.material!.render({
      bridge: this.bridge,
      runtimeTree: this,
      ...this.props,
      ...(this.material!.nestable ? {
        children: this.children,
      } : {}),
      ...extraProps
    });
  };

  destroy() {
    this.bridge.run(RuntimeComponentTreeDestroyEvent);
    this.bridge.clear();
    this.eventBindings = null;
    this.eventHandlers = null;
    this.material = null;
    this.props = {};
  }

  private initEvents() {
    Object.keys(this.eventBindings || {}).forEach((key) => {
      this.bridge.register(key as `${typeof TenonEventPrefix}${string}`, (...args) => {
        console.log(key, args);
        if (this.eventHandlers?.[key]) {
          this.eventHandlers[key](...args);
        }
      });
    });
    this.bridge.register(`${TenonEventPrefix}${MaterialInternalEvent.Mount}`, (elRef: Ref<HTMLElement>) => {
      this.bridge.run(ElementChangeEvent, elRef);
    });
  }
}
