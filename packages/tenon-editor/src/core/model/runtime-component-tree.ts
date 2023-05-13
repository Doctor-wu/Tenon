import { BaseMaterial } from "@tenon/materials";
import { Dict } from "@tenon/shared";
import { VNode } from "vue";

export class RuntimeComponentTree {
  material: BaseMaterial;
  props: Dict<unknown>;
  eventBindings: Record<`tenon-event:${string}`, (...args: unknown[]) => unknown>;
  children: RuntimeComponentTree[];

  constructor(material: BaseMaterial) {
    this.material = material;
    this.initEvents();
  }

  render(): VNode {
    return this.material.render(this.props);
  };

  private initEvents() {
    Object.keys(this.eventBindings).forEach((key) => {
      this.material.bridge.register(key as `tenon-event:${string}`, (...args) => {
        console.log(key, args);
      });
    })
  }
}
