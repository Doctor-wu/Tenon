import {
  ActionType, BasePlugin,
  BarService, BarServiceCore,
  WorkbenchEvents, WorkbenchType, IToolBarSwitchConfig
} from "@tenon/workbench";

export class ExcludeSwitch extends BasePlugin {
  workbench: WorkbenchType;

  constructor(private excludeNames: string[]) {
    super();
  }

  install(workbench: WorkbenchType) {
    this.workbench = workbench;
    this.registerExcludeSwitch(this.excludeNames);
    console.log('exclude switch', this.excludeNames);
  }

  async registerExcludeSwitch(names: string[]) {
    const {
      workbenchDIService,
    } = this.workbench;
    const barService = (await workbenchDIService.get<BarServiceCore>(BarService))!;
    const nameSet = new Set(names);
    this.workbench.eventEmitter.on(
      WorkbenchEvents.emitActionFinish,
      ({
        name, action,
      }) => {
        if (
          action === ActionType.onActive
          && nameSet.has(name)
        ) {
          names.forEach(switchName => {
            if (switchName === name) return;
            if (barService.getSwitchActive(switchName)) {
              barService.setSwitchActive(switchName, false);
              barService.emitAction(switchName, ActionType.onDeActive, 'ExcludeSwitch');
            }
          })
        }
      }
    )
  }

}

