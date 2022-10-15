import { Bridge, Singleton } from "@tenon/shared";
import { ref, VNode } from "vue";
import { WorkbenchEvents } from "../core";
import { Inject, Service } from "../decorators";
import { EventEmitterCore, EventEmitterService } from "./event-emitter";
import { createServiceTag } from "./tag";

class DrawerServiceBase {
  bridge = new Bridge<IDrawer>();

  layers = ref<string[]>([]);

  visible = ref<boolean>(false);

  header = ref<IDrawerHeader>({
    showHeader: true,
    showClose: true,
  });

  alignment: 'left' | 'right';

  eventEmitter: EventEmitterCore;

  constructor(alignment: 'left' | 'right', eventEmitter: EventEmitterCore) {
    this.alignment = alignment;
    this.eventEmitter = eventEmitter;
  }


  private detectEmpty() {
    setTimeout(() => {
      if (this.visible.value && this.layers.value.length === 0) this.close();
    }, 0);
  }

  show(
  ) {
    this.eventEmitter.emit(WorkbenchEvents.drawerChanged, {
      alignment: this.alignment,
      state: true,
    });
    this.visible.value = true;
  }

  close() {
    this.eventEmitter.emit(WorkbenchEvents.drawerChanged, {
      alignment: this.alignment,
      state: false,
    });
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

  setHeader(header: IDrawerHeader) {
    Object.assign(this.header.value, header);
  }
};

export const DrawerService = createServiceTag('DrawerService');

export interface IDrawer {
  attachLayer: (name: string, renderer: () => VNode) => void;
  clearLayer: () => void;
  detachLayer: () => void;
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

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
  }
  
  left = new DrawerServiceBase('left', this.eventEmitter);
  right = new DrawerServiceBase('right', this.eventEmitter);
};