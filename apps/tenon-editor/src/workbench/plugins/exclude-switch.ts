import {
  ActionType, BasePlugin,
  BarService, BarServiceCore,
  WorkbenchEvents, WorkbenchType,
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
    const nameSet = new Set(names);
    const {
      workbenchDIService,
    } = this.workbench;
    const barService = (await workbenchDIService.get<BarServiceCore>(BarService))!;
    this.workbench.eventEmitter.on(
      WorkbenchEvents.emitActionFinish,
      ({ name, action }) => {
        if (
          action === ActionType.onActive
          && nameSet.has(name)
        ) {
          this.excludeSwitches(names.filter(item => item !== name), barService);
        }
      },
    );
  }

  private excludeSwitches = async (names: string[], barService: BarServiceCore) => {
    names.forEach(switchName => {
      if (barService.getSwitchActive(switchName)) {
        barService.setSwitchActive(switchName, false);
        barService.emitAction(switchName, ActionType.onDeActive, 'ExcludeSwitch');
      }
    })
  }
}

