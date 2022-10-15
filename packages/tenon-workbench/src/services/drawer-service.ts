import { Bridge } from "@tenon/shared";
import { ref, VNode } from "vue";
import { Service } from "../decorators";
import { createServiceTag } from "./tag";

class DrawerServiceBase {
  bridge = new Bridge<IDrawer>();
  layers = ref<string[]>([]);
  visible = ref<boolean>(false);

  private detectEmpty() {
    setTimeout(() => {
      if (this.visible.value && this.layers.value.length === 0) this.close();
    }, 0);
  }

  show() {
    this.visible.value = true;
  }

  close() {
    this.visible.value = false;
  }

  attachLayer(layerName: string, renderer: () => VNode) {
    this.layers.value.push(layerName);
    this.bridge.run('attachLayer', layerName, renderer);
    if (!this.visible.value) this.show();
  }

  replaceLayer(layerName: string, renderer: () => VNode) {
    this.clearLayer();
    this.attachLayer(layerName, renderer);
  }

  detachLayer() {
    this.layers.value.pop();
    this.bridge.run('detachLayer');
    this.detectEmpty();
  }

  clearLayer() {
    this.layers.value.length = 0;
    this.bridge.run('clearLayer');
    this.detectEmpty();
  }

};

export const DrawerService = createServiceTag('DrawerService');

export interface IDrawer {
  attachLayer: (name:string, renderer: () => VNode) => void;
  clearLayer: () => void;
  detachLayer: () => void;
};

@Service({
  name: DrawerService,
})
export class DrawerServiceCore {
  left = new DrawerServiceBase;
  right = new DrawerServiceBase;
};