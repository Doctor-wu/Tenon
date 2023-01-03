import { ToolBarName } from "@/configs/tool-bar-config";
import {
  ActionController,
  ActionInfo,
  ActionType,
  BarService,
  BarServiceCore,
  Controller,
  DrawerServiceCore,
  EventEmitterCore,
  EventEmitterService,
  IDynamicFeature,
  Inject,
  InjectActionInfoService,
  InjectDrawerService,
  InternalUIService,
  Loader,
  WorkbenchEvents,
  awaitLoad,
} from "@tenon/workbench";
import { IMaterialFeature } from "./material.interface";
import { h } from "vue";

@Controller({
  name: Symbol('material-controller')
})
export class MaterialController {

  @Loader(IMaterialFeature)
  materialLoader: IDynamicFeature<IMaterialFeature>;

  get materialFeature() {
    return this.materialLoader.instance;
  }

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
    @Inject(BarService) private barService: BarServiceCore,
  ) {
    this.listenDrawer();
  }

  @ActionController(ToolBarName.MaterialSwitch, ActionType.onActive)
  @ActionController(ToolBarName.MaterialSwitch, ActionType.onDeActive)
  @awaitLoad(IMaterialFeature)
  handleMaterialSwitch(
    @InjectActionInfoService() actionInfo: ActionInfo,
    @InjectDrawerService() drawerService: DrawerServiceCore,
  ) {
    console.log(actionInfo);
    switch (actionInfo.action) {
      case ActionType.onActive:
        drawerService.left.attachLayer('material', () => h('span', 'material core'));
        break;
      case ActionType.onDeActive:
        drawerService.left.detachLayer();
        break;
      default:
        return;
    }
    this.materialFeature!.switchPanel(actionInfo.action === ActionType.onActive);
  }

  private listenDrawer() {
    this.eventEmitter!.on(WorkbenchEvents.drawerChanged, ({
      alignment, state, fromInternal,
    }) => {
      if (alignment === 'left' && fromInternal && !state) {
        this.barService.emitAction(
          ToolBarName.MaterialSwitch,
          ActionType.onDeActive,
          InternalUIService.Drawer,
        );
        this.barService!.updateToolBarConfig(ToolBarName.MaterialSwitch, {
          active: false,
        });
      }
    });
  }
}
