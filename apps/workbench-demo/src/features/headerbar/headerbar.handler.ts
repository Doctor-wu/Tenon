import {
  BarServiceCore, BarService,
  EventEmitterCore, EventEmitterService,
  Feature, Inject, WorkbenchEvents, ActionType,
} from "@tenon/workbench";
import { MoreItemName } from "../../configs/header-bar-config";
import { ToolBarName } from "../../configs/tool-bar-config";
import { HeaderBarFeature } from "./headerbar.interface";


@Feature({
  name: HeaderBarFeature
})
export class HeaderBarHandler implements HeaderBarFeature {

  public isFullScreen = false;

  constructor(
    @Inject(BarService) private barService: BarServiceCore,
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
    this.initEvents();
    setTimeout(() => {
      barService.emitAction('preview', ActionType.onClick, 'headerbar feature' as any);
    }, 3000);
  }

  public initEvents() {
    this.eventEmitter.on(
      WorkbenchEvents.drawerChanged,
      ({
        alignment,
        state,
      }) => {
        if (alignment === 'left' && state === false) {
          this.barService.updateToolBarConfig(ToolBarName.MaterialSwitch, { active: false });
          this.barService.updateToolBarConfig(ToolBarName.ComponentTreeSwitch, { active: false });
        };
        if (alignment === 'right' && state === false) {
          this.barService.updateToolBarConfig(ToolBarName.ComponentProperty, { active: false });
        }
      }
    )
  }

  public getGitHubHref() {
    return 'https://github.com/Doctor-wu/Tenon';
  }

  public toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
}