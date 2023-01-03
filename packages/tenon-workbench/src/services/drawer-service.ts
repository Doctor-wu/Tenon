import { Bridge, Singleton } from "@tenon/shared";
import { reactive, ref, VNode } from "vue";
import { WorkbenchEvents } from "../core";
import { Inject, Service } from "../decorators";
import { EventEmitterCore, EventEmitterService } from "./event-emitter";
import { createServiceTag } from "./tag";
import { InternalUIService } from "./action-info-service";

class DrawerServiceBase {
  bridge = new Bridge<IDrawer>();

  layers = ref<string[]>([]);

  visible = ref<boolean>(false);

  header = reactive<IDrawerHeader>({
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
    this.layers.value.length = 0;
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
    Object.assign(this.header, header);
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
  left = new DrawerServiceBase('left', this.eventEmitter);
  right = new DrawerServiceBase('right', this.eventEmitter);

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
  }
};
