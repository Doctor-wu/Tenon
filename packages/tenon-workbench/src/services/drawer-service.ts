import { Bridge, Singleton } from "@tenon/shared";
import { reactive, ref, VNode } from "vue";
import { WorkbenchEvents } from "../core";
import { Inject, Service } from "../decorators";
import { EventEmitterCore, EventEmitterService } from "./event-emitter";
import { createServiceTag } from "./tag";

export enum DrawerDisplayType {
  Float = 'float',
  Flow = 'flow',
}

class DrawerServiceBase {
  bridge = new Bridge<IDrawer>();

  layers: string[] = [];

  visible = ref<boolean>(false);

  header = reactive<IDrawerHeader>({
    showHeader: true,
    showClose: true,
  });

  alignment: 'left' | 'right';

  eventEmitter: EventEmitterCore;

  displayType: DrawerDisplayType;

  constructor(
    alignment: 'left' | 'right',
    eventEmitter: EventEmitterCore,
    displayType: DrawerDisplayType = DrawerDisplayType.Float,
  ) {
    this.alignment = alignment;
    this.eventEmitter = eventEmitter;
    this.displayType = displayType;
    this.bridge.register('updateLayers', (layers) => this.layers = layers);
  }


  private detectEmpty() {
    setTimeout(() => {
      if (this.visible.value && this.layers.length === 0) this.close();
    }, 0);
  }

  show(fromInternal = false) {
    this.eventEmitter.emit(WorkbenchEvents.drawerChanged, {
      alignment: this.alignment,
      state: true,
      fromInternal,
    });
    this.visible.value = true;
  }

  close(fromInternal = false) {
    this.eventEmitter.emit(WorkbenchEvents.drawerChanged, {
      alignment: this.alignment,
      state: false,
      fromInternal,
    });
    this.clearLayer();
    this.visible.value = false;
  }

  attachLayer(layerName: string, renderer: () => VNode) {
    this.bridge.run('attachLayer', layerName, renderer);
    if (!this.visible.value) this.show();
  }

  replaceLayer(layerName: string, renderer: () => VNode) {
    this.detachLayer();
    this.attachLayer(layerName, renderer);
  }

  detachLayer(name?: string) {
    this.bridge.run('detachLayer', name);
    this.detectEmpty();
  }

  clearLayer() {
    this.bridge.run('clearLayer');
    this.detectEmpty();
  }

  setHeader(header: IDrawerHeader) {
    Object.assign(this.header, header);
  }

  setDisplayType(type: DrawerDisplayType) {
    this.displayType = type;
    this.bridge.run('updateDisplayType', type);
  }

};

export const DrawerService = createServiceTag('DrawerService');

export interface IDrawer {
  attachLayer: (name: string, renderer: () => VNode) => void;
  clearLayer: () => void;
  detachLayer: (name?: string) => void;
  updateLayers: (layers: string[]) => void;
  updateDisplayType: (type: DrawerDisplayType) => void;
};

export interface IDrawerHeader {
  showHeader?: boolean;
  showClose?: boolean;
};

@Service({
  name: DrawerService,
})
@Singleton
export class DrawerServiceCore {
  left = new DrawerServiceBase('left', this.eventEmitter, DrawerDisplayType.Flow);
  right = new DrawerServiceBase('right', this.eventEmitter);

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
  }
};
